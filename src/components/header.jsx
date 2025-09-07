import React from "react";
import Container from "./ui/Container";
import Logo from "@/components/ui/Logo";
import HeaderLink from "./ui/HeaderLink";
import SearchIcon from "./ui/SearchIcon";
import HeaderBag from "./ui/HeaderBag";
import FavouriteIcon from "./ui/FavouriteIcon";
import SignIn from "./ui/SignIn";
import MobileMenu from "./ui/MobileMenu";

const header = () => {
  return (
    <header className=" shadow-2xs  ">
      <Container className=" flex items-center  justify-between mt-4 ">
        <div className="logo flex w-auto items-center justify-center gap-4 ">
          <MobileMenu />
          <Logo />
        </div>

        <HeaderLink />

        <div className="icons flex w-auto  justify-end gap-8  ">
          <SearchIcon />
          <HeaderBag />
          <FavouriteIcon />
          <SignIn />
        </div>
      </Container>
    </header>
  );
};

export default header;
