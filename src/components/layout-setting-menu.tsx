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

const LayoutSettingMenu = () => {
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
        <StyleSettingSection />
      </Popover>
    </ButtonGroup>
  );
};

export default LayoutSettingMenu;
