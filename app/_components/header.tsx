"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import {
  HeartIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from "lucide-react";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import MenuItem from "./menu-item";

const Header = () => {
  const { data } = useSession();
  const username = data?.user?.name;

  const initialLetterName = username?.split(" ")[0].charAt(0);
  const initialLetterLastName = username?.split(" ")[1].charAt(0);
  const fallback = `${initialLetterName}${initialLetterLastName}`;

  const handleSignOut = async () => {
    await signOut();
  };

  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <div className="flex justify-between px-5 pt-4">
      <div className="relative h-[30px] w-[100px]">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Ifood APP"
            fill
            className="object-cover"
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <div className="flex justify-between pt-6">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={data.user.image as string} />
                  <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>

                <div>
                  <h3 className="font-semibold">{username}</h3>
                  <span className="block text-xs text-muted-foreground">
                    {data.user.email}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-8">
              <h2 className="font-semibold">Olá, faça o seu login</h2>
              <Button size="icon" onClick={handleSignIn}>
                <LogInIcon />
              </Button>
            </div>
          )}

          <div className="py-6">
            <Separator />
          </div>

          <div className="space-y-2">
            <MenuItem icon={<HomeIcon size={16} />} title="Início" />

            <MenuItem
              icon={<ScrollTextIcon size={16} />}
              title="Meus pedidos"
              isPrivate
              isAuthenticated={!!data?.user}
            />

            <MenuItem
              icon={<HeartIcon size={16} />}
              title="Restaurantes favoritos"
              isPrivate
              isAuthenticated={!!data?.user}
            />
          </div>

          <div className="py-6">
            <Separator />
          </div>

          <MenuItem
            icon={<LogOutIcon size={16} />}
            title="Sair da conta"
            isPrivate
            isAuthenticated={!!data?.user}
            onClick={handleSignOut}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
