// quartz-plugins/popular-posts/src/util/path.ts
function endsWith(s, suffix) {
  return s === suffix || s.endsWith("/" + suffix);
}
function trimSuffix(s, suffix) {
  return endsWith(s, suffix) ? s.slice(0, -suffix.length) : s;
}
function stripSlashes(s, onlyStripPrefix) {
  if (s.startsWith("/")) s = s.substring(1);
  if (!onlyStripPrefix && s.endsWith("/")) s = s.slice(0, -1);
  return s;
}
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function joinSegments(...args) {
  if (args.length === 0) return "";
  let joined = args.filter((segment) => segment !== "" && segment !== "/").map((segment) => stripSlashes(segment)).join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) joined = "/" + joined;
  if (last?.endsWith("/")) joined = joined + "/";
  return joined;
}
function pathToRoot(slug) {
  let rootPath = slug.split("/").filter((x) => x !== "").slice(0, -1).map(() => "..").join("/");
  if (rootPath.length === 0) rootPath = ".";
  return rootPath;
}
function resolveRelative(current, target) {
  return joinSegments(pathToRoot(current), simplifySlug(target));
}

// quartz-plugins/popular-posts/src/util/lang.ts
function classNames(displayClass, ...classes) {
  return [...classes, displayClass].filter((x) => Boolean(x)).join(" ");
}

// quartz-plugins/popular-posts/src/components/styles/recentNotes.scss
var recentNotes_default = ".recent-notes > h3 {\n  margin: 0.5rem 0 0 0;\n  font-size: 1rem;\n}\n.recent-notes > ul.recent-ul {\n  list-style: none;\n  margin-top: 1rem;\n  padding-left: 0;\n}\n.recent-notes > ul.recent-ul > li {\n  margin: 1rem 0;\n}\n.recent-notes > ul.recent-ul > li .section > .desc > h3 > a {\n  background-color: transparent;\n}\n.recent-notes > ul.recent-ul > li .section > .meta {\n  margin: 0 0 0.5rem 0;\n  opacity: 0.6;\n}";

// quartz-plugins/popular-posts/src/data/popular-posts.json
var popular_posts_default = [
  { path: "/Citations_2024-02-08", views: 1234 },
  { path: "/Dataview%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9", views: 890 },
  { path: "/Dataview%E3%82%92%E4%BD%BF%E3%81%84%E8%BE%BC%E3%82%80", views: 756 },
  { path: "/Obsidian%E3%81%A7Bibliography%E4%BB%98%E3%81%8D%E6%96%87%E6%9B%B8%E3%82%92%E4%BD%9C%E6%88%90", views: 543 }
];

// quartz-plugins/popular-posts/src/components/PopularPosts.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var defaultOptions = {
  title: "Popular",
  limit: 5
};
var PopularPosts_default = ((userOpts) => {
  const opts = { ...defaultOptions, ...userOpts };
  const PopularPosts = ({
    allFiles,
    fileData,
    displayClass
  }) => {
    const posts = popular_posts_default.map(({ path, views }) => {
      const fullSlug = decodeURIComponent(path.replace(/^\//, ""));
      const slug = simplifySlug(fullSlug).toLowerCase();
      const file = allFiles.find((f) => simplifySlug(f.slug).toLowerCase() === slug);
      return file ? { file, views } : null;
    }).filter((p) => p !== null).slice(0, opts.limit);
    if (posts.length === 0) return null;
    return /* @__PURE__ */ jsxs("div", { class: classNames(displayClass, "popular-posts", "recent-notes"), children: [
      /* @__PURE__ */ jsxs("h3", { children: [
        opts.title,
        /* @__PURE__ */ jsx("span", { style: "font-size: 0.7em; font-weight: normal; margin-left: 0.5em; opacity: 0.6;", children: "last 30 days" })
      ] }),
      /* @__PURE__ */ jsx("ul", { class: "recent-ul", children: posts.map(({ file, views }) => /* @__PURE__ */ jsx("li", { class: "recent-li", children: /* @__PURE__ */ jsxs("div", { class: "section", children: [
        /* @__PURE__ */ jsx("div", { class: "desc", children: /* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsx("a", { href: resolveRelative(fileData.slug, file.slug), class: "internal", children: file.frontmatter?.title ?? file.slug }) }) }),
        /* @__PURE__ */ jsxs("p", { class: "meta", children: [
          views.toLocaleString(),
          " views"
        ] })
      ] }) })) })
    ] });
  };
  PopularPosts.css = recentNotes_default;
  return PopularPosts;
});
export {
  PopularPosts_default as PopularPosts
};
