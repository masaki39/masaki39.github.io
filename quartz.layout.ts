import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.KofiSupport(),
    Component.RecentNotes({ title: "Recent writing", showTags: false, limit: 5, linkToMore: "tags/note", filter: (f) => f.frontmatter?.tags?.includes("note") ?? false }),
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'masaki39/masaki39.github.io',
        // from data-repo-id
        repoId: 'R_kgDON-ip9g',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDON-ip9s4CnRWX',
      }
    }),
  ],
  footer: Component.Footer({
    links: {
      "🐙 GitHub": "https://github.com/masaki39",
      "🦋 Bluesky": "https://bsky.app/profile/masaki39.net",
      "📡 RSS": "https://masaki39.net/index.xml",
      "💛 Support": "https://masaki39.net/support",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TerminalHero(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.DesktopOnly(Component.PopularPosts({ limit: 5 }),),
  ],
  right: [
    Component.DesktopOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.DesktopOnly(Component.PopularPosts({ limit: 5 }),),
  ],
  right: [],
}
