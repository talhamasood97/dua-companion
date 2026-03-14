import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sahih" | "hasan" | "qudsi" | "daif" | "outline";
  size?: "sm" | "md";
  className?: string;
}

const variantStyles = {
  default:
    "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300",
  sahih:
    "bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800",
  hasan:
    "bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800",
  qudsi:
    "bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800",
  daif:
    "bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800",
  outline:
    "border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400",
};

const sizeStyles = {
  sm: "text-xs px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium rounded-full",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}
