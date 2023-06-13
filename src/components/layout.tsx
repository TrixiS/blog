import Link, { type LinkProps } from "next/link";
import { PropsWithChildren } from "react";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="flex flex-col border-b border-background-accent p-4">
      <div className="flex flex-row gap-x-4 tracking-tight">
        <Link href="/" className="mr-4 font-bold text-foreground-accent">
          TrixiS' Blog
        </Link>
        {children}
      </div>
    </header>
  );
};

const HeaderLink: React.FC<LinkProps & PropsWithChildren> = ({
  children,
  ...rest
}) => {
  return (
    <Link
      className="text-background-accent transition-colors hover:text-foreground"
      target="_blank"
      {...rest}
    >
      {children}
    </Link>
  );
};

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex h-screen flex-col bg-background text-foreground">
      <Header>
        <HeaderLink href="https://github.com/TrixiS">Github</HeaderLink>
        <HeaderLink href="https://t.me/trixis_std">Telegram</HeaderLink>
        <HeaderLink href="https://kwork.ru/user/trixis_">Kwork</HeaderLink>
      </Header>
      <div className="flex flex-col overflow-y-auto">
        <div className="mx-auto my-8 flex w-11/12 flex-col sm:w-10/12 md:my-12 lg:my-16">
          {children}
        </div>
      </div>
    </main>
  );
};
