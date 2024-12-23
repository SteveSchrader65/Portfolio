/* jshint esversion: 8 */
"use strict"

let viewingMode = ""

function setViewingMode() {
  const root = document.querySelector(":root")
  const lightButtons = document.querySelectorAll(".lightMode")
  const darkButtons = document.querySelectorAll(".darkMode")

  lightButtons.forEach((button) => {
    button.addEventListener("click", _setLightMode)
  })

  darkButtons.forEach((button) => {
    button.addEventListener("click", _setDarkMode)
  })

  viewingMode = localStorage.getItem("viewingMode")

  if (viewingMode == "darkness" || window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
    _setDarkMode()
  } else {
    _setLightMode()
  }

  function _setLightMode() {
    viewingMode = "lightness"
    localStorage.setItem("viewingMode", viewingMode)

    lightButtons.forEach((light) => {
      light.style.visibility = "hidden"
    })

    darkButtons.forEach((dark) => {
      dark.style.visibility = "visible"
    })

    root.style.setProperty("--textColour", "#210000")
    root.style.setProperty("--backColour", "#f2f2f2")
    root.style.setProperty("--navBarColour", "#cccccc")
    root.style.setProperty("--navTextColour", "black")
    root.style.setProperty("--navHoverColour", "#9b9b97")
    root.style.setProperty("--menuBackgroundColour", "#9b9b97")
    root.style.setProperty("--menuTextColour", "#e6e6e6")
    root.style.setProperty("--menuBackgroundHoverColour", "#82827d")
    root.style.setProperty("--menuTextHoverColour", "#f5f5f5")
    root.style.setProperty("--hamburgerButtonColour", "#0059b3")
    root.style.setProperty("--titleColour", "#cccc00")
    root.style.setProperty("--colour1", "#000000")
    root.style.setProperty("--colour2", "#ffffff")
    root.style.setProperty("--scrollTrackColour", "#b4b2b1")
    root.style.setProperty("--scrollThumbColour1", "#1d6dc9")
    root.style.setProperty("--scrollThumbColour2", "#6c9ee0")
    root.style.setProperty("--scrollButtonColour1", "#6c9ee0")
    root.style.setProperty("--scrollButtonColour2", "#8fbcef")
    root.style.setProperty("--scrollBorderColour", "#b7b6fc")
    root.style.setProperty("--progressColour", "#cccc00")
    root.style.setProperty("--tipBackgroundColour", "#808080")
    root.style.setProperty("--tipBorderColour", "#6c9ee0")
    root.style.setProperty("--tipTextColour", "whitesmoke")

    root.style.setProperty("--sectionBackColour", "#6c9ee0")

    root.style.setProperty("--panelBackColour", "#97b8e3")
    root.style.setProperty("--panelBorderColour", "#164684")

    root.style.setProperty("--contactFormBorderColour", "#737373")
    root.style.setProperty("--contactLabelColour", "#000000")
    root.style.setProperty("--contactBackgroundColour", "#cceeff")
    root.style.setProperty("--contactFieldPlaceholderColour", "rgba(0, 0, 0, 0, 0.4)")
    root.style.setProperty("--contactFieldTextColour", "#000000")
    root.style.setProperty("--contactFieldBackgroundColour", "rgba(179, 217, 255, 0.6)")
    root.style.setProperty("--contactFieldBorderFocusColour", "#0d0d0d")
    root.style.setProperty("--contactButtonColour", "#8ae600")
    root.style.setProperty("--contactButtonTextColour", "#000000")
    root.style.setProperty("--contactButtonHoverColour", "#99ff00")
    root.style.setProperty("--contactButtonActiveColour", "#ffff33")

    /* ---------- Colours below this line not currently in use ---------- */
    root.style.setProperty("--highlightColour1", "#3399ff")
    root.style.setProperty("--highlightColour2", "#0059b3")
    root.style.setProperty("--postItColour", "#fffcaa")
    root.style.setProperty("--sidebarTextColour", "#0000cc")
    root.style.setProperty("--sidebarBackgroundColour", "#e8e8e8")
    root.style.setProperty("--sidebarBorderColour", "#33cc33")
    root.style.setProperty("--alertColour", "#ff1a1a")
    root.style.setProperty("--successColour", "#69cf9d")

    root.style.setProperty("--borderImage", "url('../images/border-light.png')")
  }

  function _setDarkMode() {
    viewingMode = "darkness"
    localStorage.setItem("viewingMode", viewingMode)

    lightButtons.forEach((light) => {
      light.style.visibility = "visible"
    })

    darkButtons.forEach((dark) => {
      dark.style.visibility = "hidden"
    })

    root.style.setProperty("--textColour", "#cccccc")
    root.style.setProperty("--backColour", "#262626")
    root.style.setProperty("--navBarColour", "#210000")
    root.style.setProperty("--navTextColour", "#d4bc2b")
    root.style.setProperty("--navHoverColour", "#82807d")
    root.style.setProperty("--menuBackgroundColour", "#82827d")
    root.style.setProperty("--menuTextColour", "#210000")
    root.style.setProperty("--menuBackgroundHoverColour", "#cccccc")
    root.style.setProperty("--menuTextHoverColour", "#f5f5f5")
    root.style.setProperty("--hamburgerButtonColour", "#82827d")
    root.style.setProperty("--titleColour", "#0e0cf3")
    root.style.setProperty("--colour1", "black")
    root.style.setProperty("--colour2", "white")
    root.style.setProperty("--scrollTrackColour", "#757270")
    root.style.setProperty("--scrollThumbColour1", "#0a2647")
    root.style.setProperty("--scrollThumbColour2", "#205295")
    root.style.setProperty("--scrollButtonColour1", "#1961b3")
    root.style.setProperty("--scrollButtonColour2", "#4282d7")
    root.style.setProperty("--scrollBorderColour", "#0e0cf3")
    root.style.setProperty("--progressColour", "#0e0cf3")
    root.style.setProperty("--tipBackgroundColour", "#3399ff")
    root.style.setProperty("--tipBorderColour", "black")
    root.style.setProperty("--tipTextColour", "black")

    root.style.setProperty("--sectionBackColour", "#0d2d51")

    root.style.setProperty("--panelBackColour", "#205ea4")
    root.style.setProperty("--panelBorderColour", "#0e3c70")

    root.style.setProperty("--contactFormBorderColour", "#0033cc")
    root.style.setProperty("--contactLabelColour", "#0d0d0d")
    root.style.setProperty("--contactBackgroundColour", "#4e4c4b")
    root.style.setProperty("--contactFieldPlaceholderColour", "rgba(38, 38, 38, 0.6)")
    root.style.setProperty("--contactFieldTextColour", "#262626")
    root.style.setProperty("--contactFieldBackgroundColour", "#827d7d")
    root.style.setProperty("--contactFieldBorderFocusColour", "#3399ff")
    root.style.setProperty("--contactButtonColour", "#006600")
    root.style.setProperty("--contactButtonTextColour", "#8c8c8c")
    root.style.setProperty("--contactButtonHoverColour", "#009900")
    root.style.setProperty("--contactButtonActiveColour", "#8ae600")

    /* ---------- Colours below this line not currently in use ---------- */
    root.style.setProperty("--highlightColour1", "#b3d9ff")
    root.style.setProperty("--highlightColour2", "#3399ff")
    root.style.setProperty("--postItColour", "#fffcaa")
    root.style.setProperty("--sidebarTextColour", "black")
    root.style.setProperty("--sidebarBackgroundColour", "#8f8b8a")
    root.style.setProperty("--sidebarBorderColour", "#0e0cf3")
    root.style.setProperty("--alertColour", "#b30000")
    root.style.setProperty("--successColour", "#29a329")

    root.style.setProperty("--borderImage", "url('../images/border-dark.png')")
  }
}

function scrollToTop() {
  let element = document.documentElement

  if ("scrollBehavior" in element.style) {
    element.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    })
  } else {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }

  document.querySelector("nav").style.top = "0"
}

function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((section) => {
    section.addEventListener("click", function (e) {
      e.preventDefault()

      let selection

      try {
        selection = document.querySelector(e.target.getAttribute("href"))
        selection.scrollIntoView({behavior: "smooth"})
      } catch (error) {
        throw new Error("Sumink went rong: " + error)
      }
    })
  })
}

function setFontsAndSizings() {
  const root = document.querySelector(":root")
  let navLinkSize
  let navDropLinkSize
  let navDropMenuWidth
  let hamburgerWidth
  let hamburgerLayerHeight
  let hamburgerSpacer
  let hamburgerLinkSize
  let hamburgerMenuWidth
  let viewModeButtonSize
  let viewModeTop
  let viewModeLeft
  let parallaxFontSize
  let textFontSize
  let footerFontSize
  let tipFontSize
  let largeSize = 650
  let mobileInflate = 1.1
  let screenWidth = window.innerWidth
  let temp = screenWidth / 3395

  navLinkSize = _clamp(temp * 4.5, 0.85, 4.75)
  navDropLinkSize = _clamp(temp * 4, 0.6, 4)
  navDropMenuWidth = _clamp(temp * 35, 4.5, 49)
  hamburgerWidth = _clamp(temp * 150, 18, 32)
  hamburgerLayerHeight = _clamp(temp * 20, 1, 3)
  hamburgerSpacer = _clamp(temp * 80, 6, 9)
  hamburgerLinkSize = _clamp(temp * 9, 1, 1.6)
  hamburgerMenuWidth = _clamp(temp * 73, 8, 14)
  viewModeButtonSize =
    screenWidth < largeSize ? _clamp(temp * 6, 2, 7) * mobileInflate : _clamp(temp * 6, 2, 7)
  viewModeTop = _clamp(temp * 24, 2, 18)
  viewModeLeft = screenWidth < largeSize ? _clamp(temp * -10, -4, -1) : _clamp(temp * 10, 1, 4) / 2
  parallaxFontSize = _clamp(temp * 12, 2, 12)

  textFontSize =
    screenWidth < largeSize
      ? _clamp(temp * 2.7, 0.9, 2.7) * (mobileInflate + 0.15)
      : _clamp(temp * 2.7, 0.9, 2.7)

  footerFontSize = _clamp(temp * 2.25, 0.77, 2.25)

  tipFontSize =
    screenWidth < largeSize
      ? _clamp(temp * 1.9, 0.6, 1.9) * mobileInflate
      : _clamp(temp * 1.9, 0.6, 1.9)

  root.style.setProperty("--navLinkSize", navLinkSize + "rem")
  root.style.setProperty("--navDropLinkSize", navDropLinkSize + "rem")
  root.style.setProperty("--navDropMenuWidth", navDropMenuWidth + "rem")
  root.style.setProperty("--hamburgerWidth", hamburgerWidth + "px")
  root.style.setProperty("--hamburgerLayerHeight", hamburgerLayerHeight + "px")
  root.style.setProperty("--hamburgerSpacer", hamburgerSpacer + "px")
  root.style.setProperty("--hamburgerLinkSize", hamburgerLinkSize + "rem")
  root.style.setProperty("--hamburgerMenuWidth", hamburgerMenuWidth + "rem")
  root.style.setProperty("--viewModeButtonSize", viewModeButtonSize + "rem")
  root.style.setProperty("--viewModeTop", viewModeTop + "px")
  root.style.setProperty("--viewModeLeft", viewModeLeft + "rem")
  root.style.setProperty("--parallaxFontSize", parallaxFontSize + "rem")
  root.style.setProperty("--textFontSize", textFontSize + "rem")
  root.style.setProperty("--footerFontSize", footerFontSize + "rem")
  root.style.setProperty("--tipFontSize", tipFontSize + "rem")

  function _clamp(value, min, max) {
    let clamped

    clamped = Math.min(Math.max(value, min), max)
    return clamped
  }
}

function navbarHide() {
  let prevScrollPos = window.scrollY
  let isScrolling

  if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    document.addEventListener("scroll", () => {
      let currentScrollPos = window.scrollY

      if (prevScrollPos > currentScrollPos) {
        document.querySelector("nav").style.top = "0"
      } else {
        document.querySelector("nav").style.top = "-5rem"
      }

      clearTimeout(isScrolling)
      isScrolling = setTimeout(() => {
        document.querySelector("nav").style.top = "0"
      }, 2000)

      prevScrollPos = currentScrollPos
    })
  }
}

function unanimate() {
  const links = document.querySelectorAll("#mainNav .mainMenu a:not(.dropMenu a)")

  if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    links.forEach((link) => {
      link.addEventListener("mouseover", () => {
        const linkPopAnim = new KeyframeEffect(
          link,
          [{transform: "scale(1)"}, {transform: "scale(1.2)"}],
          {
            duration: 250,
            easing: "ease-out",
            fill: "forwards",
          }
        )

        new Animation(linkPopAnim).play()
      })
    })

    links.forEach((link) => {
      link.addEventListener("mouseout", () => {
        const linkUnpopAnim = new KeyframeEffect(
          link,
          [{transform: "scale(1.2)"}, {transform: "scale(1)"}],
          {
            duration: 250,
            easing: "ease-out",
            fill: "forwards",
          }
        )

        new Animation(linkUnpopAnim).play()
      })
    })
  }
}

function block2SetUp() {
  // Modify to read single word, then breakdown to create 'letters' array
  const letters = document.querySelectorAll(".animateMe")
  const darkArray = ["red", "orange", "greenyellow", "limegreen", "#3399ff", "#e600e6"]
  const lightArray = ["#e60000", "#e69500", "#ffff00", "#00cc00", "#0000ff", "#990099"]
  let colourArray
  let colourIndex

  if (viewingMode == "lightness") {
    colourArray = lightArray
  } else {
    colourArray = darkArray
  }

  setInterval(() => {
    letters.forEach((letter) => {
      colourIndex = Math.floor(Math.random() * colourArray.length)
      letter.style.color = colourArray[colourIndex]
    })
  }, 250)
}

function block3SetUp() {
  const diplomas = document.querySelector("#block3 ul")
  const output = document.querySelector("#block3 #output")
  const dipPositions = new Map()
  const TARGET_DIMS = {
    top: "8rem",
    left: "2rem",
    width: "363px",
    height: "500px",
  }

  function _createAnimation(startPos, isReturn = false) {
    const styleSheet = document.createElement("style")
    const animation = isReturn ? "returnDiploma" : "moveDiploma"
    const [from, to] = isReturn ? [TARGET_DIMS, startPos] : [startPos, TARGET_DIMS]

    styleSheet.textContent = `
      @keyframes ${animation} {
        from {
          top: ${from.top}${typeof from.top === "number" ? "px" : ""};
          left: ${from.left}${typeof from.left === "number" ? "px" : ""};
          width: ${from.width}${typeof from.width === "number" ? "px" : ""};
          height: ${to.height}${typeof from.height === "number" ? "px" : ""};
        }
        to {
          top: ${to.top}${typeof to.top === "number" ? "px" : ""};
          left: ${to.left}${typeof to.left === "number" ? "px" : ""};
          width: ${to.width}${typeof to.width === "number" ? "px" : ""};
          height: ${from.height}${typeof to.height === "number" ? "px" : ""};
        }
      }
    `
    document.head.appendChild(styleSheet)
  }

  function _resetDiplomas() {
    diplomas.querySelectorAll("li").forEach((diploma) => {
      diploma.classList.remove("selected", "returning", "fade-out", "fade-in")
    })
    output.classList.remove("fade-in")
    output.innerHTML = ""
  }

  // Store initial positions
  diplomas.querySelectorAll("li").forEach((diploma) => {
    const dipRect = diploma.getBoundingClientRect()
    const sectionRect = diploma.closest("#block3").getBoundingClientRect()

    dipPositions.set(diploma, {
      top: dipRect.top - sectionRect.top,
      left: dipRect.left - sectionRect.left,
      width: dipRect.width,
      height: dipRect.height,
    })
  })

  diplomas.addEventListener("click", (e) => {
    const selected = e.target.closest("LI")
    if (!selected) return

    if (!selected.classList.contains("selected")) {
      _resetDiplomas()

      const startPos = dipPositions.get(selected)
      _createAnimation(startPos)

      // Handle selected diploma
      selected.classList.add("selected")

      // Handle other diplomas
      diplomas.querySelectorAll("li").forEach((diploma) => {
        if (diploma !== selected) {
          diploma.classList.add("fade-out")
        }
      })

      // Handle course info display
      const courseId = selected.getAttribute("data-course")
      const courseInfo = document.querySelector(courseId).cloneNode(true)

      courseInfo.style.display = "block"
      output.classList.add("fade-in")
      output.appendChild(courseInfo)
    } else {
      const startPos = dipPositions.get(selected)

      _createAnimation(startPos, true)
      selected.classList.add("returning")
      selected.addEventListener(
        "animationend",
        () => {
          _resetDiplomas()
        },
        {once: true}
      )

      // Handle other diplomas
      diplomas.querySelectorAll("li").forEach((diploma) => {
        if (diploma !== selected) {
          diploma.classList.remove("fade-out")
          diploma.classList.add("fade-in")
        }
      })
    }
  })
}

function block4SetUp() {
  const postItItems = document.querySelectorAll("#postIt li")
  const projectPanel = document.querySelector("#projectPanel")
  const closeButton = document.querySelector("#closePanel")
  const panels = document.querySelectorAll("#panels li")

  postItItems.forEach((item) => {
    item.addEventListener("click", function () {
      const newProjectId = this.getAttribute("data-project")

      if (projectPanel.classList.contains("active")) {
        projectPanel.classList.add("closing")
        projectPanel.classList.remove("active")

        setTimeout(() => {
          projectPanel.classList.remove("closing")
          panels.forEach((panel) => panel.classList.remove("active"))
          _showNewPanel(newProjectId)
        }, 500)
      } else {
        _showNewPanel(newProjectId)
      }
    })
  })

  function _showNewPanel(projectId) {
    const targetPanel = document.querySelector(projectId)
    if (targetPanel) {
      targetPanel.classList.add("active")
      projectPanel.classList.add("active")
    }
  }

  closeButton.addEventListener("click", function () {
    projectPanel.classList.add("closing")
    projectPanel.classList.remove("active")
    setTimeout(() => {
      projectPanel.classList.remove("closing")
      panels.forEach((panel) => panel.classList.remove("active"))
    }, 500)
  })
}

function block5SetUp() {
  const timeline = document.querySelector(".events ol")
  const events = document.querySelectorAll(".events ol li a")
  const before = document.querySelector("#before")
  const after = document.querySelector("#after")
  const arrows = document.querySelectorAll("#before .arrow, #after .arrow")
  const arrowDelay = 250
  let timelineExtended = false
  let prevEvent = null
  let prevYr = null
  let prevInfo = null
  let clicked = false
  let md

  if (timelineExtended) {
    md = Math.floor(events.length / 2)
  } else {
    md = Math.ceil(events.length / 2) - 1
  }

  arrows.forEach((arrow, index) => {
    const arrowAnim = new KeyframeEffect(
      arrow,
      [
        {opacity: 0, transform: "translateX(4vw)"},
        {opacity: 1, transform: "translateX(2vw)"},
        {opacity: 1, transform: "translateX(-2vw)"},
        {opacity: 0, transform: "translateX(-4vw)"},
      ],
      {duration: 2000, delay: arrowDelay * index, iterations: Infinity, easing: "linear"}
    )

    new Animation(arrowAnim).play()
  })

  events.forEach((event) => {
    const eventDate = event.getAttribute("data-date")
    let yr = Number(eventDate.substring(eventDate.length - 4))
    let midYr = Number(
      events[md]
        .getAttribute("data-date")
        .substring(events[md].getAttribute("data-date").length - 4)
    )

    event.addEventListener("mouseover", () => {
      if (!timelineExtended && yr > midYr) {
        before.style.visibility = "visible"

        const futureAnim = new KeyframeEffect(timeline, [{transform: "translateX(-20%)"}], {
          duration: 1500,
          easing: "ease-out",
          fill: "forwards",
        })

        new Animation(futureAnim).play()

        timelineExtended = true
        after.style.visibility = "hidden"
      } else if (timelineExtended && yr < midYr) {
        after.style.visibility = "visible"

        const pastAnim = new KeyframeEffect(timeline, [{transform: "translateX(0%)"}], {
          duration: 1500,
          easing: "ease-out",
          fill: "forwards",
        })

        new Animation(pastAnim).play()

        timelineExtended = false
        before.style.visibility = "hidden"
      }

      event.style.color = "var(--highlightColour1)"
    })

    event.addEventListener("mouseout", () => {
      if (clicked) {
        event.style.color = "var(--highlightColour2)"
      } else {
        event.style.color = "var(--textColour)"
      }

      clicked = false
    })

    event.addEventListener("click", () => {
      const eventInfo = document.querySelector(eventDate)
      let eventAnim
      let eventDirection

      clicked = true
      event.style.color = "var(--highlightColour2)"
      events.forEach((date) => {
        if (prevEvent) {
          // This branch followed only for second and subsequent selections
          if (event != prevEvent) {
            prevEvent.style.color = "var(--textColour)"

            // Slide current event off-screen
            if (date == prevEvent) {
              if (prevYr < midYr) {
                eventDirection = "translateX(-200%)"
              } else {
                eventDirection = "translateX(200%)"
              }

              eventAnim = new KeyframeEffect(prevInfo, [{transform: eventDirection}], {
                duration: 750,
                easing: "ease-out",
                fill: "forwards",
              })

              new Animation(eventAnim).play()
            }
          }
        }

        // Slide new event onto screen
        if (date == event) {
          if (yr < midYr) {
            eventInfo.style.transform = "translateX(-200%)"
          } else {
            eventInfo.style.transform = "translateX(200%)"
          }

          eventAnim = new KeyframeEffect(eventInfo, [{transform: "translateX(0%)"}], {
            duration: 1500,
            easing: "linear",
            fill: "forwards",
          })

          eventInfo.style.display = "inline-block"
          new Animation(eventAnim).play()
        }
      })

      prevEvent = event
      prevYr = yr
      prevInfo = eventInfo
      prevInfo.style.display = "none;"
    })
  })
}

async function block6SetUp() {
  emailjs.init("uuJqWlCvuML_Trzm-")

  document.querySelector(".contactForm").addEventListener("submit", async function (e) {
    e.preventDefault()

    const formData = new FormData(this)
    const errors = _validateForm(formData)

    if (errors.length > 0) {
      alert(errors.join("\n"))
      return
    }

    const sendCopy = formData.get("forward")

    try {
      // Send main email
      const response = await emailjs.send(
        "service_7pgphhl",
        "template_kmnam9c",
        {
          from_name: formData.get("fullName"),
          from_email: formData.get("email"),
          message: formData.get("message"),
        }
      )

      // If copy requested, send confirmation email
      if (sendCopy) {
        await emailjs.send("service_7pgphhl", "template_o26fij7", {
          from_name: formData.get("fullName"),
          from_email: formData.get("email"),
          message: formData.get("message"),
          to_email: formData.get("email"),
        })
      }

      if (response.status === 200) {
        alert("Message sent successfully!")
        this.reset()
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      alert("Failed to send message")
    }
  })

  // Form Validation
  function _validateForm(formData) {
    const errors = []
    const name = formData.get("fullName")
    const email = formData.get("email")
    const message = formData.get("message")

    // Name validation (only letters, spaces, hyphens and apostrophes)
    if (!name || name.trim() === "") {
      errors.push("Name is required")
    } else if (!/^[A-Za-z\s'-]+$/.test(name)) {
      errors.push("Name can only contain letters, spaces, hyphens and apostrophes")
    }

    // Email validation
    if (!email || email.trim() === "") {
      errors.push("Email address is required")
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push("Please enter a valid email address")
    }

    // Message validation
    if (!message || message.trim() === "") {
      errors.push("Message is required")
    } else if (message.length < 10) {
      errors.push("Message must be at least 10 characters long")
    } else if (message.length > 1000) {
      errors.push("Message cannot exceed 1000 characters")
    }

    return errors
  }

  // Helper functions for displaying messages
  function _clearMessages() {
    document.querySelectorAll(".form-message").forEach((msg) => msg.remove())
  }

  function _displaySuccessMessage(message) {
    const successDiv = document.createElement("div")
    successDiv.className = "form-message success-message"
    successDiv.textContent = message
    successDiv.style.color = "green"
    successDiv.style.marginBottom = "1rem"

    const form = document.querySelector(".contactForm")
    form.insertBefore(successDiv, form.firstChild)

    setTimeout(() => successDiv.remove(), 5000)
  }

  function _displayErrorMessage(message) {
    const errorDiv = document.createElement("div")
    errorDiv.className = "form-message error-message"
    errorDiv.textContent = message
    errorDiv.style.color = "red"
    errorDiv.style.marginBottom = "1rem"

    const form = document.querySelector(".contactForm")
    form.insertBefore(errorDiv, form.firstChild)

    setTimeout(() => errorDiv.remove(), 5000)
  }
}

function footerDate() {
  const currentYear = new Date().getFullYear()

  document.querySelector("footer h3").innerHTML = "&copySteve Schrader " + currentYear
}

function init() {
  // NOTES - 23/01/2024
  // Studies page CSS and wrap animations
  // Employment page CSS and wrap animations (timeline swaps to vertical for smaller devices)
  // Projects page CSS and wrap animations
  // Re-consider layout of text blocks for all sections
  // Check coolors.com for colour palette contrasts
  // Edit and finalize text portions
  // CONCEPT - 16/10/2024: Button (-) to collapse all panels leaving only the rocket images ...
  //
  // NOTES - 14/12/2024
  // favicon
  // Wavy footer for each section (not Contact)
  // Backgrounds animated to on-scroll. Images should scroll in and out as user scrolls past section.
  // (Various images for each section: stars, science/math formulae, computer code)
  // Placeholder image for Dip WebDev
  // !! Re-do HTML/CSS using Tailwind !!
  //
  // Education section:
  // Grid consisting two rows of two images each
  // Small images for CertIV/larger images for Diplomas (Diploma to left, CertIV to right)
  // On hover (for each image), other images disappear, selected image expands and
  // text block appears.

  setViewingMode()
  setFontsAndSizings()

  if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    scrollToTop()
    smoothScroll()
    navbarHide()
    unanimate()
    block2SetUp()
    block3SetUp()
  }

  block4SetUp();
  // block5SetUp()
  block6SetUp()
  footerDate()

  window.addEventListener("resize", setFontsAndSizings)
}

window.onload = init;
