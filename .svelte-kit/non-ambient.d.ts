
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/gallery" | "/jobs" | "/register" | "/reviews" | "/staff";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/gallery": Record<string, never>;
			"/jobs": Record<string, never>;
			"/register": Record<string, never>;
			"/reviews": Record<string, never>;
			"/staff": Record<string, never>
		};
		Pathname(): "/" | "/gallery" | "/gallery/" | "/jobs" | "/jobs/" | "/register" | "/register/" | "/reviews" | "/reviews/" | "/staff" | "/staff/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/images/camp1.jpg" | "/images/camp2.jpg" | "/images/camp3.jpg" | "/images/camp4.jpg" | "/images/camp5.jpg" | "/images/camp6.jpg" | "/images/camp7.jpg" | "/images/camp8.jpg" | "/images/camplogo.JPG" | "/images/director.jpg" | "/robots.txt" | string & {};
	}
}