import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const ErrorChild = () => {
  const err = Error("Something went wrong");
  err.stack = err.stack?.replace(/localhost/g, "cosmos");
  throw err;
};

export default {
  "no error": (
    <div data-snapshot>
      <ErrorBoundary>
        <h1 style={{ color: "#fff" }}>No errors to see here!</h1>
      </ErrorBoundary>
    </div>
  ),
  error: (
    <ErrorBoundary data-snapshot>
      <ErrorChild />
    </ErrorBoundary>
  ),
};
