import { PropsWithChildren } from "react";

const Header: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <header className="flex flex-col border-b border-background-accent p-4">
      <div className="flex flex-row gap-x-4 tracking-tight text-background-accent">
        <div className="mr-4 font-bold text-foreground-accent">
          TrixiS' Blog
        </div>
        {children}
      </div>
    </header>
  );
};

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-col overflow-y-auto bg-background text-foreground">
      <Header>
        <div>Github</div>
        <div>Telegram</div>
        <div>Kwork</div>
      </Header>
      <div className="mx-auto mt-4 flex w-11/12 flex-col sm:w-10/12">
        {children}
      </div>
    </main>
  );
};
