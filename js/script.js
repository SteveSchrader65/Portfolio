/* jshint esversion: 8 */
"use strict"

let viewingMode = ""

function setViewingMode() {
  const lightModeButton = document.querySelector("#lightMode")
  const darkModeButton = document.querySelector("#darkMode")

  lightModeButton.addEventListener("click", _setLightMode)
  darkModeButton.addEventListener("click", _setDarkMode)
  viewingMode = localStorage.getItem("viewingMode")

  if (viewingMode == "darkness" || window.matchMedia(`(prefers-color-scheme: dark)`).matches) {
    _setDarkMode()
  } else {
    _setLightMode()
  }

  function _setLightMode() {
    document.documentElement.classList.add("dark")
    localStorage.setItem("viewingMode", "lightness")
    viewingMode = "lightness"
  }

  function _setDarkMode() {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("viewingMode", "darkness")
    viewingMode = "darkness"
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
      if (section.getAttribute("href").startsWith("#event-")) {
        return
      }

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

function navbarHide() {
  let prevScrollPos = window.scrollY
  let isScrolling

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

function updateScrollProgress() {
  const scrollProgress = document.querySelector("#scrollProgress")

  // Calculate scroll percentage
  const scrollTop = window.scrollY
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercentage = (scrollTop / scrollHeight) * 100

  // Apply transform
  scrollProgress.style.transform = `scaleX(${scrollPercentage / 100})`
}

function initializeHamburger() {
  const hamburger = document.querySelector(".hamburger-menu")
  const mainMenu = document.querySelector("#mainMenu")
  const topBar = hamburger.querySelector("span:first-child")
  const middleBar = hamburger.querySelector("span:nth-child(2)")
  const bottomBar = hamburger.querySelector("span:last-child")
  const menuLinks = mainMenu.querySelectorAll('a[href^="#"]')

  const topAnimation =
    "group-hover:animate-[hamburgerCollapse_0.15s_ease-in-out_forwards,hamburgerCentre_0.15s_ease-in-out_0.15s_forwards,hamburgerDot_0.15s_ease-in-out_0.3s_forwards,hamburgerRotateUpper_0.15s_ease-in-out_0.45s_forwards,hamburgerExtendUpper_0.15s_ease-in-out_0.6s_forwards]"
  const bottomAnimation =
    "group-hover:animate-[hamburgerCollapse_0.15s_ease-in-out_forwards,hamburgerCentre_0.15s_ease-in-out_0.15s_forwards,hamburgerDot_0.15s_ease-in-out_0.3s_forwards,hamburgerRotateLower_0.15s_ease-in-out_0.45s_forwards,hamburgerExtendLower_0.15s_ease-in-out_0.6s_forwards]"

  // Exit if not mobile view
  if (window.innerWidth >= 650) return

  // Add hover handlers for the hamburger menu
  hamburger.addEventListener("mouseenter", () => {
    // Reset animations by removing and re-adding classes
    topBar.classList.remove(topAnimation)
    bottomBar.classList.remove(bottomAnimation)

    // Force reflow
    void topBar.offsetWidth
    void bottomBar.offsetWidth

    // Re-add animations
    topBar.classList.add(topAnimation)
    bottomBar.classList.add(bottomAnimation)

    mainMenu.classList.remove("hidden")
    mainMenu.classList.add("flex")
    setTimeout(() => {
      mainMenu.style.transform = "translateX(0)"
    }, 50)
  })

  // Function to handle menu closing
  const closeMenu = () => {
    mainMenu.style.transform = "translateX(-100%)"
    setTimeout(() => {
      mainMenu.classList.add("hidden")
      mainMenu.classList.remove("flex")
    }, 300)
  }

  // Add hover handlers for the menu itself
  mainMenu.addEventListener("mouseenter", () => {
    clearTimeout(mainMenu.timeoutId)
  })

  mainMenu.addEventListener("mouseleave", () => {
    closeMenu()
  })

  hamburger.addEventListener("mouseleave", () => {
    // Delay to allow mouse movement to menu
    mainMenu.timeoutId = setTimeout(() => {
      if (!mainMenu.matches(":hover")) {
        closeMenu()
      }
    }, 100)

    // Reset hamburger animation classes
    topBar.classList.remove(topAnimation)
    bottomBar.classList.remove(bottomAnimation)
    middleBar.classList.remove("opacity-0")

    // Reset transforms
    topBar.style.transform = "translateY(-0.5rem)"
    bottomBar.style.transform = "translateY(0.5rem)"
  })

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 650) {
        mainMenu.style.transform = "translateX(-100%)"
        mainMenu.addEventListener(
          "transitionend",
          () => {
            mainMenu.classList.add("hidden")
          },
          {once: true}
        )
      }
    })
  })
}

function launchControl() {
  const launchButton = document.querySelector("#launchControl button")
  const titles = document.querySelectorAll(".content-section .parallax .title")
  const buttonImage = launchButton.querySelector("img")
  let isLaunched = false
  let audioContext
  let openSound
  let closeSound

  document.querySelector("#launchControl").style.display = "block"
  launchButton.setAttribute("aria-expanded", "true")

  // One-time mousemove listener for audio initialization
  launchButton.addEventListener("mousemove", async function audioInit() {
    if (!audioContext) {
      await _initAudio()

      // Remove the listener after initialization
      launchButton.removeEventListener("mousemove", audioInit)
    }
  })

  launchButton.addEventListener("click", function () {
    const direction = isLaunched ? "reverse" : "normal"

    buttonImage.animate([{transform: "rotate(0deg)"}, {transform: "rotate(180deg)"}], {
      duration: 1500,
      fill: "forwards",
      direction: direction,
    })

    launchButton.setAttribute("aria-expanded", !isLaunched)

    if (isLaunched) {
      _deploySections()
    } else {
      _launchRocket()
    }

    isLaunched = !isLaunched
  })

  function _launchRocket() {
    const textBlocks = document.querySelectorAll(".text_block")

    // Hide titles
    titles.forEach((heading) => {
      heading.innerHTML = ""
    })

    // Replace title3
    titles[1].innerHTML = "Lift-Off ..."

    textBlocks.forEach((block, index) => {
      setTimeout(() => {
        block.classList.add("collapsed")
        _playSound(closeSound)
      }, index * 900)
    })
  }

  function _deploySections() {
    const textBlocks = document.querySelectorAll(".text_block")

    // Restore all titles
    titles.forEach((title, index) => {
      switch (index) {
        case 0:
          title.innerHTML = "Overview"
          break
        case 1:
          title.innerHTML = "About"
          break
        case 2:
          title.innerHTML = "Studies"
          break
        case 3:
          title.innerHTML = "Projects"
          break
        case 4:
          title.innerHTML = "Employment"
          break
        case 5:
          title.innerHTML = "Contact"
          break
      }
    })

    Array.from(textBlocks).reverse().forEach((block, index) => {
      setTimeout(() => {
        block.classList.remove("collapsed")
        _playSound(openSound)
      }, index * 900)
    })
  }

  async function _initAudio() {
    audioContext = new AudioContext()

    try {
      const [openResponse, closeResponse] = await Promise.all([
        fetch("../sounds/openPanels.mp3"),
        fetch("../sounds/closePanels.mp3"),
      ])

      const openBuffer = await openResponse.arrayBuffer()
      const closeBuffer = await closeResponse.arrayBuffer()

      openSound = await audioContext.decodeAudioData(openBuffer)
      closeSound = await audioContext.decodeAudioData(closeBuffer)
    } catch (error) {
      console.log("Error loading sound:", error)
    }
  }

  function _playSound(soundBuffer) {
    if (audioContext && soundBuffer) {
      const source = audioContext.createBufferSource()
      const gainNode = audioContext.createGain()

      source.buffer = soundBuffer
      gainNode.gain.value = 0.05
      source.connect(gainNode)
      gainNode.connect(audioContext.destination)
      source.start(0)
    }
  }
}

function block2Setup() {
  const output = document.querySelector("#animateMe")
  const darkArray = ["red", "orange", "greenyellow", "limegreen", "#3399ff", "#e600e6"]
  const lightArray = ["#e60000", "#e69500", "#ffff00", "#00cc00", "#0000ff", "#990099"]
  let letters
  let colourArray

  // Array of letters drawn from HTML text
  letters = [...output.innerHTML]

  // Create span elements for each letter
  output.innerHTML = letters.map((letter) => `<span class="letter">${letter}</span>`).join("")

  if (viewingMode == "lightness") {
    colourArray = lightArray
  } else {
    colourArray = darkArray
  }

  setInterval(() => {
    // Select all letter spans and update their colors
    document.querySelectorAll(".letter").forEach((letterSpan) => {
      const colourIndex = Math.floor(Math.random() * colourArray.length)

      letterSpan.style.color = colourArray[colourIndex]
    })
  }, 250)
}

// Re-write using Promise to control order of events in animations
function block3Setup() {
  const diplomas = document.querySelector("#block3 ul")
  const output = document.querySelector("#block3 #diploma-info")
  const dipPositions = new Map()
  const TARGET_DIMS = {
    top: "12rem",
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

      // courseInfo.style.display = "block"
      output.style.display = "block"
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


function block4Setup() {
  const postItItems = document.querySelectorAll("#postIt li")
  const projectPanel = document.querySelector("#projectPanel")
  const panelsContent = document.querySelector("#panels").innerHTML
  const body = document.body

  projectPanel.style.overflow = "hidden"

  postItItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation()
      const projectId = item.getAttribute("data-project")

      // Create temporary container to find target content
      const temp = document.createElement("div")
      temp.innerHTML = panelsContent
      const targetPanel = temp.querySelector(projectId)

      if (!targetPanel) {
        return
      }

      // If panel is open, close it first and then open new one
      if (!projectPanel.classList.contains("hidden")) {
        projectPanel.classList.remove("panel-slide-in")
        projectPanel.classList.add("panel-slide-out")

        setTimeout(() => {
          projectPanel.classList.add("hidden")
          projectPanel.classList.remove("panel-slide-out")
          _openPanel(targetPanel)
        }, 1500)
      } else {
        _openPanel(targetPanel)
      }
    })
  })

  // Handle mouse over/leave for scroll control
  projectPanel.addEventListener("mouseover", function () {
    if (!projectPanel.classList.contains("hidden")) {
      body.style.overflow = "hidden"
      projectPanel.focus()
      projectPanel.style.overflowX = "hidden"
      projectPanel.style.overflowY = "auto"
    }
  })

  projectPanel.addEventListener("mouseleave", function () {
    if (!projectPanel.classList.contains("hidden")) {
      body.style.overflow = "auto"
      projectPanel.style.overflow = "hidden"
    }
  })

  function _openPanel(targetPanel) {
    const panelsContainer = projectPanel.querySelector("#panels")
    if (!panelsContainer) {
      return
    }

    panelsContainer.innerHTML = targetPanel.innerHTML
    projectPanel.classList.remove("hidden")
    projectPanel.classList.add("panel-slide-in")
    projectPanel.scrollTop = 0

    body.style.overflow = "auto"
  }

  // Close panel when clicking outside
  body.addEventListener("click", function (e) {
    if (
      !projectPanel.classList.contains("hidden") &&
      !projectPanel.contains(e.target) &&
      !e.target.closest("#postIt")
    ) {
      projectPanel.classList.remove("panel-slide-in")
      projectPanel.classList.add("panel-slide-out")

      body.style.overflow = "auto"

      setTimeout(() => {
        projectPanel.classList.add("hidden")
        projectPanel.classList.remove("panel-slide-out")
      }, 1500)
    }
  })

  // Handle panel scrolling
  projectPanel.addEventListener(
    "wheel",
    function (e) {
      if (projectPanel.classList.contains("hidden")) return

      const atTop = this.scrollTop === 0
      const atBottom = Math.abs(this.scrollHeight - this.scrollTop - this.clientHeight) < 1

      // Allow scrolling within panel bounds
      if (!atTop && !atBottom) {
        e.stopPropagation()
        return
      }

      // Prevent scrolling beyond panel bounds
      if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    {passive: false}
  )

  projectPanel.addEventListener(
    "touchmove",
    function (e) {
      if (projectPanel.classList.contains("hidden")) return

      const atTop = this.scrollTop === 0
      const atBottom = Math.abs(this.scrollHeight - this.scrollTop - this.clientHeight) < 1

      if (!atTop && !atBottom) {
        e.stopPropagation()
        return
      }

      if ((atTop && e.touches[0].clientY > 0) || (atBottom && e.touches[0].clientY < 0)) {
        e.preventDefault()
        e.stopPropagation()
      }
    },
    {passive: false}
  )
}

function block5Setup() {
  let currentIndex = 1
  let isAnimating = false
  let currentCard = null

  const selectedElement = document.querySelector("#block5 #dates .selected")

  const startIndex = selectedElement
    ? parseInt(selectedElement.closest("a").getAttribute("href").split("-")[1])
    : 1

  const svgIcons = {
    left: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-light-alertColour dark:text-dark-alertColour bg-light-sectionBackColour dark:bg-dark-sectionBackColour"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
    right: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-light-alertColour dark:text-dark-alertColour bg-light-sectionBackColour dark:bg-dark-sectionBackColour"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  }

  // Initialize
  _setupDateMarkers()
  _calculatePositions()
  _setupEventListeners()
  _adjustTimelineWidth()
  _updateUI(parseInt(startIndex))
  _initializeEventCard()

function _handleEventCardAnimation(index) {
  const eventTemplate = document.querySelector(`#block5 #eventsContainer #event-${index}`)
  const cardContainer = document.querySelector("#block5 #eventCardContainer")

  if (!eventTemplate) return

  const newCard = eventTemplate.cloneNode(true)
  if (currentCard?.dataset?.date === newCard.dataset.date) return

  const animateSequence = async () => {
    // Exit animation for current card if it exists
    if (currentCard) {
      currentCard.classList.remove("card-enter")
      currentCard.classList.add("card-exit")
      await new Promise((resolve) => setTimeout(resolve, 500))
      currentCard.remove()
    }

    // Enter animation for new card
    cardContainer.appendChild(newCard)
    newCard.classList.add("card-enter")
    currentCard = newCard
  }

  animateSequence()
}

  function _setupDateMarkers() {
    const dateLinks = document.querySelectorAll("#block5 #dates a")

    dateLinks.forEach((link) => {
      if (link.textContent) {
        const marker = document.createElement("div")
        const label = document.createElement("span")

        marker.className = link.classList.contains("selected")
          ? "date-marker selected"
          : "date-marker"
        label.className = link.classList.contains("selected")
          ? "date-label selected"
          : "date-label"

        label.textContent = link.textContent
        link.textContent = ""
        link.appendChild(label)
        link.appendChild(marker)
      }
    })
  }

  function _calculatePositions() {
    const dates = Array.from(document.querySelectorAll("#block5 #dates a"))
    const startDate = new Date(dates[0].dataset.date.split("/").reverse().join("-"))
    const endDate = new Date(dates[dates.length - 1].dataset.date.split("/").reverse().join("-"))
    const timespan = endDate - startDate

    return dates.map((date) => {
      const currentDate = new Date(date.dataset.date.split("/").reverse().join("-"))
      const position = ((currentDate - startDate) / timespan) * 400

      date.parentElement.style.left = `${position}%`

      return position
    })
  }

  function _setupEventListeners() {
    document.querySelector("#block5 #timeline").addEventListener("click", (e) => {
      const prevBtn = e.target.closest(".prev")
      const nextBtn = e.target.closest(".next")

      if (prevBtn && currentIndex > 1) {
        _updateUI(currentIndex - 1, "navigation")
      } else if (nextBtn && currentIndex < 9) {
        _updateUI(currentIndex + 1, "navigation")
      }
    })

    document.querySelector("#block5 #dates").addEventListener("click", (e) => {
      const dateLink = e.target.closest('a[href^="#event-"]')

      if (!dateLink) return

      e.preventDefault()
      const index = parseInt(dateLink.getAttribute("href").split("-")[1])

      if (index > 0 && index < 10) {
        _updateUI(index, "dateClick")
        _handleEventCardAnimation(index)
      }
    })
  }

  function _adjustTimelineWidth() {
    const timeline = document.querySelector("#block5 #timeline")
    const prevBtn = document.querySelector("#block5 .prev")
    const nextBtn = document.querySelector("#block5 .next")

    const prevWidth = prevBtn.offsetWidth
    const nextWidth = nextBtn.offsetWidth
    const totalButtonWidth = prevWidth + nextWidth

    timeline.style.width = `calc(100% - ${totalButtonWidth}px)`
    timeline.style.margin = `0 ${prevWidth}px`
  }

  function _updateUI(index, source = "init") {
    if (isAnimating) return

    isAnimating = true

    const historyLine = document.querySelector("#block5 #historyLine")
    const prevBtn = document.querySelector("#block5 .prev")
    const nextBtn = document.querySelector("#block5 .next")
    const positions = _calculatePositions()
    const transform = -positions[index] + 50

    // Move the timeline
    historyLine.style.transform = `translateX(${transform}%)`

    // Only update selected states for date clicks or initialization
    if (source !== "navigation") {
      document
        .querySelectorAll("#block5 #dates .date-marker")
        .forEach((dm) => dm.classList.remove("selected"))
      document
        .querySelector(`#block5 #dates li:nth-child(${index + 1}) .date-marker`)
        ?.classList.add("selected")

      document
        .querySelectorAll("#block5 #dates .date-label")
        .forEach((dl) => dl.classList.remove("selected"))
      document
        .querySelector(`#block5 #dates li:nth-child(${index + 1}) .date-label`)
        ?.classList.add("selected")
    }

    // Update navigation buttons
    prevBtn.innerHTML = index === 1 ? "" : svgIcons.left
    nextBtn.innerHTML = index === 9 ? "" : svgIcons.right
    prevBtn.disabled = index === 1
    nextBtn.disabled = index === 9

    setTimeout(() => (isAnimating = false), 500)
    currentIndex = index
  }

  function _initializeEventCard() {
    const selectedDateLink = document.querySelector("#block5 #dates .selected")
    if (!selectedDateLink) return

    const index = parseInt(selectedDateLink.closest("a").getAttribute("href").split("-")[1])
    _handleEventCardAnimation(index)
  }
}

// Validation concept: Validate each field; highlight failing fields with border;
// The SEND button starts with a red background which changes to green only when
// all validations have passed.
// Modify SEND button tooltip
async function block6Setup() {
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
      const response = await emailjs.send("service_7pgphhl", "template_kmnam9c", {
        from_name: formData.get("fullName"),
        from_email: formData.get("email"),
        message: formData.get("message"),
      })

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

  document.querySelector("#copyDate").innerHTML = "&copySteve Schrader " + currentYear
}

function init() {
  /*
    TO-DO LIST
    - Validation of Contact form inputs. Hide animated version          2d
      (!! Confirm email functionality is still working !!)
    - Add scroll-based animations as backdrops to text blocks           3d
    - Check all colours used are defined for light/dark modes           4h
      (consolidate colours where possible. ie: panelProject and timeline eventCards)
    - Confirm full responsiveness for all functionality                 3d
      (Modify parallax settings for responsive sizing of Launch Control images)
    - Implement new Diploma card animations                 						2d
    - Re-write Overview text                                            1h
    - Ask Maria to test it !!
  */
  setViewingMode()
  initializeHamburger()

  if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    scrollToTop()
    smoothScroll()
    navbarHide()
    launchControl()
    block2Setup()
    block3Setup()
    block4Setup()
    block5Setup()
  }

  block6Setup()
  footerDate()
  window.addEventListener("scroll", updateScrollProgress)
  updateScrollProgress()
}

window.onload = init
