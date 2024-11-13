import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { Card } from "@nextui-org/card";
import { Image } from "@nextui-org/image";
import { Button } from "@nextui-org/button";
import { TwitterPicker } from "react-color";
import { Slider } from "@nextui-org/slider";
import { useTranslation } from "react-i18next";

import { ToolbarState } from "@/state/toolbarState.ts";
import {
  cssToRecord,
  getUnnestStyle,
  objectToStyleString,
} from "@/utils/styletransfer.ts";

export const StyleSettingPopoverContent = () => {
  const { t } = useTranslation();
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
  const [newStyle, setNewStyle] = useState<Record<string, string>>(
    cssToRecord(getUnnestStyle(containerStyle)),
  );

  useEffect(() => {
    if (objectToStyleString(newStyle)) {
      setContainerStyle(
        `.container-layout{
        ${objectToStyleString(newStyle)}
        }`,
      );
    }
  }, [newStyle]);

  return (
    <PopoverContent className="w-[360px]">
      {(titleProps) => (
        <div className="px-1 py-2 w-full">
          <p className="text-small font-bold text-foreground" {...titleProps}>
            {t(`userDefined.layoutCustomizer`)}
          </p>
          <p className="my-3">{t(`userDefined.background`)}</p>
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
                        setNewStyle({
                          ...newStyle,
                          ["background"]: `url(${item.src}) no-repeat center center;`,
                          ["background-size"]: "cover",
                        });
                      }}
                    />
                  </Card>
                );
              } else {
                return (
                  <Popover key={index}>
                    <PopoverTrigger>
                      <Button
                        className="min-w-[38px]"
                        style={{ height: "80px", borderRadius: "14px" }}
                      >
                        +
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <TwitterPicker
                        color={newStyle["background-color"]}
                        onChange={(color) => {
                          setNewStyle({
                            ...newStyle,
                            ["background-color"]: `${color.hex}`,
                            ["background"]: `${color.hex}`,
                          });
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                );
              }
            })}
          </div>
          <div className="mt-4 flex flex-col gap-3 w-full">
            <Slider
              className="max-w-md"
              defaultValue={Number(newStyle["padding"].slice(0, -2)) || 32}
              getValue={(donuts) => `${donuts}px`}
              label={t(`userDefined.containerPadding`)}
              maxValue={64}
              minValue={24}
              step={4}
              onChange={(value) => {
                setNewStyle({
                  ...newStyle,
                  ["padding"]: `${value}px`,
                });
              }}
            />
          </div>
        </div>
      )}
    </PopoverContent>
  );
};
