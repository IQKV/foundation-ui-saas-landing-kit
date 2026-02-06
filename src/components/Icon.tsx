import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";

interface IconProps {
  icon: IconSvgElement;
  size?: number;
  color?: string;
  className?: string;
}

export function Icon({
  icon,
  size = 24,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={size}
      color={color}
      className={className}
    />
  );
}
