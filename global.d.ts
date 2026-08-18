import React from "react";

declare global {
  namespace JSX {
    // Use React's JSX Element type
    type Element = React.JSX.Element;

    // Allow intrinsic elements (div, span, etc.) without requiring full definitions.
    // This relaxes strict JSX intrinsic element checks and resolves TS errors
    // when `@types/react` or the JSX runtime can't be resolved in the environment.
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export {};

// Minimal module declaration for the automatic JSX runtime.
declare module "react/jsx-runtime" {
  export function jsx(type: any, props?: any, key?: any): any;
  export function jsxs(type: any, props?: any, key?: any): any;
  export const Fragment: any;
}
