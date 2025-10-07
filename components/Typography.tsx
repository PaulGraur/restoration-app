import React, { FC, ElementType } from "react";

interface TypographyProps {
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "p";
  mb?: boolean;
  mt?: boolean;
  children: React.ReactNode;
  className?: string;
  color?: "midnight" | "ivory" | "azure" | "steel";
  align?: "left" | "center" | "right";
  fontWeight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
  onClick?: React.MouseEventHandler<HTMLElement>;
}

const sizeClasses: Record<string, string> = {
  h1: "text-[36px] lg:text-[46px] leading-[1.1]",
  h2: "text-[32px] lg:text-[40px] leading-[1.2]",
  h3: "text-[24px] lg:text-[32px] leading-[1.3]",
  h4: "text-[20px] lg:text-[28px] leading-[1.3]",
  h5: "text-[16px] lg:text-[18px] leading-[1.3]",
  p: "text-[16px] lg:text-[18px] leading-[1.6] font-normal",
};

const colorClasses: Record<string, string> = {
  midnight: "text-[#22253B]",
  ivory: "text-[#FFFFFF]",
  azure: "text-[#38BFF2]",
  steel: "text-[#8E8E8E]",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const marginClasses: Record<string, string> = {
  h1: "mb-[40px] md:mb-[60px] lg:mb-[100px]",
  h2: "mb-[32px] md:mb-[40px] lg:mb-[48px]",
  h3: "mb-[24px] md:mb-[32px] lg:mb-[40px]",
  h4: "mb-[16px] md:mb-[22px] lg:mb-[32px]",
  p: "mb-[16px] md:mb-[22px] lg:mb-[32px]",
};

const marginTopClasses: Record<string, string> = {
  h1: "mt-[40px] md:mt-[60px] lg:mt-[100px]",
  h2: "mt-[32px] md:mt-[40px] lg:mt-[48px]",
  h3: "mt-[24px] md:mt-[32px] lg:mt-[40px]",
  h4: "mt-[16px] md:mt-[22px] lg:mt-[32px]",
  p: "mt-[16px] md:mt-[22px] lg:mt-[32px]",
};

const weightClasses = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const Typography: FC<TypographyProps> = ({
  tag = "h2",
  mb = false,
  mt = false,
  children,
  className = "",
  color = "midnight",
  align = "left",
  fontWeight = "extrabold",
  onClick,
}) => {
  const Tag: ElementType = tag;

  const combinedClassName = [
    weightClasses[fontWeight],
    sizeClasses[tag],
    colorClasses[color],
    alignClasses[align],
    mb ? marginClasses[tag] : "",
    mt ? marginTopClasses[tag] : "",
    "break-words",
    className,
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    <Tag className={combinedClassName} onClick={onClick}>
      {children}
    </Tag>
  );
};

export default Typography;
