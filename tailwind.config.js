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
        navBarColour: "#cccccc",
        navTextColour: "#000000",
        navHoverColour: "#9b9b97",
        menuBackgroundColour: "#9b9b97",
        menuTextColour: "#210000",
        menuBackgroundHoverColour: "#82827d",
        menuTextHoverColour: "#f5f5f5",
        hamburgerButtonColour: "#0059b3",
        titleColour: "#cccc00",
        colour1: "#000000",
        colour2: "#ffffff",
        scrollTrackColour: "#b4b2b1",
        scrollThumbColour: "#1d6dc9",
        scrollThumbHoverColour: "#3d82dd",
        scrollButtonColour: "#6c9ee0",
        scrollButtonHoverColour: "#5198ea",
        scrollBorderColour: "#b7b6fc",
        progressColour: "#0e0cf3",
        tipBackgroundColour: "#808080",
        tipBorderColour: "#6c9ee0",
        tipTextColour: "whitesmoke",
        sectionBackColour: "#6c9ee0",
        panelBackColour: "#97b8e3",
        panelBorderColour: "#164684",
        panelScrollTrackColour: "#b7d3f7",
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
        highlightColour1: "#3399ff",
        highlightColour2: "#0059b3",
        postItColour: "#fffcaa",
        postItTextColour: "#00b300",
        sidebarTextColour: "#0000cc",
        sidebarBackgroundColour: "#e8e8e8",
        sidebarBorderColour: "#33cc33",
        eventCardBorder: "#ff1493", // hot pink
        eventCardBackground: "#98ff98", // light mint green
        signatureColour: "#ff0000",
        alertColour: "#ff1a1a",
        successColour: "#69cf9d",
        borderImage: "url('../images/border-dark.png')",
      },
      dark: {
        textColour: "#cccccc",
        backColour: "#262626",
        navBarColour: "#575752FF",
        navTextColour: "#d4bc2b",
        navHoverColour: "#82807d",
        menuBackgroundColour: "#82827d",
        menuTextColour: "#210000",
        menuBackgroundHoverColour: "#cccccc",
        menuTextHoverColour: "#f5f5f5",
        hamburgerButtonColour: "#82827d",
        titleColour: "#0e0cf3",
        colour1: "#ffffff",
        colour2: "#000000",
        scrollTrackColour: "#757270",
        scrollThumbColour: "#0a2647",
        scrollThumbHoverColour: "#153a6a",
        scrollButtonColour: "#1961b3",
        scrollButtonHoverColour: "#1c3c66",
        scrollBorderColour: "#0e0cf3",
        progressColour: "#cccc00",
        tipBackgroundColour: "#3399ff",
        tipBorderColour: "#000000",
        tipTextColour: "#000000",
        sectionBackColour: "#0d2d51",
        panelBackColour: "#205ea4",
        panelBorderColour: "#0e3c70",
        panelScrollTrackColour: "#184e8c",
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
        highlightColour1: "#b3d9ff",
        highlightColour2: "#3399ff",
        postItColour: "#fffcaa",
        postItTextColour: "#00b300",
        sidebarTextColour: "#000000",
        sidebarBackgroundColour: "#8f8b8a",
        sidebarBorderColour: "#0e0cf3",
        eventCardBorder: "#990052", // hot pink
        eventCardBackground: "#00b300", // light mint green
        signatureColour: "#b30000",
        alertColour: "#b30000",
        successColour: "#29a329",
        borderImage: "url('../images/border-light.png')",
      },
    },
    screens: {
      sm: {raw: "(min-width: 380px)"},
      md: {raw: "(min-width: 650px)"},
      lg: {raw: "(min-width: 976px)"},
      xl: {raw: "(min-width: 1440px)"},
    },
    utilities: {},
    extend: {
      fontFamily: {
        linkFont: ["Tektur", "sans-serif"],
        postItFont: ["Dancing Script", "cursive"],
      },
      boxShadow: {
        dropShadowLight:
          "-4px 4px 8px rgba(128, 128, 128, 0.7), -8px 8px 16px rgba(128, 128, 128, 0.5), -16px 16px 32px rgba(128, 128, 128, 0.3)",
        dropShadowDark:
          "-4px 4px 8px rgba(169, 169, 169, 0.2), -8px 8px 16px rgba(169, 169, 169, 0.2), -16px 16px 32px rgba(169, 169, 169, 0.3)",
      },
      textShadow: {
        parallaxShadow: "-4px 4px gray, -3px -3px 25px #4d4dff, -1px -1px 5px darkblue",
        parallaxShadowAlt: "-4px 4px gray, -3px -3px 25px yellow, -1px -1px 5px darkblue;",
      },
      animation: {
        menuBounce: "menuBounce 0.3s ease-in-out forwards", // used in nav bar
        parallaxFade: "parallaxFade 0.5s linear forwards", // for header images
        fadeIn: "fadeIn 0.85s linear forwards", // used for hamburger
        fadeOut: "fadeOut 0.85s linear forwards", // used for hamburger
        linkPop: "linkPop 250ms ease-out forwards", // used in header
        linkUnpop: "linkUnpop 250ms ease-out forwards", // used in header
        hamburgerCollapse: "hamburgerCollapse 0.15s ease-in-out forwards", // used for hamburger
        hamburgerCentre: "hamburgerCentre 0.15s ease-in-out forwards", // used for hamburger
        hamburgerDot: "hamburgerDot 0.15s ease-in-out forwards", // used for hamburger
        hamburgerRotateUpper: "hamburgerRotateUpper 0.15s ease-in-out forwards", // used for hamburger
        hamburgerRotateLower: "hamburgerRotateLower 0.15s ease-in-out forwards", // used for hamburger
        hamburgerExtendUpper: "hamburgerExtendUpper 0.15s ease-in-out forwards", // used for hamburger
        hamburgerExtendLower: "hamburgerExtendLower 0.15s ease-in-out forwards", // used for hamburger
        //cardEnter: "cardEnter 2s ease-in-out forwards", // for Employment
        //cardExit: "cardExit 2s ease-in-out forwards", // for Employment
        floatUp: "floatUp 3s ease-out forwards", // for Employment
      },
      keyframes: {
        menuBounce: {
          "0%": {transform: "scaleY(0)"},
          "80%": {transform: "scaleY(1.1)"},
          "100%": {transform: "scaleY(1.0)"},
        },
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
