
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
		Asset(): "/images/camp1.JPG" | "/images/camp2.JPG" | "/images/camp3.JPG" | "/images/camp4.JPG" | "/images/camp5.JPG" | "/images/camp6.JPEG" | "/images/camp7.jpeg" | "/images/camp8.jpeg" | "/images/camplogo.JPG" | "/images/director.jpg" | "/robots.txt" | string & {};
	}
}