import React from "react";
import { ErrorBoundary } from "./ErrorBoundary";

const ErrorChild = () => {
  const err = Error("Something went wrong");

  if (!err.stack) {
    throw err;
  }

  err.stack = err.stack
    .replace(/localhost|host.docker.internal/g, "cosmos")
    .replace(/:\d+/g, ":1");
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
