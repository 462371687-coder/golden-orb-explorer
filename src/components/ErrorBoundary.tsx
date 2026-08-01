import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Section render failed:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="flex min-h-[40vh] w-full items-center justify-center bg-black px-6 py-24 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/50">
              内容加载失败，请刷新页面
            </p>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
