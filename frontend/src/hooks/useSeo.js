import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function setMetaByName(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function useSeo({
  title,
  description,
  image = "/social-cover.svg",
  type = "website",
} = {}) {
  const location = useLocation();

  useEffect(() => {
    const baseTitle = "Librería El Carmen";
    const fullTitle = title ? `${title} | ${baseTitle}` : baseTitle;
    const desc =
      description ||
      "Catálogo de librería y papelería con atención por WhatsApp, productos escolares y de oficina.";
    const canonicalUrl = `${window.location.origin}${location.pathname}`;

    document.title = fullTitle;

    setMetaByName("description", desc);
    setMetaByProperty("og:title", fullTitle);
    setMetaByProperty("og:description", desc);
    setMetaByProperty("og:type", type);
    setMetaByProperty("og:url", canonicalUrl);
    setMetaByProperty("og:image", `${window.location.origin}${image}`);

    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", fullTitle);
    setMetaByName("twitter:description", desc);
    setMetaByName("twitter:image", `${window.location.origin}${image}`);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
  }, [description, image, location.pathname, title, type]);
}
