import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { useTranslation } from "react-i18next";

import CopyButtonGroup from "./copy-button-group.tsx";
import DownloadButtonGroup from "./download-button-group.tsx";

import LayoutSettingMenu from "@/components/layout-setting-menu.tsx";

type ToolbarProps = {
  selectedStyle: string;
  setSelectedStyle: React.Dispatch<React.SetStateAction<string>>;
  markdownStyles: { name: string }[];
};

const Toolbar: React.FC<ToolbarProps> = ({
  selectedStyle,
  setSelectedStyle,
  markdownStyles,
}) => {
  const { t } = useTranslation();

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
      <LayoutSettingMenu />
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
