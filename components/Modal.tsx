"use client";
import React, { FC, ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import Burger from "@/image/navigation/burger.svg";
import Close from "@/image/navigation/closemenu.svg";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface MenuLink {
  id: number;
  href: string;
  label: string;
}

interface ModalProps {
  menuLinks: MenuLink[];
  children?: ReactNode;
}

const Modal: FC<ModalProps> = ({ menuLinks, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <div className="md:hidden flex items-center" onClick={toggleMenu}>
        <Image src={Burger} alt="Menu" width={30} height={30} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-end"
            onClick={toggleMenu}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.div
              className="bg-white w-[80%] h-[96%] rounded-[48px] absolute right-4 p-6 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.8,
                  y: 0,
                  transformOrigin: "top right",
                },
                visible: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transformOrigin: "top right",
                  transition: {
                    type: "spring" as const,
                    stiffness: 300,
                    damping: 30,
                  },
                },
                exit: {
                  opacity: 0,
                  scale: 0.8,
                  y: 0,
                  transformOrigin: "top right",
                  transition: { duration: 0.2, type: "tween" as const },
                },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Image
                src={Close}
                alt="Close"
                width={20}
                onClick={toggleMenu}
                className="self-end cursor-pointer"
              />

              <nav className="flex flex-col gap-4 ml-[20px] mt-[20px] text-[28px] text-[#22253B]">
                {menuLinks.map((link) => (
                  <Link key={link.id} href={link.href} onClick={toggleMenu}>
                    {link.label}
                  </Link>
                ))}
              </nav>

              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Modal;
