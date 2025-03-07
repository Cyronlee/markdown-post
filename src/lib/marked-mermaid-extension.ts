import { MarkedExtension } from "marked";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
  securityLevel: "loose",
});

const generateId = () =>
  `mermaid-${Math.random().toString(36).substring(2, 10)}`;

export const markedMermaid = (): MarkedExtension => {
  return {
    renderer: {
      code(token) {
        if (token.lang === "mermaid") {
          const id = generateId();

          return `<div class="mermaid-container flex justify-center">
                    <pre class="mermaid w-full" id="${id}">${token.text}</pre>
                  </div>`;
        }

        return false;
      },
    },
  };
};

export const renderMermaidDiagrams = () => {
  setTimeout(() => {
    try {
      mermaid.run({
        querySelector: ".mermaid",
      });
    } catch (error) {
      console.error("Mermaid render error:", error);
    }
  }, 0);
};
