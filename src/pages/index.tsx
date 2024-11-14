import { useEffect, useState } from "react";
import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from "highlight.js";
import { useTranslation } from "react-i18next";
import markedKatex from "marked-katex-extension";

import DefaultLayout from "@/layouts/default";
import ResizableSplitPane from "@/components/resizable-split-pane";
import inlineStyles from "@/lib/inline-styles";
import { replaceImgSrc } from "@/lib/image-store";
import { TypewriterHero } from "@/components/typewriter-hero";
import { MarkdownEditor } from "@/components/markdown-editor.tsx";
import welcomeMarkdownZh from "@/data/welcome-zh.md?raw";
import welcomeMarkdownEn from "@/data/welcome-en.md?raw";
import Toolbar from "@/components/toolbar/toolbar.tsx";
import { ToolbarState } from "@/state/toolbarState";

// Move marked configuration to a separate constant
const markedInstance = new Marked(
  markedHighlight({
    emptyLangClass: "hljs",
    langPrefix: "hljs language-",
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : "plaintext";

      return hljs.highlight(code, { language }).value;
    },
  }),
  markedKatex({
    throwOnError: false,
  }),
  {
    breaks: true,
  },
);

// Helper functions
const wrapWithContainer = (htmlString: string) => {
  return `<div class="container-layout" style="margin: 0;">
      <div class="article" style="max-width: 960px;margin: 0 auto;">${htmlString}</div>
    </div>`;
};

export default function IndexPage() {
  const { i18n } = useTranslation();
  const { articleStyle } = ToolbarState.useContainer();

  const [markdown, setMarkdown] = useState(welcomeMarkdownZh);
  const [isModified, setIsModified] = useState(false);
  const [inlineStyledHTML, setInlineStyledHTML] = useState("");
  const [showRenderedHTML, setShowRenderedHTML] = useState(true);

  useEffect(() => {
    setMarkdown(i18n.language === "zh" ? welcomeMarkdownZh : welcomeMarkdownEn);
  }, [i18n.language]);

  // Parse markdown to HTML and apply inline styles
  useEffect(() => {
    const parseMarkdown = async () => {
      const parsedHTML = await markedInstance.parse(markdown);
      const wrappedHTML = wrapWithContainer(replaceImgSrc(parsedHTML));

      setInlineStyledHTML(inlineStyles(wrappedHTML, articleStyle));
    };

    parseMarkdown();
  }, [markdown, articleStyle]);

  const handleMarkdownChange = (newMarkdown: string) => {
    setMarkdown(newMarkdown);
    setIsModified(true);
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    if (isModified) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isModified]);

  // UI Components
  const LeftContent = (
    <div className="p-4">
      <MarkdownEditor value={markdown} onChange={handleMarkdownChange} />
    </div>
  );

  const RightContent = (
    <div className="p-4">
      {showRenderedHTML ? (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: inlineStyledHTML }}
            id="markdown-body"
          />
        </>
      ) : (
        inlineStyledHTML
      )}
    </div>
  );

  return (
    <DefaultLayout>
      <TypewriterHero />
      <Toolbar />
      <ResizableSplitPane
        initialLeftWidth={40}
        leftPane={LeftContent}
        maxLeftWidth={70}
        minLeftWidth={30}
        rightPane={RightContent}
      />
    </DefaultLayout>
  );
}
