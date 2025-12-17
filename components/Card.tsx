import Link from "next/link";
import type { FileRow } from "@/types/appwrite";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";

const Card = ({ file }: { file: FileRow }) => {
  const ownerName =
    typeof file.owner === "object" && file.owner
      ? file.owner.fullName
      : "Unknown";

  return (
    <Link
      href={file.url}
      target="_blank"
      className="flex cursor-pointer flex-col gap-6 rounded-[18px] bg-background dark:bg-foreground p-5 shadow-sm transition-all hover:shadow-drop-3"
    >
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url!}
          className="size-20"
          imageClassName="size-20"
        />
        <div className="flex flex-col items-end justify-between">
          <ActionDropdown file={file} />
          <p className="body-1">{convertFileSize(file.size)}</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 text-light-100 dark:text-primary">
        <p className="subtitle-2 line-clamp-1">{file.name}</p>
        <FormattedDateTime
          date={file.$createdAt}
          className="body-2 text-light-100 dark:text-primary"
        />
        <p className="caption line-clamp-1 text-light-200 dark:text-primary/60">
          By: {ownerName}
        </p>
      </div>
    </Link>
  );
};

export default Card;
