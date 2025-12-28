import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";

const Navbar04Page = () => {
  return (
    <div className="bg-white/50 dark:bg-black/50 fixed w-full top-0 left-0 z-50 backdrop-blur-sm">
      <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-(--breakpoint-xl) mx-auto rounded-full">
        <div className="h-full flex items-center justify-between mx-auto px-4">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
              <Link href="/login">
                  <Button
                      variant="outline"
                      className="sm:inline-flex rounded-full cursor-pointer"
                  >
                      ចូលគណនី
                  </Button>
              </Link>
              <Link href="/register">
                  <Button className="hidden sm:inline-flex rounded-full">
                        បង្កើតគណនី
                  </Button>
              </Link>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar04Page;
