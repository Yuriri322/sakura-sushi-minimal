"use client";

import { Badge } from "@/components/ui/badge";

interface TagBadgeProps {
  name: string;
  icon?: string | null;
  color?: string | null;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function TagBadge({ name, icon, color, size = "default", className = "" }: TagBadgeProps) {
  const sizeClasses = {
    sm: "text-xs px-2.5 py-1",
    default: "text-sm px-3 py-1.5",
    lg: "text-base px-3.5 py-2",
  };

  return (
    <Badge
      variant="secondary"
      className={`${sizeClasses[size]} font-medium border-0 ${className}`}
      style={{
        backgroundColor: color ? `${color}20` : undefined,
        color: color || undefined,
      }}
    >
      {icon && <span className="mr-1.5">{icon}</span>}
      {name}
    </Badge>
  );
}
