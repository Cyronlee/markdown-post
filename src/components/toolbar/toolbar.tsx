import React, { useEffect } from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { useTranslation } from "react-i18next";

import CopyButtonGroup from "./copy-button-group.tsx";
import DownloadButtonGroup from "./download-button-group.tsx";

import StyleSettingPopover from "@/components/toolbar/style-setting-popover.tsx";
import { ToolbarState } from "@/state/toolbarState";
import { loadCSS, markdownStyles } from "@/config/post-styles.ts";

const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const { selectedStyle, setSelectedStyle, setArticleStyle } =
    ToolbarState.useContainer();

  useEffect(() => {
    setArticleStyle(loadCSS(selectedStyle) as string);
  }, [selectedStyle]);

  return (
    <div className="grid grid-cols-12 gap-4 items-center mb-4">
      <Select
        className="lg:col-span-6 col-span-8"
        disallowEmptySelection={true}
        label={t("toolbar.selectStyleText")}
        selectedKeys={[selectedStyle]}
        onChange={(e) => setSelectedStyle(e.target.value)}
      >
        {markdownStyles.map((style) => (
          <SelectItem key={style.name} value={style.name}>
            {t(`postStyle.${style.name}`)}
          </SelectItem>
        ))}
      </Select>
      <div className="lg:col-span-2 col-span-4">
        <StyleSettingPopover />
      </div>
      <div className="lg:col-span-2 col-span-6">
        <CopyButtonGroup />
      </div>
      <div className="lg:col-span-2 col-span-6">
        <DownloadButtonGroup />
      </div>
    </div>
  );
};

export default Toolbar;
