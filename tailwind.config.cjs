export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#FACC15',
        success: '#10B981',
        error: '#EF4444',
        background: {
          light: '#F9FAFB',
          dark: '#091223',
        },
        text: {
          light: '#1F2937',
          dark: '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
}
