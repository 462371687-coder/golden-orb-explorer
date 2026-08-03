import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-black px-6 text-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.5em] text-white/40">
              SOMETHING WENT WRONG
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-8 border border-white/30 px-6 py-3 text-xs font-bold uppercase tracking-[0.4em] text-white transition-colors hover:bg-white hover:text-black"
            >
              RETRY
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}