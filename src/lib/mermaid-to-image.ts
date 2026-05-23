import * as htmlToImage from "html-to-image";

/**
 * Convert a rendered mermaid <svg> element into a PNG data URL.
 *
 * Mermaid renders to inline SVG (often containing <foreignObject> for node
 * labels), which most email clients (Outlook, NetEase, QQ Mail, ...) either
 * strip out or render incorrectly. Rasterising to PNG is the most reliable
 * way to preserve the diagram once pasted into an email body.
 *
 * We use `html-to-image` (already a dependency for the "copy as image"
 * feature) instead of a hand-rolled `XMLSerializer + canvas` pipeline,
 * because the naive approach trips over CORS-tainted canvases as soon as
 * mermaid pulls in any external font, style, or <foreignObject> content.
 */
const svgElementToPngDataUrl = async (
  svg: SVGSVGElement,
): Promise<{ dataUrl: string; width: number; height: number } | null> => {
  const rect = svg.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(rect.width || svg.clientWidth || 0));
  const height = Math.max(1, Math.ceil(rect.height || svg.clientHeight || 0));

  if (!width || !height) return null;

  const pixelRatio = Math.max(2, window.devicePixelRatio || 1);

  const dataUrl = await htmlToImage.toPng(svg as unknown as HTMLElement, {
    width,
    height,
    pixelRatio,
    cacheBust: true,
    skipFonts: false,
  });

  return { dataUrl, width, height };
};

/**
 * Replace every rendered mermaid diagram inside `clone` with an <img> backed
 * by a PNG data URL produced from the corresponding live SVG in `source`.
 *
 * Both trees are walked in lockstep using `.mermaid-container` markers, so
 * the live preview keeps the crisp vector rendering while the clipboard
 * payload becomes email-friendly raster images.
 */
export const replaceMermaidWithImages = async (
  source: HTMLElement,
  clone: HTMLElement,
): Promise<void> => {
  const liveContainers = Array.from(
    source.querySelectorAll<HTMLElement>(".mermaid-container"),
  );
  const cloneContainers = Array.from(
    clone.querySelectorAll<HTMLElement>(".mermaid-container"),
  );

  const pairs = liveContainers.map((live, idx) => [
    live,
    cloneContainers[idx],
  ]) as [HTMLElement, HTMLElement | undefined][];

  await Promise.all(
    pairs.map(async ([live, cloned]) => {
      if (!cloned) return;
      const svg = live.querySelector("svg");

      if (!svg) return;

      try {
        const result = await svgElementToPngDataUrl(svg as SVGSVGElement);

        if (!result) return;

        const img = document.createElement("img");

        img.src = result.dataUrl;
        img.width = result.width;
        img.height = result.height;
        img.alt = "mermaid diagram";
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.style.display = "block";
        img.style.margin = "0 auto";

        cloned.innerHTML = "";
        cloned.appendChild(img);
      } catch (error) {
        console.error("Failed to rasterise mermaid diagram:", error);
      }
    }),
  );
};
