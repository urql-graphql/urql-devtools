import React, { forwardRef, useCallback, useRef, useMemo } from "react";

export const Collapsible = forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements["div"] & { collapsed: boolean }
>(function Collapsible({ collapsed, ...props }, forwardedRef) {
  const ref = useRef<HTMLDivElement>();

  const handleRef = useCallback(
    (e) => {
      ref.current = e;

      if (typeof forwardedRef === "function") {
        return forwardedRef(e);
      }

      if (forwardedRef) {
        (forwardedRef as any).current = e;
      }
    },
    [ref]
  );

  const maxHeight = useMemo(() => {
    if (ref.current && !collapsed) {
      return ref.current.scrollHeight;
    }

    return 0;
  }, [collapsed]);

  return (
    <div
      {...props}
      aria-expanded={!collapsed}
      ref={handleRef}
      style={{ ...props.style, maxHeight, overflow: "hidden" }}
    />
  );
});
