import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Palette } from "lucide-react";
import { Popover, PopoverTrigger } from "@nextui-org/popover";

import { StyleSettingPopoverContent } from "@/components/toolbar/style-setting-popover-content.tsx";

export interface LayoutSetting {
  containerEnabled: boolean;
  containerPadding: number;
  containerBgColor: string;
  articlePadding: number;
  articleBgColor: string;
}

const StyleSettingPopover = () => {
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
        <StyleSettingPopoverContent />
      </Popover>
    </ButtonGroup>
  );
};

export default StyleSettingPopover;
