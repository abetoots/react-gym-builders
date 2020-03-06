import Typography from "typography";
import USWebDesignStandardsTheme from "typography-theme-us-web-design-standards";

USWebDesignStandardsTheme.googleFonts = [
  {
    name: "Roboto",
    styles: ["300, 400, 500, 700"]
  },
  {
    name: "Open Sans",
    styles: ["400", "400i", "700"]
  }
];
//lets override the font families, dont forget to add their typefaces in gatsby-browser
USWebDesignStandardsTheme.headerFontFamily = [
  "Roboto",
  "Helvetica",
  "sans-serif"
];
USWebDesignStandardsTheme.bodyFontFamily = [
  "Open Sans",
  "Helvetica",
  "sans-serif"
];

const typography = new Typography(USWebDesignStandardsTheme);

typography.injectStyles();

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
