import Image from "next/image";
import Link from "next/link";

import ActionDropdown from "@/components/ActionDropdown";
import { Chart } from "@/components/Chart";
import FormattedDateTime from "@/components/FormattedDateTime";
import Thumbnail from "@/components/Thumbnail";
import { Separator } from "@/components/ui/separator";
import { getFiles, getTotalSpaceUsed } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { FileRow } from "@/types/appwrite";

const Dashboard = async () => {
  // Parallel requests
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    getTotalSpaceUsed(),
  ]);

  // Get usage summary
  const usageSummary = getUsageSummary(totalSpace);

  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 xl:gap-10">
      <section>
        <Chart used={totalSpace.used} />

        {/* Uploaded file type summaries */}
        <ul className="mt-6 grid grid-cols-1 gap-4 xl:mt-10 xl:grid-cols-2 xl:gap-9">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="relative mt-6 rounded-xl bg-white dark:bg-foreground p-5 transition-all hover:scale-105"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.iconLight}
                    width={100}
                    height={100}
                    alt={`${summary.title} icon`}
                    className="absolute -left-3 -top-6.25 z-10 w-47.5 object-contain dark:hidden"
                  />

                  {/* Dark icon */}
                  <Image
                    src={summary.iconDark}
                    width={100}
                    height={100}
                    alt={`${summary.title} icon`}
                    className="absolute -left-3 -top-6.25 z-10 hidden w-47.5 object-contain dark:block"
                  />
                  <h4 className="h4 relative z-20 w-full text-right">
                    {convertFileSize(summary.size) || 0}
                  </h4>
                </div>

                <h5 className="h5 relative z-20 text-center">
                  {summary.title}
                </h5>
                <Separator className="bg-light-400 dark:bg-accent" />
                <p className="text-center body-1 text-light-200 dark:text-primary/60">
                  Last update
                </p>
                <FormattedDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      {/* Recent files uploaded */}
      <section className="h-full rounded-xl bg-background dark:bg-foreground p-5 xl:p-8">
        <h2 className="h3 xl:h2 text-light-100 dark:text-primary">
          Recent files uploaded
        </h2>
        {files.rows.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.rows.map((file: FileRow) => (
              <Link
                href={file.url}
                target="_blank"
                className="flex items-center gap-3"
                key={file.$id}
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />

                <div className="flex w-full flex-col xl:flex-row xl:justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="subtitle-2 line-clamp-1 w-full text-light-100 dark:text-primary/90 sm:max-w-50 lg:max-w-62.5">
                      {file.name}
                    </p>
                    <FormattedDateTime
                      date={file.$createdAt}
                      className="caption body-2 text-light-100/60"
                    />
                  </div>
                  <ActionDropdown file={file} />
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="body-1 mt-10 text-center text-light-200 dark:text-primary">
            No files uploaded
          </p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
