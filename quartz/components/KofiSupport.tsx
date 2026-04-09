import { QuartzComponent, QuartzComponentConstructor } from "./types"

const kofiUrl = "https://ko-fi.com/masaki39"

export default (() => {
  const KofiSupport: QuartzComponent = () => (
    <fieldset style="border: 1px solid var(--gray); border-radius: 8px; padding: 0.75rem 1rem 1rem; margin: 1.5rem 0;">
      <legend style="padding: 0 0.5rem; font-size: 0.8em; color: var(--gray); text-align: center;">Liked this note?</legend>
      <a
        href={kofiUrl}
        target="_blank"
        rel="noopener noreferrer"
        style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.6rem 1rem; border: 1px solid var(--gray); border-radius: 6px; color: var(--darkgray); text-decoration: none; font-size: 0.9em; font-weight: 600; box-sizing: border-box;"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="19"
          height="19"
          fill="none"
          stroke="#FF5E5B"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          style="flex-shrink: 0;"
        >
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
        Buy me a coffee
      </a>
    </fieldset>
  )

  return KofiSupport
}) satisfies QuartzComponentConstructor
