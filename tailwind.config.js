/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            maxHeight: {
                144: "36rem",
                120: "30rem",
                90: "22.5rem",
                48: "12rem",
                44: "11rem",
                60: "15rem",
                40: "10rem",
                85: "21.25rem",
            },
            width: {
                120: "30rem",
            },
            height: {
                120: "30rem",
                144: "36rem",
            },
            fontSize: {
                "2xs": ["10px", "14px"],
                "3xs": ["8px", "12px"],
                "4xs": ["7px", "11px"],
            },
            backgroundColor: {
                primary: "#5465ff",
                txt: "#788bff",
                three: "#9bb1ff",
                four: "#bfd7ff",
                five: "#e2fdff",
                secondary: "#28BEC2",
            },
            colors: {
                primary: "#5465ff",
                txt: "#788bff",
                three: "#9bb1ff",
                four: "#bfd7ff",
                five: "#e2fdff",
                secondary: "#28BEC2",
            },
            screens: {
                "3xl": "1700px",
            },
        },
    },
    plugins: [],
};
