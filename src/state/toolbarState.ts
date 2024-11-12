import { useState } from "react";
import { createContainer } from "unstated-next";

import { markdownStyles } from "@/config/post-styles.ts";
import layoutStyle from "@/styles/layout.css?raw";
const useToolbarState = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>(
    markdownStyles[0].name,
  );

  const [containerStyle, setContainerStyle] = useState<string>(layoutStyle);

  return { selectedStyle, setSelectedStyle, containerStyle, setContainerStyle };
};

export const ToolbarState = createContainer(useToolbarState);
