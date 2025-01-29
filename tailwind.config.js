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
        scrollBorderColour: "#b7b6fc",
        progressColour: "#0e0cf3",
        tipBackgroundColour: "#808080",
        tipBorderColour: "#6c9ee0",
        tipTextColour: "whitesmoke",
        sectionBackColour: "#6c9ee0",
        postItColour: "#fffcaa",
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
        scrollBorderColour: "#0e0cf3",
        progressColour: "#cccc00",
        tipBackgroundColour: "#3399ff",
        tipBorderColour: "#000000",
        tipTextColour: "#000000",
        sectionBackColour: "#0d2d51",
        postItColour: "#fffcaa",
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
      xs: {raw: "(max-width: 350px)"},
      sm: {raw: "(min-width: 350px)"},
      md: {raw: "(min-width: 650px)"},
      lg: {raw: "(min-width: 950px)"},
      xl: {raw: "(min-width: 1400px)"},
    },
    extend: {
      fontFamily: {
        linkFont: ["Tektur", "sans-serif"],
        postItFont: ["Dancing Script", "cursive"],
      },
      textShadow: {
        parallaxShadow: "-4px 4px gray, -3px -3px 25px #4d4dff, -1px -1px 5px darkblue",
        parallaxShadowAlt: "-4px 4px gray, -3px -3px 25px yellow, -1px -1px 5px darkblue;",
      },
      animation: {
        parallaxFade: "parallaxFade 1.2s linear forwards", // for header images
        fadeIn: "fadeIn 0.85s linear forwards", // used for hamburger
        fadeOut: "fadeOut 0.85s linear forwards", // used for hamburger
        linkPop: "linkPop 250ms ease-out forwards", // used in header
        linkUnpop: "linkUnpop 250ms ease-out forwards", // used in header
        menuBounce: "menuBounce 0.3s ease-in-out forwards", // used in nav bar
        hamburgerDot: "hamburgerDot 0.15s ease-in-out forwards", // used for hamburger top/bottom
        hamburgerCentre: "hamburgerCentre 0.15s ease-in-out forwards", // used for hamburger top/bottom
        hamburgerCollapse: "hamburgerCollapse 0.15s ease-in-out forwards", // used for hamburger top/bottom
        hamburgerRotateUpper: "hamburgerRotateUpper 0.15s ease-in-out forwards", // used for hamburger top/bottom
        hamburgerRotateLower: "hamburgerRotateLower 0.15s ease-in-out forwards", // used for hamburger top/bottom
        hamburgerExtendUpper: "hamburgerExtendUpper 0.15s ease-in-out forwards", // used for hamburger top/bottom
        hamburgerExtendLower: "hamburgerExtendLower 0.15s ease-in-out forwards", // used for hamburger top/bottom
        hamburgerTop:
          "hamburgerCollapse 0.15s ease-in-out forwards, hamburgerCentre 0.15s ease-in-out 0.15s forwards, hamburgerDot 0.15s ease-in-out 0.3s forwards, hamburgerRotateUpper 0.15s ease-in-out 0.45s forwards, hamburgerExtendUpper 0.15s ease-in-out 0.6s forwards",
        hamburgerBottom:
          "hamburgerCollapse 0.15s ease-in-out forwards, hamburgerCentre 0.15s ease-in-out 0.15s forwards, hamburgerDot 0.15s ease-in-out 0.3s forwards, hamburgerRotateLower 0.15s ease-in-out 0.45s forwards, hamburgerExtendLower 0.15s ease-in-out 0.6s forwards",
        //cardEnter: "cardEnter 2s ease-in-out forwards", // for Employment
        //cardExit: "cardExit 2s ease-in-out forwards", // for Employment
        floatUp: "floatUp 3s ease-out forwards", // for Employment
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
        // cardEnter: {
        //   "0%": {opacity: "0", transform: "translate(-150%, -4rem)", visibility: "visible"},
        //   "100%": {opacity: "1", transform: "translate(-50%, -4rem)", visibility: "visible"},
        // },
        // cardExit: {
        //   "0%": {opacity: "1", transform: "translate(-50%, -4rem)", visibility: "visible"},
        //   "100%": {opacity: "0", transform: "translate(150%, -4rem)", visibility: "hidden"},
        // },
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
