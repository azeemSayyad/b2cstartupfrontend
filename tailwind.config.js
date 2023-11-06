import withMT from "@material-tailwind/react/utils/withMT"
 
module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        maxi:"1500px",
        lg1:"1300px",
        sm1:"600px",
        mini:"384px"
      },
      fontFamily:{
        'mySans':["Open Sans","sans-serif"]
      }
    },
  },
  plugins: [],
});
