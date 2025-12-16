"use client";

import Image from "next/image";
import Link from "next/link";
import { navItems } from "./constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Sidebar = ({ fullName, avatar, email }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className="hidden sm:flex h-screen w-22.5
           lg:w-70 xl:w-81.25
           flex-col overflow-auto px-5 py-7"
    >
      <Link href="/">
        <Image
          src="/assets/icons/logo-full-brand-light.svg"
          alt="logo"
          width={160}
          height={50}
          loading="eager"
          className="hidden h-auto lg:block dark:lg:hidden w-auto"
        />
        <Image
          src="/assets/icons/logo-full-brand-dark.svg"
          alt="logo"
          width={160}
          height={50}
          loading="eager"
          className="hidden h-auto dark:lg:block w-auto"
        />
        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={52}
          height={52}
          loading="eager"
          className="lg:hidden h-auto w-auto"
        />
      </Link>

      <nav className="h5 mt-9 flex-1 gap-1 text-brand">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ name, icon, url }) => (
            <Link href={url} key={name} className="lg:w-full">
              <li
                className={cn(
                  "flex text-light-100 dark:text-primary gap-4 rounded-xl lg:w-full justify-center lg:justify-start items-center h5 lg:px-7.5 h-13",
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
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src="/assets/images/files-2.svg"
        alt="files-image"
        width={506}
        height={418}
        className="w-full"
      />

      <div className="mt-4 flex items-center justify-center gap-2 rounded-3xl bg-brand/10 p-1 text-light-100 dark:test-primary lg:justify-start lg:p-3">
        <Image
          src={avatar}
          alt="avatar"
          width={44}
          height={44}
          className="aspect-square w-10 rounded-full object-cover"
        />
        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize dark:text-primary">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
