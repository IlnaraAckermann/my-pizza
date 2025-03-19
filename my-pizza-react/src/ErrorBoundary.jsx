import { Link } from "@tanstack/react-router";
import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong.</h1>
          <p>
            There was an error with this page. <Link to="/">Click Here</Link> to
            back to home page.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
