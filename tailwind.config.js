/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      colors: {
        'astro-bg': '#FFFFFF',        // 纯白背景
        'astro-card': '#F9FAFB',      // 浅灰卡片
        'astro-purple': '#E91E63',    // 玫瑰粉（主色）
        'astro-teal': '#F06292',      // 亮粉色（辅助）
        'astro-pink': '#FCE4EC',      // 浅粉色（点缀）
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        }
      }
    }
  },
  plugins: [],
}
