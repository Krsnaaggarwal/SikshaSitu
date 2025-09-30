// Lightweight shims for external packages used by the project but not present in this environment
declare module '@radix-ui/react-*' { const whatever: any; export = whatever; }
declare module '@radix-ui/react-accordion' { const x: any; export = x; }
declare module '@radix-ui/react-alert-dialog' { const x: any; export = x; }
declare module '@radix-ui/react-checkbox' { const x: any; export = x; }
declare module '@radix-ui/react-collapsible' { const x: any; export = x; }
declare module '@radix-ui/react-context-menu' { const x: any; export = x; }
declare module '@radix-ui/react-dialog' { const x: any; export = x; }
declare module '@radix-ui/react-dropdown-menu' { const x: any; export = x; }
declare module '@radix-ui/react-hover-card' { const x: any; export = x; }
declare module '@radix-ui/react-popover' { const x: any; export = x; }
declare module '@radix-ui/react-select' { const x: any; export = x; }
declare module '@radix-ui/react-separator' { const x: any; export = x; }
declare module '@radix-ui/react-slider' { const x: any; export = x; }
declare module '@radix-ui/react-switch' { const x: any; export = x; }
declare module '@radix-ui/react-toast' { const x: any; export = x; }
declare module '@radix-ui/react-toggle' { const x: any; export = x; }
declare module '@radix-ui/react-toggle-group' { const x: any; export = x; }
declare module '@radix-ui/react-tabs' { const x: any; export = x; }
declare module '@radix-ui/react-tooltip' { const x: any; export = x; }
declare module '@radix-ui/react-icons' { const x: any; export = x; }

declare module 'class-variance-authority' { export function cva(...args: any[]): any; export type VariantProps<T> = any; }
declare module 'clsx' { export const clsx: (...args: any[]) => string; export type ClassValue = any; }
declare module 'tailwind-merge' { export function twMerge(...args: any[]): string; }
declare module 'react-router-dom' { export const Link: any; export const createBrowserRouter: any; export const RouterProvider: any; export const Navigate: any; export const Outlet: any; export const useLocation: any; }
declare module '@react-hook/resize-observer' { const useResizeObserver: any; export default useResizeObserver; }

// Generic catch-all for packages not present in environment
declare module '*-react' { const anyExport: any; export default anyExport; }

export {};
