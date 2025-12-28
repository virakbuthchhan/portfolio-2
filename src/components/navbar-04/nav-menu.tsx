import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {ComponentProps} from "react";

export const NavMenu = (props: ComponentProps<typeof NavigationMenu>) => (
    <NavigationMenu {...props}>
        <NavigationMenuList
            className="gap-3 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#">ទំព័រដើម</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#">រៀន</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#">ធ្វើ</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#">រុករក</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink asChild>
                    <Link href="#">អំពីយើង</Link>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
);
