/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        notStarted: '#e3e2e0',
        inProgress: '#d3e5ef',
        done: '#dbeddb',
        notStartedText: '#32302c',
        inProgressText: '#294155',
        doneText: '#2b4737',
      }
    },
  },
  plugins: [
  ],
}

