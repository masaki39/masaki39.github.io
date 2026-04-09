import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/terminalHero.scss"
// @ts-ignore
import script from "./scripts/terminalHero.inline"

const TerminalHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  if (fileData.slug !== "index") return <></>

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
