import React from "react";
import { PopoverContent } from "@nextui-org/popover";
import { Input } from "@nextui-org/input";
import { Slider } from "@nextui-org/slider";

const ColorBox = ({ color }: { color: string }) => (
  <div
    className={`size-6 rounded-full flex-shrink-0`}
    style={{ backgroundColor: color }}
  />
);

export const StyleSettingSection = () => (
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
            startContent={<ColorBox color={"#232323"} />}
            value={"#656565"}
          />
          <Slider
            className="max-w-md"
            defaultValue={32}
            getValue={(donuts) => `${donuts}px`}
            label="Container Padding"
            maxValue={48}
            minValue={0}
            step={4}
          />
        </div>
      </div>
    )}
  </PopoverContent>
);
