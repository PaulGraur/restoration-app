import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/image/logo.svg";

import Modal from "@/components/Modal";
import Button from "@/components/ButtonComponent";

const HeaderComponent = () => {
  const menuLinks = [
    { id: 1, href: "/algorithms", label: "Algorithms" },
    { id: 2, href: "/simulator", label: "Simulator" },
    { id: 3, href: "https://www.codewars.com/", label: "Codewars" },
  ];

  return (
    <header>
      <div className="container flex justify-between items-center bg-white rounded-[75px] py-[10px] my-[20px] px-4">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={140} />
        </Link>

        <nav className="hidden md:flex text-black font-bold gap-[40px]">
          {menuLinks.map((link) => {
            const isExternal =
              link.href.startsWith("http://") ||
              link.href.startsWith("https://");

            const props = isExternal
              ? {
                  href: link.href,
                  target: "_blank",
                  rel: "noopener noreferrer",
                }
              : { href: link.href };

            const Tag = isExternal ? "a" : Link;

            return (
              <Tag key={link.id} {...props}>
                {link.label}
              </Tag>
            );
          })}
        </nav>

        <Button href="/" text="Увійти" />

        <Modal menuLinks={menuLinks} />
      </div>
    </header>
  );
};

export default HeaderComponent;
