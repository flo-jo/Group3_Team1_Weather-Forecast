import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in component tree:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#f8f9fa] text-[#191c1d]">
          <div className="bg-white border border-[#c1c7cf] rounded-2xl p-8 max-w-md w-full text-center shadow-lg">
            <div className="w-16 h-16 bg-[#fee2e2] text-[#dc2626] rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
            <h2 className="font-['Manrope'] text-2xl font-bold mb-2">Something went wrong</h2>
            <p className="font-['Hanken_Grotesk'] text-sm text-[#41474e] mb-6">
              The application encountered an unexpected error.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-[#004a70] text-white font-['Manrope'] font-bold rounded-xl hover:bg-[#00334e] transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
