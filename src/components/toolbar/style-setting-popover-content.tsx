import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { ChromePicker } from "react-color";
import { Slider } from "@nextui-org/slider";
import { useTranslation } from "react-i18next";
import { PaintBucket } from "lucide-react";

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
            {t(`customize.layoutCustomizer`)}
          </p>
          <div className="flex gap-2 my-3">
            <span>{t(`customize.containerBackground`)}</span>
            <Popover>
              <PopoverTrigger>
                <PaintBucket />
              </PopoverTrigger>
              <PopoverContent>
                <ChromePicker
                  color={newStyle["background-color"]}
                  disableAlpha={true}
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
          </div>
          {/*<div className="grid grid-cols-8 gap-1 items-center">*/}
          {/*  {backgroundSet.map((item, index) => {*/}
          {/*    if (item.type === "card") {*/}
          {/*      return (*/}
          {/*        <Card key={item.src}>*/}
          {/*          <Image*/}
          {/*            alt="Woman listing to music"*/}
          {/*            className="object-cover w-full"*/}
          {/*            height={80}*/}
          {/*            src={item.src}*/}
          {/*            onClick={() => {*/}
          {/*              setNewStyle({*/}
          {/*                ...newStyle,*/}
          {/*                ["background"]: `url(${item.src}) no-repeat center center;`,*/}
          {/*                ["background-size"]: "cover",*/}
          {/*              });*/}
          {/*            }}*/}
          {/*          />*/}
          {/*        </Card>*/}
          {/*      );*/}
          {/*    } else {*/}
          {/*      return (*/}

          {/*      );*/}
          {/*    }*/}
          {/*  })}*/}
          {/*</div>*/}
          <div />
          <div className="mt-4 flex flex-col gap-3 w-full">
            <Slider
              className="max-w-md"
              defaultValue={Number(newStyle["padding"].slice(0, -2)) || 32}
              getValue={(donuts) => `${donuts}px`}
              label={t(`customize.containerPadding`)}
              maxValue={64}
              minValue={16}
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
