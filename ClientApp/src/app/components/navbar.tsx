"use client";
import React from "react";
import Link from "next/link";
import { ModeToggle } from "@/components/ui/theme-toggle";

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="mx-auto flex max-w-7xl my-4 items-center justify-between px-6 md:px-0">
        <div className="flex">
          <div className="hidden md:block">
            <Link className="text-xl font-bold hover:text-neutral-500" href="/">
              🏪 Yak Shop
            </Link>
            <Link className=" hover:text-neutral-500 ml-4" href="/order-form">
              Order Form
            </Link>
          </div>
          <div className="flex md:hidden">
            <Link className="text-xl font-bold hover:text-neutral-500" href="/">
              🏪 Yak Shop
            </Link>
            <Link
              className=" font-bold hover:text-neutral-500 ml-4"
              href="/order-form"
            >
              Order Form
            </Link>
          </div>
        </div>
        <div className="flex"></div>
        <ModeToggle />
      </nav>
    </header>
  );
};
export default Navbar;
