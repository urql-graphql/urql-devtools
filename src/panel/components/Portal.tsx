import { useLayoutEffect, useRef, FC } from "react";
import { createPortal } from "react-dom";

export const Portal: FC = ({ children }) => {
  const root = useRef(document.createElement("div"));

  useLayoutEffect(() => {
    const portalElement =
      document.getElementById("portal") || createPortalRoot();

    portalElement.appendChild(root.current);
    return () => root.current.remove();
  }, []);

  return createPortal(children, root.current);
};

const createPortalRoot = () => {
  const portalElement = document.createElement("div");
  portalElement.id = "portal";

  document.querySelector("body")?.appendChild(portalElement);
  return portalElement;
};
