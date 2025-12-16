"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { MenuIcon } from "lucide-react";
import { Separator } from "./ui/separator";
import { navItems } from "./constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import FileUploader from "./FileUploader";
import { signOut } from "@/lib/actions/user.actions";

const MobileNavigation = ({
  ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: MobileNavigationProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex h-15 justify-between px-5 sm:hidden items-center">
      <Image
        src="/assets/icons/logo-full-brand.svg"
        alt="logo"
        width={120}
        height={52}
        className="size-40"
      />
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" size="icon">
              <MenuIcon width={30} height={30} />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="pt-0 h-screen px-3"
            aria-describedby={undefined}
          >
            <SheetTitle>
              <div className="my-3 flex items-center gap-2 p-1 text-light-100 dark:text-primary justify-start lg">
                <Image
                  src={avatar}
                  alt="avatar"
                  width={44}
                  height={44}
                  className="aspect-square w-10 rounded-full object-cover"
                />
                <div>
                  <p className="subtitle-2 capitalize">{fullName}</p>
                  <p className="caption">{email}</p>
                </div>
              </div>
              <Separator className="mb-4 bg-light-200/30 dark:bg-secondary" />
            </SheetTitle>
            <nav className="h5 gap-1 text-brand">
              <ul className="flex flex-1 flex-col gap-4">
                {navItems.map(({ name, icon, url }) => (
                  <Link href={url} key={name}>
                    <li
                      className={cn(
                        "flex text-light-100 dark:text-primary gap-4 rounded-xl w-full justify-start items-center h5 px-6 h-13",
                        pathname === url && "bg-brand text-white shadow-drop-2"
                      )}
                    >
                      <Image
                        src={icon}
                        alt={name}
                        width={24}
                        height={24}
                        className={cn(
                          "w-6 filter invert dark:invert-0 opacity-25",
                          pathname === url && "invert-0 opacity-100"
                        )}
                      />
                      <p>{name}</p>
                    </li>
                  </Link>
                ))}
              </ul>
            </nav>
            <Separator className="mb-4 bg-light-200/30 dark:bg-secondary" />
            <div className="flex flex-1 gap-5 justify-end px-4">
              <FileUploader ownerId={ownerId} accountId={accountId} />
            </div>
            <SheetFooter>
              <form action={signOut} className="flex items-center justify-end">
                <Button
                  type="submit"
                  variant="outline"
                  className="hover:bg-red/5 dark:hover:bg-red/10"
                >
                  <Image
                    src="/assets/icons/logout.svg"
                    alt="logout"
                    width={24}
                    height={24}
                    className="w-6"
                  />
                  Logout
                </Button>
              </form>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default MobileNavigation;
