import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
  		},
  		fontSize: {
  			// Modern scale for better readability
  			"2xs": ["0.75rem", { lineHeight: "1.25rem" }],
  			xs: ["0.813rem", { lineHeight: "1.5rem" }],
  			sm: ["0.875rem", { lineHeight: "1.5rem" }],
  			base: ["1rem", { lineHeight: "1.75rem" }],
  			lg: ["1.125rem", { lineHeight: "1.75rem" }],
  			xl: ["1.25rem", { lineHeight: "2rem" }],
  			"2xl": ["1.5rem", { lineHeight: "2rem" }],
  			"3xl": ["1.875rem", { lineHeight: "2.25rem" }],
  			"4xl": ["2.25rem", { lineHeight: "2.75rem" }],
  			"5xl": ["3rem", { lineHeight: "3.5rem" }],
  			"6xl": ["3.75rem", { lineHeight: "4rem" }],
  			h1: ["2.5rem", { lineHeight: "1.2" }],
  			h2: ["2rem", { lineHeight: "1.3", letterSpacing: "0.5px" }],
  			h3: ["1.75rem", { lineHeight: "1.4" }],
  		},
  		fontWeight: {
  			light: "300",
  			normal: "400",
  			middle: "500",
  			bold: "700",
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			"accordion-down": {
  				from: { height: "0" },
  				to: { height: "var(--radix-accordion-content-height)" },
  			},
  			"accordion-up": {
  				from: { height: "var(--radix-accordion-content-height)" },
  				to: { height: "0" },
  			},
  		},
  		animation: {
  			"accordion-down": "accordion-down 0.2s ease-out",
  			"accordion-up": "accordion-up 0.2s ease-out",
  		},
  	}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate")
  ],
} satisfies Config;
