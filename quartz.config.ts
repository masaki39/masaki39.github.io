import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "砂の書庫",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: { provider: 'google', tagId: 'G-FWFC15R9LQ' },
    locale: "ja-JP",
    baseUrl: "masaki39.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "created",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans JP",
        body: "Noto Sans JP",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#e1e2e7",
          lightgray: "#c4c8da",
          gray: "#9699a3",
          darkgray: "#4c505e",
          dark: "#343b58",
          secondary: "#2e7de9",
          tertiary: "#9854f1",
          highlight: "rgba(46, 125, 233, 0.1)",
          textHighlight: "#8c6c3e40",
        },
        darkMode: {
          light: "#1a1b26",
          lightgray: "#24283b",
          gray: "#565f89",
          darkgray: "#a9b1d6",
          dark: "#c0caf5",
          secondary: "#7aa2f7",
          tertiary: "#bb9af7",
          highlight: "rgba(122, 162, 247, 0.1)",
          textHighlight: "#e0af6840",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "tokyo-night",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
