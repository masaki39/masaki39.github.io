import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import style from "./styles/terminalHero.scss"
// @ts-ignore — transpiled to a browser-ready string at build time
import script from "./scripts/terminalHero.inline"

const TerminalHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return null

  return (
    <div class="terminal-hero">
      <div class="terminal-titlebar">
        <span class="dot dot-red" />
        <span class="dot dot-yellow" />
        <span class="dot dot-green" />
      </div>
      <div class="terminal-body">
        <span class="terminal-cursor" />
      </div>
    </div>
  )
}

TerminalHero.css = style
TerminalHero.afterDOMLoaded = script

export default (() => TerminalHero) satisfies QuartzComponentConstructor
