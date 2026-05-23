import { replaceMermaidWithImages } from "@/lib/mermaid-to-image";

export const copyHtmlWithStyle = async (elementId: string) => {
  const element = document.getElementById(elementId);

  if (!element) {
    console.error("Element not found");

    return;
  }

  // Clone the element and include all styles as inline styles
  const clone = element.cloneNode(true) as HTMLElement;

  // Mermaid renders to inline SVG which most email clients (Outlook, NetEase
  // Mail, QQ Mail, ...) cannot display reliably. Rasterise each diagram to a
  // PNG data URL on the clone so the live preview keeps its vector quality
  // while the clipboard payload becomes email-friendly.
  await replaceMermaidWithImages(element, clone);

  const inlineStyles = (element: HTMLElement) => {
    const computedStyle = window.getComputedStyle(element);
    // Convert CSSStyleDeclaration to array of property names
    const properties = Array.from(computedStyle);

    for (const key of properties) {
      element.style[key as any] = computedStyle.getPropertyValue(key);
    }
  };

  // Apply inline styles recursively. Skip <svg> subtrees: applying ~300
  // computed HTML styles onto SVG children produces broken markup, and after
  // the mermaid rasterisation step there should be no SVGs left anyway.
  const applyStylesRecursively = (element: HTMLElement) => {
    if (element instanceof SVGElement) return;
    inlineStyles(element);
    Array.from(element.children).forEach((child) =>
      applyStylesRecursively(child as HTMLElement),
    );
  };

  applyStylesRecursively(clone);

  // Get the HTML content as a string
  const htmlContent = clone.outerHTML;

  // Use Clipboard API to copy the HTML with inline styles. We intentionally
  // let any failure propagate so that callers (e.g. toast.promise) can
  // distinguish success from failure; previously we swallowed the error,
  // which made the UI report a fake "success".
  await navigator.clipboard.write([
    new ClipboardItem({
      "text/html": new Blob([htmlContent], { type: "text/html" }),
    }),
  ]);
};
