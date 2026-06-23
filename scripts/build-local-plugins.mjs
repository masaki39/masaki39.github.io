#!/usr/bin/env node
// Builds local Quartz v5 plugins under quartz-plugins/<name> into <name>/dist.
//
// Local plugins are symlinked (not built) by Quartz's loader, so they must ship
// a pre-built dist/. This script reuses the host's esbuild/sass/preact instead of
// installing tsup per-plugin, so it works fully offline.
//
// It mirrors the official plugin-template tsup config:
//   - JSX: automatic, jsxImportSource "preact"
//   - *.scss imported as a compiled CSS string (loader: text)
//   - *.inline.ts imported as a browser-IIFE string (loader: text)
//   - singletons (preact, @jackyzha0/quartz, @quartz-community/*) kept external

import * as esbuild from "esbuild"
import { readdirSync, existsSync, statSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const pluginsRoot = join(root, "quartz-plugins")

const EXTERNALS = [
  "preact",
  "preact/*",
  "@jackyzha0/quartz",
  "@jackyzha0/quartz/*",
  "@quartz-community/types",
  "@quartz-community/utils",
  "@quartz-community/utils/*",
]

const textLoaderPlugin = {
  name: "scss-and-inline-as-text",
  setup(build) {
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      const sass = await import("sass")
      const result = sass.compile(args.path)
      return { contents: result.css, loader: "text" }
    })

    build.onLoad({ filter: /\.inline\.ts$/ }, async (args) => {
      const result = await esbuild.build({
        entryPoints: [args.path],
        bundle: true,
        write: false,
        format: "iife",
        target: "es2022",
        platform: "browser",
      })
      const code = result.outputFiles?.[0]?.text ?? ""
      return { contents: `export default ${JSON.stringify(code)};`, loader: "ts" }
    })
  },
}

async function buildPlugin(pluginDir) {
  const name = pluginDir.split("/").pop()
  const entry = {
    index: join(pluginDir, "src/index.ts"),
    "components/index": join(pluginDir, "src/components/index.ts"),
  }
  await esbuild.build({
    entryPoints: entry,
    outdir: join(pluginDir, "dist"),
    bundle: true,
    format: "esm",
    platform: "node",
    target: "es2022",
    splitting: false,
    sourcemap: false,
    jsx: "automatic",
    jsxImportSource: "preact",
    external: EXTERNALS,
    logLevel: "info",
    plugins: [textLoaderPlugin],
  })
  console.log(`✓ built ${name}`)
}

const targets = process.argv.slice(2)
const dirs = readdirSync(pluginsRoot)
  .map((d) => join(pluginsRoot, d))
  .filter((d) => statSync(d).isDirectory() && existsSync(join(d, "src/index.ts")))
  .filter((d) => targets.length === 0 || targets.includes(d.split("/").pop()))

if (dirs.length === 0) {
  console.error("No local plugins found to build.")
  process.exit(1)
}

for (const dir of dirs) {
  await buildPlugin(dir)
}
