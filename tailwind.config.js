/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#FBFBFF",
          100: "#EFEFFF",
          200: "#DBDBFF",
          300: "#BFBFFF",
          400: "#9B9BFF",
          500: "#7070FF",
          600: "#3C3CFF",
          700: "#0000FF",
          // 800: "#1D3A6C",
          // 900: "#101F39",
        },
        secondary: {
          50: "#FFFBFC",
          100: "#FEF1F1",
          200: "#FDDFE0",
          300: "#FBC6C9",
          400: "#F8A6AA",
          500: "#F57F85",
          600: "#F25159",
          700: "#EE1B26",
          // 800: "#AB4D00",
          // 900: "#512400",
        },
        thirtiary: {
          50: "#FFFDFB",
          100: "#FEF7F1",
          200: "#FEEDDF",
          300: "#FCDFC7",
          400: "#FBCDA7",
          500: "#F9B781",
          600: "#F79D53",
          700: "#F47F1F",
          // 800: "#AB4D00",
          // 900: "#512400",
        },
        neutral: {
          50: "#FBFBFB",
          100: "#F0F0F0",
          200: "#DDDDDD",
          300: "#C2C2C2",
          400: "#A0A0A0",
          500: "#777777",
          600: "#464646",
          700: "#0D0D0D",
          // 800: "#656565",
          // 900: "#2C2C2C",
        },
        success: {
          50: "#FBFEFD",
          100: "#F1FCF7",
          200: "#DFF8EE",
          300: "#C6F3E0",
          400: "#A6EDCF",
          500: "#7EE5BA",
          600: "#50DBA1",
          700: "#28C382",
          // 800: "#176E4A",
          // 900: "#0C3B28",
        },
        warning: {
          50: "#FFFEFB",
          100: "#FFFCEF",
          200: "#FFF7DB",
          300: "#FFF1BF",
          400: "#FFE99B",
          500: "#FFE070",
          600: "#FFD53C",
          700: "#FFC800",
          // 800: "#9E520B",
          // 900: "#4B2705",
        },
        error: {
          50: "#FFFCFD",
          100: "#FEF3F5",
          200: "#FDE4E9",
          300: "#FBCFD8",
          400: "#F8B4C2",
          500: "#F693A7",
          600: "#F26C87",
          700: "#EE3F62",
          // 800: "#950D28",
          // 900: "#480614",
        },
        outline_border: {
          100: "#AEAEAE",
        },
        //
        main: "#0705EC",
        secondaryColor: "#EC4E28",
        thirtiaryColor: "#F4801D",
        quaternary: "#5C5C5C",
        softBlue: "#1C6AE4",
        greenColor: "#28C584",
        redColor: "#EE3D60",
        textPrimary: "#141511",
        textSecondary: "#8C8D89",
        paper: "#FFFFFF",
        outlineBorder: "#C3C3C3",
        backgroundSecondary: "#FAFAFA",
        dangerBase: "#EE3D60",
        dangerLight: "#FDE6EB",
        success: "#28C584",
        yellow: "#FFC800",
        //
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // primary: {
        //   DEFAULT: "hsl(var(--primary))",
        //   foreground: "hsl(var(--primary-foreground))",
        // },
        // secondary: {
        //   DEFAULT: "hsl(var(--secondary))",
        //   foreground: "hsl(var(--secondary-foreground))",
        // },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // borderRadius: {
      //   lg: "var(--radius)",
      //   md: "calc(var(--radius) - 2px)",
      //   sm: "calc(var(--radius) - 4px)",
      // },
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
    },
  },
  plugins: [require("tailwindcss-animate")],
};
