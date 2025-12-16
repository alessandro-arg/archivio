import { Button } from "./ui/button";
import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { signOut } from "@/lib/actions/user.actions";

const Header = ({
  userId,
  accountId,
}: {
  userId: string;
  accountId: string;
}) => {
  return (
    <header
      className="hidden sm:flex items-center justify-between
           gap-5 p-5 lg:py-7 xl:gap-10"
    >
      <Search />
      <div className="flex-center min-w-fit gap-4">
        <FileUploader ownerId={userId} accountId={accountId} />
        <ThemeToggle />
        <form action={signOut}>
          <Button type="submit" variant="outline" size="icon">
            <Image
              src="/assets/icons/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className="w-6"
            />
          </Button>
        </form>
      </div>
    </header>
  );
};

export default Header;
