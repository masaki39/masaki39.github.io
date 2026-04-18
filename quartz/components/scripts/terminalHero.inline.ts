type LineType = "command" | "output" | "empty" | "ascii"

interface Line {
  type: LineType
  text: string
}

const ASCII_ART = `                              ===     %&&+
                             %&&&&&&++%&&&%
                             #&&&&&&&&&&#&&+
                              &%&&&&%&&&#&&% +&%%   %#  =+&+
                                =&&&&&&%%%&%#%&&%+   #@######=
                              %&&&&%#&&&&%#&&&#&%+ =#######++%+
                              %&&&&&&&&&&&&%#&%&%=+#####%+++++&+
                                      =%&&%####&#+#&###++++++++%
                                     %&&&&&&&&&##&%    #++++++%+
                                      ====      +@&      +#%+=+
                                              =&%%##&=
                                           ##++++++++++##=
                                      &#&+++++++++++++++++&##+
                                  &%&++++++++++++++++++++++++++%#+
    ===                       +#%+++++++++++++++++++++++++++++++++&%+                        ===
 =#+++++@+                  #&+++++++++++++++++++++++++++++++++++++&&&#                   %&+++++#=
&+++++++++&              =#&++++++++++++++++++++++++++++++++++++++++&&&&#&               %++++++++++
#+++++++++%=  ==        &#++++++++++++++++++++++++++++++++++++++++++++&&&&#=        ==  ++++++++++=%
%++++++++++@#+++&      #&++++++++++++++++++++++++++++++++++++++++++++++&&&&%&      #++%#%+++++++++%+
 #+++++++++++++&=     @&++++++++++++++++++++++++++++++++++++++++++++++++&&&&&#     %++++++++++++++#
  %+++++++++++%+     @+++++++++++++++++%#+++++++++++++++++&#%++++++++++++&&&&&#     %+++++++++++&&
    %+++++++%+      @+++++++++++++++++###&++++++++++++++++@##%+++++++++++&&&&&+#      &&+++++++#
      &####        +#++++++++++++++++++&&++++++++++++++++++&%+++++++++++++&&&&&%=        ####+
          &=       #++++++++&&&&&&&++++++++++++++++++++++++++++++&&%%&&&++&&&&&+%       &=
           %+      %+++++++&&&&&&&&&+++#++++++++++++++++++++++++&%%%&&&%%++&&&&&%      &&
            +%    +%++++++++&&&&&&+++++&#++++++++++++++++++@&+++++&&%&&++++&&&&&%=    #=
              #&  &++++++++++++++++++++++#%+++++++++++++&#%++++++++++++++++&&&&&%+  %+
                %##+++++++++++++++++++++++++%#%%&++&&%##&+++++++++++++++++&&&&&&%##+
                  &+++++++++++++++++++++++++++++++++++++++++++++++++++++++&&&&&&%+
                  &++++++++++++++++++++++++++++++++++++++++++++++++++++++&&&&&&&%+
                  +%+++++++++++++++++++++++++++++++++++++++++++++++++++++&&&&&&&#+
                   %++++++++++++++++++++++++++++++++++++++++++++++++++++&&&&&&&+#
                   #++++++++++++++++++++++++++++++++++++++++++++++++++++&&##@@@#+
                   =#%#%%%++++++++++++++++++++++++++++++&%%##%##@@@##############
                   ##############################################################=
                  &##############################################################+
                  +##############################@##+++##########################
                   ##############################################################
                   =############################################################+
                    =@##############################+++#########################
                     +##########################################################
                      #########################################################
                       &############################@++#######################
                         ############################%&#####################+
                           &##############################################=
                              =@@####################################@%
             =+++++&+        &&     =%######################@##%=     #=        &&=+++%=
             %+++++++%      #                      =                   +%     =%++++++++
              %+++++++#=  +%                                             #   &++++++++%
                #&+++++%=%%                                               &&=#+++++#&
                   +&#%%#&                                                 +#&&+=                   `

const LINES: Line[] = [
  { type: "command", text: "whoami" },
  { type: "output", text: "masaki39" },
  { type: "output", text: "orthopedic & spine surgeon" },
  { type: "empty", text: "" },
  { type: "command", text: "cat about.txt" },
  { type: "output", text: "砂の書庫" },
  { type: "output", text: "masaki39の個人サイト。砂場遊びが大好きな息子(当時2歳)に由来する名前。Obsidianで書いたノートの一部を公開しています。" },
  { type: "empty", text: "" },
  { type: "command", text: "cat avater.txt" },
  ...ASCII_ART.split("\n").map((line) => ({ type: "ascii" as LineType, text: line })),
  { type: "empty", text: "" },
]

const MAX_ASCII_LINE = Math.max(...ASCII_ART.split("\n").map((l) => l.length))
const CHAR_MONOSPACE_RATIO = 0.601 // width/height ratio for monospace fonts

const CHAR_DELAY_COMMAND = 55
const CHAR_DELAY_OUTPUT = 18
const LINE_PAUSE_AFTER_COMMAND = 180
const LINE_PAUSE_AFTER_OUTPUT = 40
const INITIAL_DELAY = 400
const ASCII_LINE_DELAY = 6

function getCharClass(ch: string): string | null {
  if ("+*".includes(ch)) return "a-yellow"
  if ("#%@".includes(ch)) return "a-green"
  if ("-=".includes(ch)) return "a-cyan"
  if (".:".includes(ch)) return "a-dim"
  return null
}

function colorizeAscii(text: string): string {
  let result = ""
  let i = 0
  while (i < text.length) {
    const cls = getCharClass(text[i])
    if (cls) {
      let j = i + 1
      while (j < text.length && getCharClass(text[j]) === cls) j++
      result += `<span class="${cls}">${text.slice(i, j)}</span>`
      i = j
    } else {
      result += text[i] === "&" ? "&amp;" : text[i] === "<" ? "&lt;" : text[i]
      i++
    }
  }
  return result
}

function updateAsciiFontSize(body: HTMLElement) {
  const PADDING = 2 * 19.2 // 2 × 1.2rem in px
  const availableWidth = body.clientWidth - PADDING
  const fontSize = availableWidth / (MAX_ASCII_LINE * CHAR_MONOSPACE_RATIO)
  body.style.setProperty("--ascii-font-size", `${fontSize}px`)
}

document.addEventListener("nav", () => {
  const body = document.querySelector<HTMLElement>(".terminal-body")
  const cursor = document.querySelector<HTMLElement>(".terminal-cursor")
  if (!body || !cursor) return

  updateAsciiFontSize(body)
  const ro = new ResizeObserver(() => updateAsciiFontSize(body))
  ro.observe(body)
  window.addCleanup(() => ro.disconnect())

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

      if (line.type === "ascii") {
        currentSpan.innerHTML = colorizeAscii(line.text)
        lineIdx++
        timerId = setTimeout(typeNext, ASCII_LINE_DELAY)
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
