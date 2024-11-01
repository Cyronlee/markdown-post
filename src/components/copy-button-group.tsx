import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";
import { Copy } from "lucide-react";

import { ChevronDownIcon } from "@/components/icons.tsx";
import { copyHtmlWithStyle } from "@/lib/copy-html.tsx";

interface CopyButtonGroupProps {
  fullWidth?: boolean;
}

export default function CopyButtonGroup({ fullWidth }: CopyButtonGroupProps) {
  const [selectedOption, setSelectedOption] = React.useState<any>(
    new Set(["email"]),
  );

  const descriptionsMap: any = {
    email: "Then you can paste it to email editor like Gmail.",
    image: "Then you can paste it to every where.",
  };

  const labelsMap: any = {
    email: "Copy as email",
    image: "Copy as image",
  };

  const selectedOptionValue: any = Array.from(selectedOption)[0];

  const handleCopyButtonClick = () => {
    if (selectedOption.has("email")) {
      copyHtmlWithStyle("markdown-body");
      toast.success(`Content copied`, {
        description: "You can paste into your email",
        duration: 4000,
        position: "top-center",
      });
    } else if (selectedOption.has("image")) {
      const element = document.getElementById("markdown-body");
      if (element) {
        htmlToImage
          .toBlob(element)
          .then(function (blob: any) {
            navigator.clipboard
              .write([new ClipboardItem({ "image/png": blob })])
              .then(() => {
                toast.success("Image copied to clipboard", {
                  duration: 4000,
                  position: "top-center",
                });
              })
              .catch((err) => {
                console.error("Failed to copy image to clipboard:", err);
                toast.error("Failed to copy image");
              });
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
            toast.error(error);
            toast.error(error?.message);
          });
      }
    }
  };

  return (
    <ButtonGroup fullWidth={fullWidth} variant="flat">
      <Button className="h-[56px]" onClick={handleCopyButtonClick}>
        <Copy size={20} />
        {labelsMap[selectedOptionValue]}
      </Button>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Button isIconOnly className="h-[56px]">
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          disallowEmptySelection
          aria-label="Merge options"
          className="max-w-[300px]"
          selectedKeys={selectedOption}
          selectionMode="single"
          onSelectionChange={setSelectedOption}
        >
          <DropdownItem key="email" description={descriptionsMap["email"]}>
            {labelsMap["email"]}
          </DropdownItem>
          <DropdownItem key="image" description={descriptionsMap["image"]}>
            {labelsMap["image"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
