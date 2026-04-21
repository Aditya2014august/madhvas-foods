import { Flame } from "lucide-react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
}

export function LoadingSpinner({ size = "md", message }: LoadingSpinnerProps) {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className={`relative ${sizes[size]}`}>
        <div
          className={`${sizes[size]} rounded-full border-4 border-muted border-t-primary animate-spin`}
        />
        <Flame
          className="absolute inset-0 m-auto text-primary animate-pulse-soft"
          size={size === "sm" ? 12 : size === "md" ? 18 : 28}
        />
      </div>
      {message && (
        <p className="text-sm text-muted-foreground font-medium animate-pulse-soft">
          {message}
        </p>
      )}
    </div>
  );
}
