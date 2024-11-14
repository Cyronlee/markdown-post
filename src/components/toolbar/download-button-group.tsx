import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";
import { Download } from "lucide-react";

import { ChevronDownIcon } from "@/components/icons.tsx";
import { isSafari } from "@/lib/is-safari.ts";

export default function DownloadButtonGroup() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = React.useState<any>(
    new Set(["image"]),
  );

  const descriptionsMap: any = {
    image: t("downloadImage.buttonDescription"),
    pdf: t("downloadPDF.buttonDescription"),
  };

  const labelsMap: any = {
    image: t("downloadImage.buttonName"),
    pdf: t("downloadPDF.buttonName"),
  };

  const selectedOptionValue: any = Array.from(selectedOption)[0];

  const handleDownloadButtonClick = async () => {
    if (selectedOption.has("pdf")) {
      toast.success(t("commonToast.developing"), {
        duration: 4000,
        position: "top-center",
      });
    } else if (selectedOption.has("image")) {
      const element = document.getElementById("markdown-body");

      if (!element) {
        return;
      }

      toast.success(t("commonToast.processing"), {
        duration: 4000,
        position: "top-center",
      });

      try {
        if (isSafari) {
          // workaround to fix image missing in Safari
          await htmlToImage.toPng(element);
          await htmlToImage.toPng(element);
        }

        const dataUrl = await htmlToImage.toPng(element);

        const link = document.createElement("a");

        link.download = "markdown-post.png";
        link.href = dataUrl;
        link.click();
        toast.success(t("downloadImage.successMessage"), {
          description: t("downloadImage.successDescription"),
          duration: 4000,
          position: "top-center",
        });
      } catch (error) {
        console.error("oops, something went wrong!", error);
        toast.error(t("downloadImage.failedMessage"));
      }
    }
  };

  return (
    <ButtonGroup className="w-full" variant="flat">
      <Button className="h-[56px] w-full" onClick={handleDownloadButtonClick}>
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
