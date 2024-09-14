import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    main: "#5C1C96",
    lightPurple: "#6F21B5",
    darkPurple: "#481675",
    midGrey: "#E5E5E5",
    lightGrey: "#F5F5F5",
    grey: "#C4C4C4",
  },
  components: {
    CustomTag: {
      baseStyle: {
        borderRadius: "1rem",
        py: ".5rem",
        px: "1.5rem",
      },
      variants: {
        default: {
          bg: "lightGrey",
          color: "black",
          _hover: {
            bg: "midGrey",
            color: "black",
          },
        },
        selected: {
          bg: "main",
          color: "white",
          _hover: {
            bg: "darkPurple",
            color: "white",
          },
        },
      },
    },
  },
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Lato, sans-serif",
  },
});

export default theme;
