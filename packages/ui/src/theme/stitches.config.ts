import { createStitches, type CSS as StitchesCSS } from "@stitches/react";
import * as colors from "./colors";
import { breakpointMinWidths, themeBreakpoints } from "./breakpoints";
import type { TextTokens } from "./text";
import { textSizes } from "./text";

export const {
  css,
  styled,
  globalCss,
  config,
  createTheme,
  getCssText,
  theme,
} = createStitches({
  theme: {
    colors: {
      // Box
      boxNeutral: "white",
      boxNeutralInverse: colors.primary[8],
      boxSubdued: colors.gray[0],
      boxPositive: colors.positive[0],
      boxWarning: colors.warning[0],
      boxCritical: colors.critical[0],
      boxInfo: colors.info[0],
      boxAttract: colors.primary[0],
      boxDisabled: colors.gray[1],

      actionNeutral: "slateblue",

      // Text
      textNeutral: colors.text[7],
      textNeutralInverse: "white",
      textSubdued: colors.text[5],
      textPositive: colors.positive[3],
      textWarning: colors.warning[3],
      textCritical: colors.critical[3],
      textInfo: colors.info[3],
      textAttract: colors.primary[7],
      textDisabled: colors.text[4],

      // Heading
      headingNeutral: colors.text[8],
      headingNeutralInverse: 'white',
      headingSubdued: colors.text[6],
      headingPositive: colors.positive[4],
      headingAttract: colors.primary[7],
      headingWarning: colors.warning[4],
      headingCritical: colors.critical[4],
      headingDisabled: colors.text[3],

    },
    space: {
      gutter: "16px",
      "00": "0px",
      "01": "4px",
      "02": "8px",
      "03": "12px",
      "04": "16px",
      "05": "20px",
      "06": "24px",
      "07": "32px",
      "08": "40px",
      "09": "48px",
      "10": "64px",
      "11": "80px",
      "12": "96px",
      "13": "128px",
      "14": "160px",
      "15": "192px",
      "16": "224px",
      "17": "256px",
    },
    fontSizes: {
      baseRem: 16,
      maxBp: breakpointMinWidths[breakpointMinWidths.length - 1],
      ...textSizes,
    },
    fontWeights: {
      light: "300",
      regular: "400",
      medium: "500",
      bold: "600",
      heavy: "700",
      textDefault: "400",
      headingDefault: "700",
    },
    lineHeights: {
      title: "1.25",
      body: "1.5",
    },
    fonts: {
      title: "'Texturina', serif",
      body: "'Karla', sans-serif",
    },
    radii: {
      sharp: "0px",
      round: "8px",
      rounder: "16px",
      roundest: "24px",
      full: "9999px",
    },
    shadows: {
      none: "none",
      low: "0 1px 3px 0px rgba(0, 31, 41, 0.1)",
      medium: "0 4px 8px -2px rgba(0, 31, 41, 0.1)",
      high: "0 12px 16px -4px rgba(0, 31, 41, 0.1)",
      highest: "0 20px 24px -4px rgba(0, 31, 41, 0.1)",
    },
  },
  media: {
    ...themeBreakpoints,
  },
  utils: {
    fz: (size: TextTokens): StitchesCSS => {
      /**
       * clamp() performs a calc() on each of its arguments,
       * so there is no need to add a calc() to each of these values.
       * Normally this is not valid css without a calc() wrapper.
       */
      const min = `$${size}Min / $baseRem * 1rem`;
      const max = `$${size}Max / $baseRem * 1rem`;
      const mid = `$${size}Max / $maxBp * 100vw`;

      /**
       * The first fontSize is a fallback for browsers that don't support clamp().
       * We are simply falling back to the min value for each text size.
       *
       * The `@supports` query is simply checking that calculations within clamp
       * are also supported. It might be overkill, but that is tough to test.
       */
      return {
        fontSize: `calc(${min})`,
        "@supports (font-size: clamp(12 / 16 * 1rem, 18 / 1024 * 100vw, 2rem))":
          {
            fontSize: `clamp(${min}, ${mid}, ${max})`,
          },
      };
    },
  },
});

export type CSS = StitchesCSS<typeof config>;
export type ThemeRadii = keyof typeof config.theme.radii;
export type ThemeSpace = keyof typeof config.theme.space;
export type ThemeShadows = keyof typeof config.theme.shadows;
export type ThemeFontSizes = keyof typeof config.theme.fontSizes;

/*
 * `textDefault` and `headingDefault` are base settings that we
 * don't want to be possible props that can be passed to the
 * `Text` and `Heading` components.
 */
export type ThemeFontWeights = keyof Omit<
  typeof config.theme.fontWeights,
  "textDefault" | "headingDefault"
>;

export type ThemeBreakPoints = keyof typeof config.media;

export type ThemeVibes =
  | "neutral"
  | "neutralInverse"
  | "subdued"
  | "positive"
  | "warning"
  | "critical"
  | "info"
  | "attract"
  | "disabled";

// This is a common global style that would be used in apps, but you can
// also make your own global styles for different purposes, fonts, etc.
export const globalStyles = globalCss({
  "*": {
    fontSize: "100%",
  },

  "html, body": {
    margin: 0,
    backgroundColor: "$boxSubdued",
    height: "100%",
  },

  // required to push footer to bottom in inner layout from Next.js
  "#__next": {
    height: "100%",
  },
});
