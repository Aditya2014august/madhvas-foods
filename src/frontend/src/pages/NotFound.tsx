import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center gap-6">
      <div className="space-y-2">
        <div className="text-8xl font-bold font-display text-primary">404</div>
        <h1 className="text-2xl font-bold font-display text-foreground">
          Page not found
        </h1>
        <p className="text-muted-foreground max-w-sm">
          Looks like this page wandered off. Let's get you back to the menu!
        </p>
      </div>
      <Link to="/">
        <Button className="gradient-primary text-primary-foreground rounded-full px-6 gap-2 font-semibold">
          <Home size={16} />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
