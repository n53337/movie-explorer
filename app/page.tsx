import ExplorerMoviesWrapper from "@/components/explorer/explorer-movies-wrapper";
import ExplorerSearchbar from "@/components/explorer/explorer-searchbar";
import BrandLogo from "@/components/shared/brand-logo";
import ThemeToggle from "@/components/shared/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative max-w-screen-lg mx-auto bg-background">
      <section className="sticky top-0 z-10  bg-background p-6 lg:p-8 w-full">
        <header className="flex items-center justify-between">
          <BrandLogo />
          <ThemeToggle />
        </header>

        <div className="mt-6 max-w-lg mx-auto">
          <ExplorerSearchbar />
        </div>
      </section>

      <section className="p-6 lg:p-8">
        <ExplorerMoviesWrapper />
      </section>
    </main>
  );
}
