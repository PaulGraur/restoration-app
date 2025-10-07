import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import arrow from "@/image/navigation/arrow.svg";
import arrow2 from "@/image/navigation/arrow2.svg";

type ButtonColor = "skyblue" | "vermilion" | "amber";

interface BaseButtonProps {
  text: string;
  arrow?: "arrow" | "arrow2";
  color?: ButtonColor;
  className?: string;
}

interface ButtonAsButtonProps extends BaseButtonProps {
  onClick: () => void;
  href?: never;
}

interface ButtonAsLinkProps extends BaseButtonProps {
  href: string;
  onClick?: never;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const icons = {
  arrow,
  arrow2,
};

const colorClasses: Record<ButtonColor, string> = {
  skyblue: "bg-[#38BFF2]",
  vermilion: "bg-[#F15525]",
  amber: "bg-[#FFB359]",
};

const ButtonComponent: FC<ButtonProps> = ({
  text,
  arrow = "arrow",
  color = "skyblue",
  className = "",
  ...props
}) => {
  const content = (
    <>
      <span>{text}</span>
      <Image src={icons[arrow]} alt={arrow} width={16} height={16} />
    </>
  );

  const baseClasses = `flex items-center gap-2 px-4 py-2 w-max rounded-[32px] cursor-pointer ${colorClasses[color]} ${className}`;

  if ("href" in props) {
    return (
      <Link href={props.href!} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={props.onClick} className={baseClasses}>
      {content}
    </button>
  );
};

export default ButtonComponent;
