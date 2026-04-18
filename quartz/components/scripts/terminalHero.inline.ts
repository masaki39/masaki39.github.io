type LineType = "command" | "output" | "empty"

interface Line {
  type: LineType
  text: string
}

const LINES: Line[] = [
  { type: "command", text: "whoami" },
  { type: "output", text: "masaki39" },
  { type: "output", text: "orthopedic & spine surgeon" },
  { type: "empty", text: "" },
  { type: "command", text: "cat about.txt" },
  { type: "output", text: "砂の書庫" },
  { type: "output", text: "masaki39の個人サイト。砂場遊びが大好きな息子(当時2歳)に由来する名前。Obsidianで書いたノートの一部を公開しています。" },
  { type: "empty", text: "" },
]

const CHAR_DELAY_COMMAND = 55
const CHAR_DELAY_OUTPUT = 18
const LINE_PAUSE_AFTER_COMMAND = 180
const LINE_PAUSE_AFTER_OUTPUT = 40
const INITIAL_DELAY = 400

document.addEventListener("nav", () => {
  const body = document.querySelector<HTMLElement>(".terminal-body")
  const cursor = document.querySelector<HTMLElement>(".terminal-cursor")
  if (!body || !cursor) return

  // Reset state for SPA navigation
  body.querySelectorAll(".terminal-line").forEach((el) => el.remove())
  cursor.classList.remove("visible")

  let lineIdx = 0
  let charIdx = 0
  let currentSpan: HTMLElement | null = null
  let timerId: ReturnType<typeof setTimeout>

  const cleanup = () => clearTimeout(timerId)
  window.addCleanup(cleanup)

  const typeNext = () => {
    if (lineIdx >= LINES.length) {
      cursor.classList.add("visible")
      return
    }

    const line = LINES[lineIdx]

    if (charIdx === 0) {
      currentSpan = document.createElement("span")
      currentSpan.className = `terminal-line ${line.type}`
      body.insertBefore(currentSpan, cursor)

      if (line.type === "empty") {
        lineIdx++
        timerId = setTimeout(typeNext, LINE_PAUSE_AFTER_OUTPUT)
        return
      }
    }

    if (charIdx < line.text.length) {
      currentSpan!.textContent = line.text.slice(0, charIdx + 1)
      charIdx++
      const delay = line.type === "command" ? CHAR_DELAY_COMMAND : CHAR_DELAY_OUTPUT
      timerId = setTimeout(typeNext, delay)
    } else {
      lineIdx++
      charIdx = 0
      const pause =
        line.type === "command" ? LINE_PAUSE_AFTER_COMMAND : LINE_PAUSE_AFTER_OUTPUT
      timerId = setTimeout(typeNext, pause)
    }
  }

  timerId = setTimeout(typeNext, INITIAL_DELAY)
})
