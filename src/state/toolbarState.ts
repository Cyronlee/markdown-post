import { useState } from "react";
import { createContainer } from "unstated-next";

import { loadCSS, markdownStyles } from "@/config/post-styles.ts";

const useToolbarState = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>(
    markdownStyles[0].name,
  );

  const [articleStyle, setArticleStyle] = useState<string>(
    loadCSS(selectedStyle) as string,
  );

  return {
    selectedStyle,
    setSelectedStyle,
    articleStyle,
    setArticleStyle,
  };
};

export const ToolbarState = createContainer(useToolbarState);
