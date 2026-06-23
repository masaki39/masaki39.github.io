#!/usr/bin/env node
// Rename content files whose names are NFD (decomposed Unicode) to NFC (composed).
//
// macOS stores filenames as NFD, so files synced from an Obsidian vault land in the
// repo as NFD. Quartz generates internal link hrefs as NFC, so on a case/normalization-
// sensitive host (GitHub Pages / Linux) an NFC link to an NFD file 404s. Running this on
// CI before `quartz build` makes every emitted slug NFC, matching the NFC links.

import { readdirSync, renameSync, statSync } from "node:fs"
import { join } from "node:path"

const root = process.argv[2] ?? "content"
let renamed = 0

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    const nfc = entry.normalize("NFC")
    let current = full
    if (nfc !== entry) {
      const target = join(dir, nfc)
      renameSync(full, target)
      current = target
      renamed++
    }
    if (statSync(current).isDirectory()) walk(current)
  }
}

walk(root)
console.log(`NFC-normalized ${renamed} file/dir name(s) under ${root}/`)
