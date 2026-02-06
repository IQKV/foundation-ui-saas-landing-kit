import { Icon } from "@/components/Icon";
import type { IconSvgElement } from "@hugeicons/react";

interface IconBoxProps {
  icon: IconSvgElement;
  size?: number;
}

export function IconBox({ icon, size = 24 }: IconBoxProps) {
  return (
    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon icon={icon} size={size} className="text-primary" />
    </div>
  );
}
