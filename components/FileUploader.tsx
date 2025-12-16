"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { cn, convertFileToUrl, getFileType } from "@/lib/utils";
import Image from "next/image";
import Thumbnail from "./Thumbnail";

interface Props {
  ownerId: string;
  accountId: string;
  className?: string;
}

const FileUploader = ({ ownerId, accountId, className }: Props) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        type="button"
        variant="primary"
        className={cn(
          "h-13 gap-2 px-10 shadow-drop-1 cursor-pointer",
          className
        )}
      >
        <Image
          src="/assets/icons/upload.svg"
          alt="upload"
          width={24}
          height={24}
        />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="fixed bottom-10 right-10 z-50 flex size-full h-fit max-w-120 flex-col gap-3 rounded-3xl bg-white dark:bg-foreground p-7 dark:shadow-none">
          <h4 className="h4 text-light-100 dark:text-primary ">Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);

            return (
              <li
                key={`${file.name}-${index}`}
                className="flex items-center justify-between gap-3 rounded-xl p-3 shadow-drop-3 dark:shadow-drop-1 dark:border dark:border-dark-200 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Thumbnail
                    type={type}
                    extension={extension}
                    url={convertFileToUrl(file)}
                  />

                  <div className="flex flex-col gap-2">
                    <p className="subtitle-2 line-clamp-1 max-w-75">
                      {file.name}
                    </p>
                    <Image
                      src="/assets/icons/file-loader.gif"
                      alt="loader"
                      width={80}
                      height={26}
                      unoptimized
                    />
                  </div>
                </div>

                <Image
                  src="/assets/icons/remove.svg"
                  alt="remove"
                  width={24}
                  height={24}
                  className="dark:invert"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default FileUploader;
