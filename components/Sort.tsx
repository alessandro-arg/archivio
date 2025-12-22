"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortTypes } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const Sort = () => {
  const path = usePathname();
  const router = useRouter();

  const handleSort = (value: string) => {
    router.push(`${path}?sort=${value}`);
  };

  return (
    <Select onValueChange={handleSort} defaultValue={sortTypes[1].value}>
      <SelectTrigger className="shad-no-focus! h-11 w-full rounded-md border-transparent bg-background dark:bg-foreground shadow-sm! sm:w-52.5">
        <SelectValue placeholder={sortTypes[1].value} />
      </SelectTrigger>
      <SelectContent className="shadow-drop-3! dark:shadow-none!">
        {sortTypes.map((sort) => (
          <SelectItem
            key={sort.label}
            className="cursor-pointer"
            value={sort.value}
          >
            {sort.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
