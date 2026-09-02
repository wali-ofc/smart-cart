import { useEffect } from "react";

export default function MetaComponent({ meta }) {
  useEffect(() => {
    if (meta?.title) {
      document.title = meta.title;
    }
    if (meta?.description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute("content", meta.description);
    }
  }, [meta]);

  return null;
}
