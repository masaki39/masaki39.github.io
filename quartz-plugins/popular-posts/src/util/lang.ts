export function classNames(displayClass?: string, ...classes: string[]): string {
  return [...classes, displayClass].filter((x): x is string => Boolean(x)).join(" ")
}
