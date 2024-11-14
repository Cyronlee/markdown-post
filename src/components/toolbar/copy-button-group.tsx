import React from "react";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { toast } from "sonner";
import * as htmlToImage from "html-to-image";
import { Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ChevronDownIcon } from "@/components/icons.tsx";
import { copyHtmlWithStyle } from "@/lib/copy-html.tsx";
import { isSafari } from "@/lib/is-safari.ts";

export default function CopyButtonGroup() {
  const { t } = useTranslation();
  const [selectedOption, setSelectedOption] = React.useState<any>(
    new Set(["email"]),
  );

  const descriptionsMap: any = {
    email: t("copyEmail.buttonDescription"),
    image: t("copyImage.buttonDescription"),
  };

  const labelsMap: any = {
    email: t("copyEmail.buttonName"),
    image: t("copyImage.buttonName"),
  };

  const selectedOptionValue: any = Array.from(selectedOption)[0];

  const loadBlobForSafari: any = async (element: HTMLElement) => {
    // workaround to fix image missing in Safari
    await htmlToImage.toBlob(element);
    await htmlToImage.toBlob(element);

    return await htmlToImage.toBlob(element);
  };

  const handleCopyButtonClick = () => {
    if (selectedOption.has("email")) {
      copyHtmlWithStyle("markdown-body");
      toast.success(t("copyEmail.successMessage"), {
        description: t("copyEmail.successDescription"),
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

      if (isSafari) {
        // workaround to fix permission issue in Safari
        const text = new ClipboardItem({
          "image/png": loadBlobForSafari(element).then((blob: any) => blob),
        });

        navigator.clipboard.write([text]);

        toast.success(t("copyImage.successMessage"), {
          duration: 4000,
          position: "top-center",
        });
      } else {
        htmlToImage
          .toBlob(element)
          .then(function (blob: any) {
            navigator.clipboard
              .write([new ClipboardItem({ "image/png": blob })])
              .then(() => {
                toast.success(t("copyImage.successMessage"), {
                  duration: 4000,
                  position: "top-center",
                });
              })
              .catch((err) => {
                toast.error(t("copyImage.failedMessage"));
                console.error("Failed to copy image to clipboard:", err);
              });
          })
          .catch(function (error) {
            toast.error(t("copyImage.failedMessage"));
            console.error("oops, something went wrong!", error);
          });
      }
    }
  };

  return (
    <ButtonGroup className="w-full" variant="flat">
      <Button className="h-[56px] w-full" onClick={handleCopyButtonClick}>
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
