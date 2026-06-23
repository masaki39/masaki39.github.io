import type {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "@quartz-community/types"
import { resolveRelative, simplifySlug, type FullSlug } from "../util/path"
import { classNames } from "../util/lang"
import style from "./styles/recentNotes.scss"
import popularData from "../data/popular-posts.json"

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
        // v5 lowercases slugs, so match case-insensitively against the
        // original-case paths coming from the analytics export.
        const slug = simplifySlug(fullSlug).toLowerCase()
        const file = allFiles.find((f) => simplifySlug(f.slug!).toLowerCase() === slug)
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
