// quartz-plugins/kofi-support/src/components/KofiSupport.tsx
import { jsx, jsxs } from "preact/jsx-runtime";
var kofiUrl = "https://ko-fi.com/masaki39";
var KofiSupport_default = (() => {
  const KofiSupport = () => /* @__PURE__ */ jsxs("fieldset", { style: "border: 1px solid var(--gray); border-radius: 8px; padding: 0.75rem 1rem 1rem; margin: 1.5rem 0;", children: [
    /* @__PURE__ */ jsx("legend", { style: "padding: 0 0.5rem; font-size: 0.8em; color: var(--gray); text-align: center;", children: "Liked this note?" }),
    /* @__PURE__ */ jsxs(
      "a",
      {
        href: kofiUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        style: "display: flex; align-items: center; justify-content: center; gap: 0.5rem; width: 100%; padding: 0.6rem 1rem; border: 1px solid var(--gray); border-radius: 6px; color: var(--darkgray); text-decoration: none; font-size: 0.9em; font-weight: 600; box-sizing: border-box;",
        children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 24 24",
              width: "19",
              height: "19",
              fill: "none",
              stroke: "#FF5E5B",
              "stroke-width": "2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "aria-hidden": "true",
              style: "flex-shrink: 0;",
              children: [
                /* @__PURE__ */ jsx("path", { d: "M18 8h1a4 4 0 0 1 0 8h-1" }),
                /* @__PURE__ */ jsx("path", { d: "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" }),
                /* @__PURE__ */ jsx("line", { x1: "6", y1: "1", x2: "6", y2: "4" }),
                /* @__PURE__ */ jsx("line", { x1: "10", y1: "1", x2: "10", y2: "4" }),
                /* @__PURE__ */ jsx("line", { x1: "14", y1: "1", x2: "14", y2: "4" })
              ]
            }
          ),
          "Buy me a coffee"
        ]
      }
    )
  ] });
  return KofiSupport;
});
export {
  KofiSupport_default as KofiSupport
};
