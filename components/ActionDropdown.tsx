"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { EllipsisVertical } from "lucide-react";
import { FileRow } from "@/types/appwrite";
import { actionsDropdownItems } from "./constants";
import { ActionType } from "@/types";
import Link from "next/link";
import { constructDownloadUrl } from "@/lib/utils";
import { Input } from "./ui/input";
import { renameFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

const ActionDropdown = ({ file }: { file: FileRow }) => {
  const getBaseName = (fullName: string) => fullName.replace(/\.[^/.]+$/, "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [fileName, setFileName] = useState(getBaseName(file.name));
  const [currentFullName, setCurrentFullName] = useState(file.name);
  const [isLoading, setIsLoading] = useState(false);

  const path = usePathname();

  useEffect(() => {
    setFileName(getBaseName(file.name));
    setCurrentFullName(file.name);
  }, [file.name]);

  const closeAllModals = () => {
    setIsModalOpen(false);
    setIsDropdownOpen(false);
    setAction(null);
    setFileName(getBaseName(file.name));
  };

  const handleAction = async () => {
    if (!action) return;
    setIsLoading(true);

    const actions = {
      rename: () =>
        renameFile({
          fileId: file.$id,
          name: fileName,
          extension: file.extension,
          path,
        }),
      share: async () => true,
      delete: async () => true,
    };

    const result = await actions[action.value as keyof typeof actions]();

    if (action.value === "rename" && result?.name) {
      setCurrentFullName(result.name);
    }

    if (result) closeAllModals();

    setIsLoading(false);
  };

  const renderDialogContent = () => {
    if (!action) return null;

    const { value, label } = action;

    return (
      <DialogContent
        className="rounded-xl w-[90%] max-w-100 px-6 py-8 button"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex flex-col gap-4">
          <DialogTitle className="text-center text-light-100 dark:text-primary">
            {label}
          </DialogTitle>
          {value === "rename" && (
            <Input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          )}
        </DialogHeader>
        {["rename", "delete", "share"].includes(value) && (
          <DialogFooter className="flex flex-col gap-3 md:flex-row">
            <Button
              onClick={closeAllModals}
              className="h-13 flex-1 rounded-xl bg-background dark:bg-foreground text-light-100 dark:text-primary hover:bg-transparent shadow-drop-1 "
            >
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              variant="primary"
              className="mx-0! h-13! w-full flex-1"
            >
              {!isLoading ? (
                <p className="capitalize">{value}</p>
              ) : (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="animate-spin"
                />
              )}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    );
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="outline" size="icon">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-50 truncate cursor-default">
            {currentFullName}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropdownItems.map((actionItem) => (
            <DropdownMenuItem
              key={actionItem.value}
              className="cursor-pointer"
              onClick={() => {
                setAction(actionItem);

                if (actionItem.value === "rename") {
                  setFileName(getBaseName(file.name));
                }

                if (
                  ["rename", "share", "delete", "details"].includes(
                    actionItem.value
                  )
                ) {
                  setIsModalOpen(true);
                }
              }}
            >
              {actionItem.value === "download" ? (
                <Link
                  href={constructDownloadUrl(file.bucketFileId)}
                  download={currentFullName}
                  className="flex items-center gap-2"
                >
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </Link>
              ) : (
                <div className="flex items-center gap-2">
                  <Image
                    src={actionItem.icon}
                    alt={actionItem.label}
                    width={30}
                    height={30}
                  />
                  {actionItem.label}
                </div>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {renderDialogContent()}
    </Dialog>
  );
};

export default ActionDropdown;
