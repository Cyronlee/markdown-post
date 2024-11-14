import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Palette } from "lucide-react";
import { Popover, PopoverTrigger } from "@nextui-org/popover";
import { useTranslation } from "react-i18next";

import { StyleSettingPopoverContent } from "@/components/toolbar/style-setting-popover-content.tsx";

export interface LayoutSetting {
  containerEnabled: boolean;
  containerPadding: number;
  containerBgColor: string;
  articlePadding: number;
  articleBgColor: string;
}

const StyleSettingPopover = () => {
  const { t } = useTranslation();

  return (
    <ButtonGroup className="w-full" variant="flat">
      <Popover
        showArrow
        offset={10}
        placement="bottom"
        shouldBlockScroll={true}
      >
        <PopoverTrigger>
          <Button className="h-[56px] w-full">
            <Palette size={20} />
            {t(`customize.buttonName`)}
          </Button>
        </PopoverTrigger>
        <StyleSettingPopoverContent />
      </Popover>
    </ButtonGroup>
  );
};

export default StyleSettingPopover;
