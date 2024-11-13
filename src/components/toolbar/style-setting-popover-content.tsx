import React from "react";
import { PopoverContent } from "@nextui-org/popover";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";

import { ToolbarState } from "@/state/toolbarState.ts";

export const StyleSettingPopoverContent = () => {
  const { containerStyle, setContainerStyle } = ToolbarState.useContainer();

  const backgroundSet = [
    { src: "/background/marble.jpg", type: "card" },
    { src: "/background/dark-blue.jpg", type: "card" },
    { src: "/background/blue.jpg", type: "card" },
    { src: "/background/yellow.jpg", type: "card" },
    { src: "/background/gold.jpg", type: "card" },
    { src: "/background/green.jpg", type: "card" },
    { src: "/background/soft-green.jpg", type: "card" },
    { type: "button" },
  ];

  return (
    <PopoverContent className="w-[360px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground" {...titleProps}>
            Layout Customizer
          </p>
          <p className="my-2">background</p>
          <div className="grid grid-cols-8 gap-1 items-center">
            {backgroundSet.map((item, index) => {
              if (item.type === "card") {
                return (
                  <Card key={item.src}>
                    <Image
                      alt="Woman listing to music"
                      className="object-cover w-full"
                      height={80}
                      src={item.src}
                      onClick={() => {
                        setContainerStyle(
                          `${containerStyle}\n.container-layout {background: url(${item.src}) no-repeat center center; background-size: cover;}`,
                        );
                      }}
                    />
                  </Card>
                );
              } else {
                return (
                  <Button
                    key={index}
                    className="min-w-[38px]"
                    style={{ height: "80px", borderRadius: "14px" }}
                  >
                    +
                  </Button>
                );
              }
            })}
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
