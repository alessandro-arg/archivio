import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { getFileTypesParams, convertFileSize } from "@/lib/utils";
import { FileType, SearchParamProps } from "@/types";
import type { FileRow } from "@/types/appwrite";

const Page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });

  const totalSizeBytes = files.rows.reduce((sum: number, file: any) => {
    const size = Number(file.size ?? 0);
    return sum + (Number.isFinite(size) ? size : 0);
  }, 0);

  const totalSizeLabel = convertFileSize(totalSizeBytes, 2);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="flex mt-2 flex-col justify-between sm:flex-row sm:items-center">
          <p className="body-1 text-light-200 dark:text-primary/60">
            Total: <span className="h5 text-primary">{totalSizeLabel}</span>
          </p>
          <div className="mt-5 flex items-center sm:mt-0 sm:gap-3">
            <p className="body-1 hidden sm:block text-light-200 dark:text-primary/60">
              Sort by:
            </p>

            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.rows.map((file: FileRow) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="body-1 mt-10 text-center text-light-200 dark:text-primary/60">
          No files uploaded
        </p>
      )}
    </div>
  );
};

export default Page;
