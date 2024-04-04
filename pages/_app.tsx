import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Link from "next/link";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (<SessionProvider session={session}>
    <NavigationMenu className="navbar max-w-lg m-auto !bg-[#]" style={{
      backgroundColor: '#faebeb12'
    }}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/dashboard/abc">Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Documentation
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
    <Component {...pageProps} />
  </SessionProvider>)
}