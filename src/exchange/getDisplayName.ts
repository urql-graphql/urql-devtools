import * as React from "react";

const {
  ReactCurrentOwner: CurrentOwner
} = (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

// Is the Fiber a FunctionComponent, ClassComponent, or IndeterminateComponent
const isComponentFiber = (fiber: void | { tag: number }) =>
  fiber && (fiber.tag === 0 || fiber.tag === 1 || fiber.tag === 2);

// Is the component one of ours (just a heuristic to avoid circular dependencies or flags)
const isInternalComponent = (Component: { name: string }) =>
  Component.name === "Query" ||
  Component.name === "Mutation" ||
  Component.name === "Subscription";

export const getDisplayName = (): string => {
  let source = "Component";

  // Check whether the CurrentOwner is set
  const owner = CurrentOwner.current;
  if (owner !== null && isComponentFiber(owner)) {
    let Component = owner.type;

    // If this is one of our own components then check the parent
    if (isInternalComponent(Component) && isComponentFiber(owner._debugOwner)) {
      Component = owner._debugOwner.type;
    }

    // Get the Component's name if it has one
    if (typeof Component === "function") {
      source = Component.displayName || Component.name || source;
    }
  }

  return source;
};
