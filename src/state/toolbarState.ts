import { useState } from "react";
import { createContainer } from "unstated-next";

import { markdownStyles } from "@/config/post-styles.ts";

const useToolbarState = () => {
  const [selectedStyle, setSelectedStyle] = useState<string>(
    markdownStyles[0].name,
  );

  return { selectedStyle, setSelectedStyle };
};

export const ToolbarState = createContainer(useToolbarState);
