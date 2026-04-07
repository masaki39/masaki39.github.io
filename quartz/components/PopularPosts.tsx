import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, resolveRelative, simplifySlug } from "../util/path"
import { classNames } from "../util/lang"
import style from "./styles/recentNotes.scss"
import { readFileSync } from "fs"
import { join } from "path"

interface PopularPost {
  path: string
  views: number
}

function loadPopularPosts(): PopularPost[] {
  try {
    const raw = readFileSync(join(process.cwd(), "quartz/data/popular-posts.json"), "utf-8")
    return JSON.parse(raw)
  } catch {
    return []
  }
}

const popularData = loadPopularPosts()

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
        const slug = simplifySlug(fullSlug)
        const file = allFiles.find((f) => simplifySlug(f.slug!) === slug)
        return file ? { file, views } : null
      })
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .slice(0, opts.limit)

    if (posts.length === 0) return null

    return (
      <div class={classNames(displayClass, "popular-posts", "recent-notes")}>
        <h3>{opts.title}</h3>
        <ul class="recent-ul">
          {posts.map(({ file, views }) => (
            <li class="recent-li">
              <div class="section">
                <div class="desc">
                  <h3>
                    <a
                      href={resolveRelative(fileData.slug!, file.slug!)}
                      class="internal"
                    >
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
