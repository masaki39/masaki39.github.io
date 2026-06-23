import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import { resolveRelative, simplifySlug, type FullSlug } from "../util/path"
import { classNames } from "../util/lang"
import style from "./styles/recentNotes.scss"
import { readFileSync } from "fs"
import { join } from "path"

interface PopularPost {
  path: string
  views: number
}

// Read the data file at render time (not bundled) so the GA4 export written by
// scripts/fetch-popular.mjs on CI is picked up without rebuilding the plugin.
function loadPopularPosts(): PopularPost[] {
  try {
    const raw = readFileSync(
      join(process.cwd(), "quartz-plugins/popular-posts/data/popular-posts.json"),
      "utf-8",
    )
    return JSON.parse(raw)
  } catch {
    return []
  }
}

const popularData = loadPopularPosts()

const normSlug = (s: string) => simplifySlug(s).normalize("NFC").toLowerCase()

interface Options {
  title?: string
  limit: number
}

const defaultOptions: Options = {
  title: "Popular",
  limit: 5,
}

export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const PopularPosts: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
  }: QuartzComponentProps) => {
    const posts = popularData
      .map(({ path, views }) => {
        const fullSlug = decodeURIComponent(path.replace(/^\//, "")) as FullSlug
        // v5 lowercases slugs; match case- and Unicode-normalization-insensitively
        // against the original-case GA paths.
        const slug = normSlug(fullSlug)
        const file = allFiles.find((f) => normSlug(f.slug!) === slug)
        return file ? { file, views } : null
      })
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .slice(0, opts.limit)

    if (posts.length === 0) return null

    return (
      <div class={classNames(displayClass, "popular-posts", "recent-notes")}>
        <h3>
          {opts.title}
          <span style="font-size: 0.7em; font-weight: normal; margin-left: 0.5em; opacity: 0.6;">
            last 30 days
          </span>
        </h3>
        <ul class="recent-ul">
          {posts.map(({ file, views }) => (
            <li class="recent-li">
              <div class="section">
                <div class="desc">
                  <h3>
                    <a href={resolveRelative(fileData.slug!, file.slug!)} class="internal">
                      {file.frontmatter?.title ?? file.slug}
                    </a>
                  </h3>
                </div>
                <p class="meta">{views.toLocaleString()} views</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  PopularPosts.css = style

  return PopularPosts
}) satisfies QuartzComponentConstructor
