import { cn, getFileIcon } from "@/lib/utils";
import { ThumbnailProps } from "@/types";
import Image from "next/image";

const Thumbnail = ({
  type,
  extension,
  url = "string",
  imageClassName,
  className,
}: ThumbnailProps) => {
  const isImage = type === "image" && extension !== "svg";

  return (
    <figure
      className={cn(
        "flex-center size-12.5 min-w-12.5 overflow-hidden rounded-full bg-brand/10 dark:bg-[#1D2039]",
        className
      )}
    >
      <Image
        src={isImage ? url : getFileIcon(extension, type)}
        alt="thumbnail"
        width={100}
        height={100}
        className={cn(
          "size-8 object-contain",
          imageClassName,
          isImage && "size-full object-cover object-center"
        )}
      />
    </figure>
  );
};

export default Thumbnail;
