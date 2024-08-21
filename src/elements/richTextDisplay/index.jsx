import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

export const RichTextDisplay = ({ content }) => {
  const [sanitizedContent, setSanitizedContent] = useState();

  useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content));
  }, [content]);

  return (
    <div
      className="prose"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
};
