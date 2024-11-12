import React from "react";
import { PopoverContent } from "@nextui-org/popover";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";

import { ToolbarState } from "@/state/toolbarState.ts";

export const StyleSettingPopoverContent = () => {
  const { containerStyle, setContainerStyle } = ToolbarState.useContainer();
  const backgroundSet = [
    { src: "/background/tw-white.jpg", color: "#8cf395" },
    { src: "/background/tw-green.jpg", color: "#cb2929" },
    { src: "/background/tw-blue.jpg", color: "#0520d0" },
  ];

  return (
    <PopoverContent className="w-[360px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground" {...titleProps}>
            Layout Customizer
          </p>
          <p className="my-2">background</p>
          <div className="flex gap-2">
            {backgroundSet.map((item) => (
              <Card key={item.src}>
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  height={100}
                  src={item.src}
                  width={60}
                  onClick={() => {
                    setContainerStyle(
                      `${containerStyle}\n.container-layout {background: ${item.color};}`,
                    );
                  }}
                />
              </Card>
            ))}
          </div>

          {/*<div className="mt-4 flex flex-col gap-3 w-full">*/}
          {/*  <Slider*/}
          {/*    className="max-w-md"*/}
          {/*    defaultValue={32}*/}
          {/*    getValue={(donuts) => `${donuts}px`}*/}
          {/*    label="Container Padding"*/}
          {/*    maxValue={48}*/}
          {/*    minValue={0}*/}
          {/*    step={4}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      )}
    </PopoverContent>
  );
};
