import React from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Copy } from "lucide-react";
import { Slider } from "@nextui-org/slider";

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

const ColorBox = ({ color }: { color: string }) => (
  <div
    className={`size-6 rounded-full flex-shrink-0`}
    style={{ backgroundColor: color }}
  ></div>
);

const LayoutSettingMenu = ({
  layoutSetting,
  setLayoutSetting,
}: LayoutSettingProps) => {
  return (
    <Popover placement="bottom" showArrow offset={10} shouldBlockScroll={true}>
      <PopoverTrigger>
        <Button className="h-[56px] w-[156px]">
          <Copy size={20} />
          Setting
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[360px]">
        {(titleProps) => (
          <div className="px-1 py-2 w-full">
            <p className="text-small font-bold text-foreground" {...titleProps}>
              Layout Customizer
            </p>
            <div className="mt-4 flex flex-col gap-3 w-full">
              <Input
                label="Container Background"
                value={layoutSetting.containerBgColor}
                onChange={(e) => {
                  setLayoutSetting((prevState) => ({
                    ...prevState,
                    containerBgColor: e.target.value as string,
                  }));
                }}
                labelPlacement="outside"
                startContent={
                  <ColorBox color={layoutSetting.containerBgColor}></ColorBox>
                }
              />
              <Slider
                label="Container Padding"
                step={4}
                maxValue={48}
                minValue={0}
                defaultValue={layoutSetting.containerPadding}
                onChange={(value) => {
                  setLayoutSetting((prevState) => ({
                    ...prevState,
                    containerPadding: value as number,
                  }));
                }}
                getValue={(donuts) => `${donuts}px`}
                className="max-w-md"
              />
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default LayoutSettingMenu;
