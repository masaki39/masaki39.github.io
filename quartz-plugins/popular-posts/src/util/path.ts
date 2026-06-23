// Minimal, self-contained copies of the Quartz path helpers, so this local
// plugin has no runtime dependency on @quartz-community/utils (local plugins
// are symlinked without node_modules). Behaviour matches the upstream utils.

export type FullSlug = string & { __brand: "full" }

function endsWith(s: string, suffix: string): boolean {
  return s === suffix || s.endsWith("/" + suffix)
}

function trimSuffix(s: string, suffix: string): string {
  return endsWith(s, suffix) ? s.slice(0, -suffix.length) : s
}

function stripSlashes(s: string, onlyStripPrefix?: boolean): string {
  if (s.startsWith("/")) s = s.substring(1)
  if (!onlyStripPrefix && s.endsWith("/")) s = s.slice(0, -1)
  return s
}

export function simplifySlug(fp: string): string {
  const res = stripSlashes(trimSuffix(fp, "index"), true)
  return res.length === 0 ? "/" : res
}

function joinSegments(...args: string[]): string {
  if (args.length === 0) return ""
  let joined = args
    .filter((segment) => segment !== "" && segment !== "/")
    .map((segment) => stripSlashes(segment))
    .join("/")
  const first = args[0]
  const last = args[args.length - 1]
  if (first?.startsWith("/")) joined = "/" + joined
  if (last?.endsWith("/")) joined = joined + "/"
  return joined
}

function pathToRoot(slug: string): string {
  let rootPath = slug
    .split("/")
    .filter((x) => x !== "")
    .slice(0, -1)
    .map(() => "..")
    .join("/")
  if (rootPath.length === 0) rootPath = "."
  return rootPath
}

export function resolveRelative(current: string, target: string): string {
  return joinSegments(pathToRoot(current), simplifySlug(target))
}
