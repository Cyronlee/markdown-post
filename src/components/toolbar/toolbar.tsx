import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { useTranslation } from "react-i18next";

import CopyButtonGroup from "./copy-button-group.tsx";
import DownloadButtonGroup from "./download-button-group.tsx";

import StyleSettingPopover from "@/components/toolbar/style-setting-popover.tsx";
import { ToolbarState } from "@/state/toolbarState";
import { markdownStyles } from "@/config/post-styles.ts";

const Toolbar: React.FC = () => {
  const { t } = useTranslation();
  const { selectedStyle, setSelectedStyle } = ToolbarState.useContainer();

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
      <Select
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
      <StyleSettingPopover />
      <div className="hidden md:flex flex-row gap-4 items-center">
        <CopyButtonGroup />
        <DownloadButtonGroup />
      </div>
      <div className="md:hidden w-full flex flex-row gap-4 items-center">
        <CopyButtonGroup fullWidth />
        <DownloadButtonGroup fullWidth />
      </div>
    </div>
  );
};

export default Toolbar;
