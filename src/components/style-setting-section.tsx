import React from "react";
import { PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";

import { LayoutSetting } from "@/components/layout-setting-menu.tsx";

const ColorBox = ({ color }: { color: string }) => (
  <div
    className={`size-6 rounded-full flex-shrink-0`}
    style={{ backgroundColor: color }}
  />
);

export const StyleSettingSection = ({
  layoutSetting,
  setLayoutSetting,
}: {
  layoutSetting: LayoutSetting;
  setLayoutSetting: React.Dispatch<React.SetStateAction<LayoutSetting>>;
}) => (
  <PopoverContent className="w-[360px]">
    {(titleProps) => (
      <div className="px-1 py-2 w-full">
        <p className="text-small font-bold text-foreground" {...titleProps}>
          Layout Customizer
        </p>
        <div className="mt-4 flex flex-col gap-3 w-full">
          <Input
            label="Background"
            labelPlacement="outside"
            startContent={<ColorBox color={layoutSetting.containerBgColor} />}
            value={layoutSetting.containerBgColor}
            onChange={(e) => {
              setLayoutSetting((prevState) => ({
                ...prevState,
                containerBgColor: e.target.value as string,
              }));
            }}
          />
          <Slider
            className="max-w-md"
            defaultValue={layoutSetting.containerPadding}
            getValue={(donuts) => `${donuts}px`}
            label="Container Padding"
            maxValue={48}
            minValue={0}
            step={4}
            onChange={(value) => {
              setLayoutSetting((prevState) => ({
                ...prevState,
                containerPadding: value as number,
              }));
            }}
          />
        </div>
      </div>
    )}
  </PopoverContent>
);
