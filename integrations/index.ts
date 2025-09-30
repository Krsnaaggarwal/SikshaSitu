// Lightweight compatibility layer exposing a few exports the app expects.
// This file proxies to existing runtime implementations when available
// or provides minimal stubs for static type-checking and build.

export * from '../integration';

// Provide small runtime-safe stubs for consumers that expect these utilities
export const useMember = () => ({
	member: null,
	isAuthenticated: false,
	isLoading: false,
	actions: {
		signIn: async () => {},
		signOut: async () => {},
		// Compat aliases used in some components
		login: async (...args: any[]) => {
			// delegate to signIn when available
			// @ts-ignore - runtime shim
			return (typeof (module as any) !== 'undefined' && (module as any).signIn) ? (module as any).signIn(...args) : Promise.resolve();
		},
		logout: async (...args: any[]) => {
			// delegate to signOut when available
			// @ts-ignore - runtime shim
			return (typeof (module as any) !== 'undefined' && (module as any).signOut) ? (module as any).signOut(...args) : Promise.resolve();
		},
	},
});

export const MemberProvider = ({ children }: any) => children;
