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

interface PopularPostsData {
  month: string // "YYYY-MM" of the ranked month, e.g. "2026-06"
  posts: PopularPost[]
}

// Read the data file at render time (not bundled) so the GA4 export written by
// scripts/fetch-popular.mjs on CI is picked up without rebuilding the plugin.
function loadPopularPosts(): PopularPostsData {
  try {
    const raw = readFileSync(
      join(process.cwd(), "quartz-plugins/popular-posts/data/popular-posts.json"),
      "utf-8",
    )
    return JSON.parse(raw)
  } catch {
    return { month: "", posts: [] }
  }
}

const popularData = loadPopularPosts()

// "2026-06" -> "Jun 2026"
function formatMonthLabel(month: string): string {
  const [year, monthNum] = month.split("-").map(Number)
  if (!year || !monthNum) return ""
  return new Date(Date.UTC(year, monthNum - 1, 1)).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  })
}

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
    const seen = new Set<string>()
    const monthLabel = formatMonthLabel(popularData.month)
    const posts = popularData.posts
      .map(({ path, views }) => {
        const fullSlug = decodeURIComponent(path.replace(/^\//, "")) as FullSlug
        // v5 lowercases slugs; match case- and Unicode-normalization-insensitively
        // against the original-case GA paths.
        const slug = normSlug(fullSlug)
        if (slug.endsWith(".base")) return null // Bases pages aren't articles
        const file = allFiles.find((f) => normSlug(f.slug!) === slug)
        return file ? { file, views } : null
      })
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .filter(({ file }) => {
        // GA can report the same article under multiple raw paths; keep the
        // first (highest-viewed) occurrence only.
        const key = normSlug(file.slug!)
        if (seen.has(key)) return false
        seen.add(key)
        return true
      })
      .slice(0, opts.limit)

    if (posts.length === 0) return null

    return (
      <div class={classNames(displayClass, "popular-posts", "recent-notes")}>
        <h3>
          {opts.title}
          {monthLabel && (
            <span style="font-size: 0.7em; font-weight: normal; margin-left: 0.5em; opacity: 0.6;">
              {monthLabel}
            </span>
          )}
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
