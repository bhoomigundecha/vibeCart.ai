
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom colors for hover states
				'yellow-hover': '45 100% 76%', /* #FFC400 - Darker Yellow Shade */
			},
			backgroundImage: {
				'gradient-speaking': 'var(--gradient-speaking)',
				'gradient-listening': 'var(--gradient-listening)',
				'gradient-inactive': 'var(--gradient-inactive)',
			},
			boxShadow: {
				'blob-active': 'var(--blob-shadow-active)',
				'blob-listening': 'var(--blob-shadow-listening)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'blob-pulse': {
					'0%, 100%': {
						transform: 'scale(1)',
					},
					'50%': {
						transform: 'scale(1.05)',
					}
				},
				'blob-speaking': {
					'0%, 100%': {
						transform: 'scale(1) rotate(0deg)',
					},
					'25%': {
						transform: 'scale(1.1) rotate(1deg)',
					},
					'50%': {
						transform: 'scale(1.05) rotate(0deg)',
					},
					'75%': {
						transform: 'scale(1.08) rotate(-1deg)',
					}
				},
				'blob-listening': {
					'0%, 100%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'50%': {
						transform: 'scale(1.02)',
						opacity: '0.9'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'blob-pulse': 'blob-pulse 2s ease-in-out infinite',
				'blob-speaking': 'blob-speaking 0.6s ease-in-out infinite',
				'blob-listening': 'blob-listening 1.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
