"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 shadow-sm backdrop-blur dark:bg-black/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              {/* Placeholder image: put a file at public/logo.png or replace with text */}
              <div className="relative h-8 w-8 rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Photos"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-semibold">Photos</span>
            </Link>
          </div>

          {/* Center: optional nav (hidden on mobile) */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link href="/" className="text-sm hover:underline">
              Explore
            </Link>
            <Link href="/favorites" className="text-sm hover:underline">
              Favorites
            </Link>
            <Link href="/about" className="text-sm hover:underline">
              About
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop auth / avatar */}
            <div className="hidden md:flex items-center gap-3">
              {status === "authenticated" && session?.user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-9 w-9 p-0">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={session.user.image ?? ""}
                          alt={session.user.name ?? "User"}
                        />
                        <AvatarFallback>
                          {session.user.name?.charAt(0) ?? "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="p-2">
                      <div className="text-sm font-medium">
                        {session.user.name}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {session.user.email}
                      </div>
                    </div>
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="mt-1"
                    >
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="default"
                  onClick={() => signIn("google")}
                  className="rounded-full flex items-center gap-2"
                >
                  <FaGoogle />
                  <span className="hidden sm:inline">Sign in with Google</span>
                </Button>
              )}
            </div>

            {/* Mobile: hamburger -> sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 p-0">
                    <FiMenu size={18} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[80vw] sm:w-[420px]">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center gap-2">
                      <div className="relative h-8 w-8 rounded-md overflow-hidden bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
                        <Image
                          src="/logo.png"
                          alt="Photos"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-lg font-semibold">Photos</span>
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" className="h-9 w-9 p-0">
                        <FiX size={18} />
                      </Button>
                    </SheetTrigger>
                  </div>

                  <div className="flex flex-col space-y-4">
                    <Link href="/" className="text-base" onClick={() => {}}>
                      Explore
                    </Link>
                    <Link
                      href="/favorites"
                      className="text-base"
                      onClick={() => {}}
                    >
                      Favorites
                    </Link>
                    <Link
                      href="/about"
                      className="text-base"
                      onClick={() => {}}
                    >
                      About
                    </Link>
                  </div>

                  <div className="mt-6">
                    {status === "authenticated" && session?.user ? (
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage
                            src={session.user.image ?? ""}
                            alt={session.user.name ?? "User"}
                          />
                          <AvatarFallback>
                            {session.user.name?.charAt(0) ?? "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">
                            {session.user.name}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {session.user.email}
                          </div>
                        </div>
                        <Button
                          variant="secondary"
                          onClick={() => signOut()}
                          className="ml-auto"
                        >
                          Sign out
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="default"
                        onClick={() => signIn("google")}
                        className="w-full rounded-full flex items-center justify-center gap-2"
                      >
                        <FaGoogle />
                        Sign in with Google
                      </Button>
                    )}
                  </div>

                  <div className="mt-8 text-sm text-muted-foreground">
                    <p>Discover images from Unsplash, Pexels, and Pixabay.</p>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
