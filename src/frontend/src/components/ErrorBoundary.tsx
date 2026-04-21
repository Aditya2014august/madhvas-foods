import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-6 text-center gap-6">
          <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle size={36} className="text-destructive" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-display">
              Something went wrong
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm">
              {this.state.error?.message ||
                "An unexpected error occurred. Please try again."}
            </p>
          </div>
          <Button
            onClick={this.handleReset}
            className="gradient-primary text-primary-foreground rounded-full px-6"
          >
            Try Again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
