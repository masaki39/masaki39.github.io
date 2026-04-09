import { QuartzComponent, QuartzComponentConstructor } from "./types"

const kofiUrl = "https://ko-fi.com/masaki39"

export default (() => {
  const KofiSupport: QuartzComponent = () => (
    <fieldset class="kofi-support">
      <legend class="kofi-legend">Liked this note?</legend>
      <a class="kofi-link" href={kofiUrl} target="_blank" rel="noopener noreferrer">
        <svg
          class="kofi-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
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

  KofiSupport.css = `
.kofi-support {
  border: 1px solid var(--gray);
  border-radius: 8px;
  padding: 0.75rem 1rem 1rem;
  margin: 1.5rem 0;
}

.kofi-legend {
  padding: 0 0.5rem;
  font-size: 0.8em;
  color: var(--gray);
  text-align: center;
}

.kofi-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.6rem 1rem;
  border: 1px solid var(--gray);
  border-radius: 6px;
  color: var(--darkgray) !important;
  text-decoration: none !important;
  font-size: 0.9em;
  font-weight: 600;
  transition: background-color 0.15s ease;
  box-sizing: border-box;
}

.kofi-link:hover {
  background-color: var(--lightgray);
}

.kofi-icon {
  flex-shrink: 0;
  width: 1.2rem;
  height: 1.2rem;
  color: #FF5E5B;
}
`

  return KofiSupport
}) satisfies QuartzComponentConstructor
