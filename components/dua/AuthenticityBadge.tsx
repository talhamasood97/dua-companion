import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { getAuthenticityColor, getAuthenticityLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { AuthenticityGrade } from "@/types";

interface Props {
  grade: AuthenticityGrade;
  showLabel?: boolean;
  size?: "sm" | "lg";
}

export function AuthenticityBadge({ grade, showLabel = false, size = "sm" }: Props) {
  const colorClass = getAuthenticityColor(grade);
  const label = getAuthenticityLabel(grade);

  if (size === "lg") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm",
          colorClass
        )}
      >
        <ShieldCheck className="w-4 h-4" />
        <span>{label}</span>
      </div>
    );
  }

  return (
    <Badge
      variant={
        grade === "SAHIH"
          ? "sahih"
          : grade === "HASAN"
          ? "hasan"
          : grade === "QUDSI"
          ? "qudsi"
          : "daif"
      }
    >
      <ShieldCheck className="w-3 h-3" />
      {showLabel ? label : grade}
    </Badge>
  );
}
