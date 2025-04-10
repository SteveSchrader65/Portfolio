/** @type {import('tailwindcss').Config} */
const {fontFamily} = require("tailwindcss/defaultTheme")

module.exports = {
  content: ["./index.html", "./script/**/*.js"],
  darkMode: "class",
  theme: {
    colors: {
      light: {
        textColour: "#210000",
        backColour: "#f2f2f2",
        colour1: "#000000",
        colour2: "#ffffff",
        navBarColour: "#b6d8f9",
        navTextColour: "#000000",
        navHoverColour: "#9b9b97",
        menuBackgroundColour: "#92c5f8",
        menuTextColour: "#210000",
        menuBackgroundHoverColour: "#5cadfe",
        menuTextHoverColour: "#f5f5f5",
        hamburgerButtonColour: "#0059b3",
        titleColour: "#cccc00",
        scrollTrackColour: "#b6d8f9",
        scrollButtonColour: "#6c9ee0",
        scrollButtonHoverColour: "#3d82dd",
        progressColour: "#0e0cf3",
        tipBackgroundColour: "#808080",
        tipTextColour: "whitesmoke",
        sectionBackColour: "#6c9ee0",
        postItColour: "#fffcaa",
        postItHighlightColour: "#33cc33",
        panelBackColour: "#97b8e3",
        panelBorderColour: "#164684",
        contactFormBorderColour: "#737373",
        contactLabelColour: "#000000",
        contactBackgroundColour: "#cceeff",
        contactFieldPlaceholderColour: "rgba(0, 0, 0, 0, 0.4)",
        contactFieldTextColour: "#000000",
        contactFieldBackgroundColour: "rgba(179, 217, 255, 0.6)",
        contactFieldBorderFocusColour: "#0d0d0d",
        contactButtonColour: "#8ae600",
        contactButtonTextColour: "#000000",
        contactButtonHoverColour: "#99ff00",
        contactButtonActiveColour: "#ffff33",
        signatureColour: "#33cc33",
        alertColour: "#ff1a1a",
        successColour: "#69cf9d",
        borderImage: "url('../images/border-light.png')",
      },
      dark: {
        textColour: "#cccccc",
        backColour: "#262626",
        colour1: "#ffffff",
        colour2: "#000000",
        navBarColour: "#575752",
        navTextColour: "#d4bc2b",
        navHoverColour: "#82807d",
        menuBackgroundColour: "#82827d",
        menuTextColour: "#210000",
        menuBackgroundHoverColour: "#cccccc",
        menuTextHoverColour: "#f5f5f5",
        hamburgerButtonColour: "#82827d",
        titleColour: "#0e0cf3",
        scrollTrackColour: "#575752",
        scrollButtonColour: "#0a2647",
        scrollButtonHoverColour: "#153a6a",
        progressColour: "#cccc00",
        tipBackgroundColour: "#3399ff",
        tipTextColour: "#000000",
        sectionBackColour: "#0d2d51",
        postItColour: "#fffcaa",
        postItHighlightColour: "#29a329",
        panelBackColour: "#205ea4",
        panelBorderColour: "#0e3c70",
        contactFormBorderColour: "#0033cc",
        contactLabelColour: "#0d0d0d",
        contactBackgroundColour: "#4e4c4b",
        contactFieldPlaceholderColour: "rgba(38, 38, 38, 0.6)",
        contactFieldTextColour: "#262626",
        contactFieldBackgroundColour: "#827d7d",
        contactFieldBorderFocusColour: "#3399ff",
        contactButtonColour: "#006600",
        contactButtonTextColour: "#8c8c8c",
        contactButtonHoverColour: "#009900",
        contactButtonActiveColour: "#8ae600",
        signatureColour: "#29a329",
        alertColour: "#b30000",
        successColour: "#29a329",
        borderImage: "url('../images/border-dark.png')",
      },
    },
    screens: {
      xxs: {raw: "(max-width: 300px)"},
      xs: {raw: "(min-width: 301px)"},
      sm: {raw: "(min-width: 401px)"},
      md: {raw: "(min-width: 551px)"},
      tb: {raw: "(min-width: 751px)"},
      lg: {raw: "(min-width: 1001px)"},
      xl: {raw: "(min-width: 1301px)"},
      xxl: {raw: "(min-width: 1701px)"},
    },
    fontSize: {
      f1: ["0.4rem", {lineHeight: "0.6rem"}],
      f2: ["0.6rem", {lineHeight: "0.8rem"}],
      f3: ["0.8rem", {lineHeight: "1.0rem"}],
      f4: ["1.0rem", {lineHeight: "1.3rem"}],
      f5: ["1.3rem", {lineHeight: "1.6rem"}],
      f6: ["1.5rem", {lineHeight: "1.8rem"}],
      f7: ["1.7rem", {lineHeight: "2.1rem"}],
      f8: ["2.0rem", {lineHeight: "2.4rem"}],
      t1: ["4.7rem", {lineHeight: "5.0rem"}],
      t2: ["5.3rem", {lineHeight: "5.7rem"}],
      t3: ["6.1rem", {lineHeight: "6.5rem"}],
      t4: ["6.8rem", {lineHeight: "7.2rem"}],
    },
    extend: {
      fontFamily: {
        linkFont: ["Tektur", "sans-serif"],
        postItFont: ["Dancing Script", "cursive"],
      },
      textShadow: {
        parallaxShadow: "-4px 4px gray, -3px -3px 25px #4d4dff, -1px -1px 5px darkblue",
      },
      animation: {
        parallaxFade: "parallaxFade 0.75s ease-out forwards",
        fadeIn: "fadeIn 0.85s linear forwards",
        fadeOut: "fadeOut 0.85s linear forwards",
        linkPop: "linkPop 250ms ease-out forwards",
        linkUnpop: "linkUnpop 250ms ease-out forwards",
        menuBounce: "menuBounce 0.3s ease-in-out forwards",
        hamburgerDot: "hamburgerDot 0.15s ease-in-out forwards",
        hamburgerCentre: "hamburgerCentre 0.15s ease-in-out forwards",
        hamburgerCollapse: "hamburgerCollapse 0.15s ease-in-out forwards",
        hamburgerRotateUpper: "hamburgerRotateUpper 0.15s ease-in-out forwards",
        hamburgerRotateLower: "hamburgerRotateLower 0.15s ease-in-out forwards",
        hamburgerExtendUpper: "hamburgerExtendUpper 0.15s ease-in-out forwards",
        hamburgerExtendLower: "hamburgerExtendLower 0.15s ease-in-out forwards",
        hamburgerTop:
          "hamburgerCollapse 0.15s ease-in-out forwards, hamburgerCentre 0.15s ease-in-out 0.15s forwards, hamburgerDot 0.15s ease-in-out 0.3s forwards, hamburgerRotateUpper 0.15s ease-in-out 0.45s forwards, hamburgerExtendUpper 0.15s ease-in-out 0.6s forwards",
        hamburgerBottom:
          "hamburgerCollapse 0.15s ease-in-out forwards, hamburgerCentre 0.15s ease-in-out 0.15s forwards, hamburgerDot 0.15s ease-in-out 0.3s forwards, hamburgerRotateLower 0.15s ease-in-out 0.45s forwards, hamburgerExtendLower 0.15s ease-in-out 0.6s forwards",
        floatUp: "floatUp 3s ease-out forwards",
      },
      keyframes: {
        parallaxFade: {
          from: {scale: 0, opacity: 0},
          to: {scale: 1.0, opacity: 1.0},
        },
        fadeIn: {
          from: {opacity: 0},
          to: {opacity: 1},
        },
        fadeOut: {
          from: {opacity: 1},
          to: {opacity: 0},
        },

        linkPop: {
          "0%": {transform: "scaleX(1)"},
          "100%": {transform: "scaleX(1.15)"},
        },
        linkUnpop: {
          "0%": {transform: "scaleX(1.15)"},
          "100%": {transform: "scaleX(1)"},
        },
        menuBounce: {
          "0%": {transform: "scaleY(0)"},
          "80%": {transform: "scaleY(1.1)"},
          "100%": {transform: "scaleY(1.0)"},
        },
        hamburgerCollapse: {
          "0%": {transform: "translateY(var(--ty)) scaleX(1)"},
          "100%": {transform: "translateY(0) scaleX(1)"},
        },
        hamburgerCentre: {
          "0%": {transform: "translateY(0) scaleX(1)"},
          "100%": {transform: "translateY(0) scaleX(0.5)"},
        },
        hamburgerDot: {
          "0%": {transform: "translateY(0) scaleX(0.5)"},
          "100%": {transform: "translateY(0) scaleX(0.1)"},
        },
        hamburgerRotateUpper: {
          "0%": {transform: "translateY(0) scaleX(0.1) rotate(0deg)"},
          "100%": {transform: "translateY(0) scaleX(0.1) rotate(45deg)"},
        },
        hamburgerRotateLower: {
          "0%": {transform: "translateY(0) scaleX(0.1) rotate(0deg)"},
          "100%": {transform: "translateY(0) scaleX(0.1) rotate(-45deg)"},
        },
        hamburgerExtendUpper: {
          "0%": {transform: "translateY(0) scaleX(0.1) rotate(45deg)"},
          "100%": {transform: "translateY(0) scaleX(1) rotate(45deg)"},
        },
        hamburgerExtendLower: {
          "0%": {transform: "translateY(0) scaleX(0.1) rotate(-45deg)"},
          "100%": {transform: "translateY(0) scaleX(1) rotate(-45deg)"},
        },
        floatUp: {
          "0%": {opacity: 0, transform: "translateY(-60px)"},
          "10%": {opacity: 1},
          "80%": {opacity: 1},
          "100%": {opacity: 0, transform: "translateY(-240px)"},
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("tailwindcss-textshadow")],
}
