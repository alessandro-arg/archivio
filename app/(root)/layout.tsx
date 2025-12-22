import React from "react";
import Sidebar from "@/components/Sidebar";
import MobileNavigation from "@/components/MobileNavigation";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return redirect("/sign-in");
  }

  return (
    <main className="flex h-screen dark:bg-foreground">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header userId={currentUser.$id} accountId={currentUser.accountId} />
        <div className="remove-scrollbar h-full flex-1 overflow-auto bg-light-400 dark:bg-background px-5 py-7 sm:mr-7 sm:rounded-[30px] sm:mb-7 md:px-9 md:py-10">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default Layout;
