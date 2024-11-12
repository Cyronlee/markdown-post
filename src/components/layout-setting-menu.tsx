import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Palette } from "lucide-react";
import { Popover, PopoverTrigger } from "@nextui-org/popover";

import { StyleSettingSection } from "@/components/style-setting-section.tsx";

export interface LayoutSetting {
  containerEnabled: boolean;
  containerPadding: number;
  containerBgColor: string;
  articlePadding: number;
  articleBgColor: string;
}

export const defaultLayoutSetting: LayoutSetting = {
  containerEnabled: true,
  containerPadding: 24,
  containerBgColor: "#e5e5e5",
  articlePadding: 24,
  articleBgColor: "#333",
};

type LayoutSettingProps = {
  layoutSetting: LayoutSetting;
  setLayoutSetting: React.Dispatch<React.SetStateAction<LayoutSetting>>;
};

const LayoutSettingMenu = ({
  layoutSetting,
  setLayoutSetting,
}: LayoutSettingProps) => {
  return (
    <ButtonGroup variant="flat">
      <Popover
        showArrow
        offset={10}
        placement="bottom"
        shouldBlockScroll={true}
      >
        <PopoverTrigger>
          <Button className="h-[56px] w-[156px]">
            <Palette size={20} />
            user-defined
          </Button>
        </PopoverTrigger>
        <StyleSettingSection
          layoutSetting={layoutSetting}
          setLayoutSetting={setLayoutSetting}
        />
      </Popover>
    </ButtonGroup>
  );
};

export default LayoutSettingMenu;
