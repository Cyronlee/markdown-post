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
import { Download } from "lucide-react";
import { saveAs } from "file-saver";

import { ChevronDownIcon } from "@/components/icons.tsx";
import { isSafari } from "@/lib/is-safari.ts";

interface DownloadButtonGroupProps {
  fullWidth?: boolean;
}

export default function DownloadButtonGroup({
  fullWidth,
}: DownloadButtonGroupProps) {
  const [selectedOption, setSelectedOption] = React.useState<any>(
    new Set(["image"]),
  );

  const descriptionsMap: any = {
    image: "Download image file.",
    pdf: "Download PDF file.",
  };

  const labelsMap: any = {
    image: "Download image",
    pdf: "Download PDF",
  };

  const selectedOptionValue: any = Array.from(selectedOption)[0];

  const handleDownloadButtonClick = async () => {
    if (selectedOption.has("pdf")) {
      toast.success(`Feature is developing`, {
        duration: 4000,
        position: "top-center",
      });
    } else if (selectedOption.has("image")) {
      htmlToImage
        .toBlob(document.getElementById("markdown-body") as HTMLElement)
        .then(function (blob) {
          saveAs(blob, "markdown-post.png");
        });
    }
  };

  return (
    <ButtonGroup fullWidth={fullWidth} variant="flat">
      <Button className="h-[56px]" onClick={handleDownloadButtonClick}>
        <Download size={20} />
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
          <DropdownItem key="image" description={descriptionsMap["image"]}>
            {labelsMap["image"]}
          </DropdownItem>
          <DropdownItem key="pdf" description={descriptionsMap["pdf"]}>
            {labelsMap["pdf"]}
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}
