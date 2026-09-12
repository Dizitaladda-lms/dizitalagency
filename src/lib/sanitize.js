import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "blockquote",
  "ul",
  "ol",
  "li",
  "a",
  "strong",
  "em",
  "u",
  "s",
  "code",
  "pre",
  "img",
  "br",
  "hr",
  "table",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "span",
  "div"
];

const ALLOWED_ATTRIBUTES = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "title", "width", "height", "loading"],
  li: ["data-list", "data-indent", "data-checked"],
  "*": ["class"]
};

export const sanitizeBlogHtml = (value = "") =>
  sanitizeHtml(value, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        rel: "noopener noreferrer",
        target: "_blank"
      })
    }
  });

export const sanitizeContent = sanitizeBlogHtml;

export const stripHtml = (value = "") =>
  sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {}
  })
    .replace(/\s+/g, " ")
    .trim();
