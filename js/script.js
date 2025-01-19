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

  let isAnimating = false

  function _createAnimation(startPos, isReturn = false) {
    const styleSheet = document.createElement("style")


    const animation = isReturn ? "returnDiploma" : "moveDiploma"
    const [from, to] = isReturn ? [TARGET_DIMS, startPos] : [startPos, TARGET_DIMS]

    document.querySelectorAll("style[data-animation]").forEach((style) => style.remove())
    styleSheet.setAttribute("data-animation", "diploma")

    styleSheet.textContent = `
      @keyframes ${animation} {
        from {
          top: ${from.top}${typeof from.top === "number" ? "px" : ""};
          left: ${from.left}${typeof from.left === "number" ? "px" : ""};
          width: ${from.width}${typeof from.width === "number" ? "px" : ""};
          height: ${from.height}${typeof from.height === "number" ? "px" : ""};
        }
        to {
          top: ${to.top}${typeof to.top === "number" ? "px" : ""};
          left: ${to.left}${typeof to.left === "number" ? "px" : ""};
          width: ${to.width}${typeof to.width === "number" ? "px" : ""};
          height: ${to.height}${typeof to.height === "number" ? "px" : ""};
        }
      }
    `
    document.head.appendChild(styleSheet)
  }

  function _resetDiplomas() {
    const clone = document.querySelector("#block3 .diploma-clone")

    if (clone) clone.remove()

    diplomas.querySelectorAll("li").forEach((diploma) => {
      diploma.classList.remove("fade-out", "fade-in")
    })

    output.style.display = "none"
    output.classList.remove("fade-in", "fade-out")
    output.innerHTML = ""
  }

  function _createClone(selected, startPos) {
    const clone = selected.cloneNode(true)

    clone.classList.add("diploma-clone", "selected")
    clone.style.position = "absolute"
    clone.style.top = `${startPos.top}px`
    clone.style.left = `${startPos.left}px`
    clone.style.width = `${startPos.width}px`
    clone.style.height = `${startPos.height}px`

    return clone
  }

  function _fadeOutDiplomas() {
    return new Promise((resolve) => {
      diplomas.querySelectorAll("li:not(.diploma-clone)").forEach((diploma) => {
        diploma.classList.add("fade-out")
      })
      setTimeout(resolve, 425)
    })
  }

  function _moveClone(clone, startPos) {
    return new Promise((resolve) => {
      const styleSheet = document.createElement("style")

      _createAnimation(startPos)
      styleSheet.setAttribute("data-animation-speed", "diploma")

      styleSheet.textContent = `
        #block3 li.selected {
          animation-duration: 0.765s;
        }
      `

      document.head.appendChild(styleSheet)

      clone.addEventListener(
        "animationend",
        () => {
          document.querySelector('[data-animation-speed="diploma"]').remove()
          resolve()
        },
        {once: true}
      )
    })
  }

  function _showDiplomaInfo(courseId) {
    return new Promise((resolve) => {
      const courseInfo = document.querySelector(courseId).cloneNode(true)

      output.style.display = "block"
      output.classList.add("fade-in")
      output.appendChild(courseInfo)
      setTimeout(resolve, 500)
    })
  }

  function _hideDiplomaInfo() {
    return new Promise((resolve) => {
      output.classList.remove("fade-in")
      output.classList.add("fade-out")
      setTimeout(() => {
        output.style.display = "none"
        output.innerHTML = ""
        output.classList.remove("fade-out")
        resolve()
      }, 500)
    })
  }

  function _returnClone(clone, startPos) {
    return new Promise((resolve) => {
      clone.classList.remove("selected")
      clone.classList.add("returning")
      _createAnimation(startPos, true)
      clone.addEventListener(
        "animationend",
        () => {
          const originalId = clone.getAttribute("data-course")
          const original = diplomas.querySelector(`li[data-course="${originalId}"]`)

          original.classList.remove("fade-out")
          original.classList.add("fade-in")

          clone.remove()
          resolve()
        },
        {once: true}
      )
    })
  }

  function _revealOriginals(excludeDiplomaId = null) {
    return new Promise((resolve) => {
      diplomas.querySelectorAll("li:not(.diploma-clone)").forEach((diploma) => {
        if (diploma.getAttribute("data-course") !== excludeDiplomaId) {
          diploma.classList.remove("fade-out")
          diploma.classList.add("fade-in")
        }
      })
      setTimeout(resolve, 425)
    })
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

  // Main click handler
  diplomas.addEventListener("click", async (e) => {
    const clicked = e.target.closest("LI")

    if (!clicked || isAnimating) return

    if (!clicked.classList.contains("diploma-clone")) {
      isAnimating = true

      _resetDiplomas()

      const startPos = dipPositions.get(clicked)
      const courseId = clicked.getAttribute("data-course")
      const clone = _createClone(clicked, startPos)

      diplomas.appendChild(clone)

      try {
        await _fadeOutDiplomas()
        await _moveClone(clone, startPos)
        await _showDiplomaInfo(courseId)
      } finally {
        isAnimating = false
      }
    } else {
      isAnimating = true
      try {
        await _hideDiplomaInfo()
        await _revealOriginals(clicked.getAttribute("data-course"))
        await _returnClone(
          clicked,
          dipPositions.get(
            diplomas.querySelector(`li[data-course="${clicked.getAttribute("data-course")}"]`)
          )
        )
      } finally {
        isAnimating = false
      }
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
  const resumeButton = document.querySelector("#block5 #resumeDownloadButton")

  const startIndex = selectedElement
    ? parseInt(selectedElement.closest("a").getAttribute("href").split("-")[1])
    : 1

  const svgIcons = {
    left: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-light-alertColour dark:text-dark-alertColour bg-light-sectionBackColour dark:bg-dark-sectionBackColour"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>`,
    right: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-light-alertColour dark:text-dark-alertColour bg-light-sectionBackColour dark:bg-dark-sectionBackColour"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`,
  }

  // Initialize
  if (!resumeButton) return

  _setupDateMarkers()
  _calculatePositions()
  _setupEventListeners()
  _adjustTimelineWidth()
  _updateUI(parseInt(startIndex))
  _initializeEventCard()

  resumeButton.addEventListener("click", function (e) {
    e.preventDefault()

    // Prevent multiple clicks
    if (this.dataset.downloading) return

    this.dataset.downloading = "true"
    _thankYouBubble(this)

    // Create a direct download link
    const link = document.createElement("a")

    link.href = this.href
    link.download = "resumeSteveSchrader.pdf"
    link.style.display = "none"
    document.body.appendChild(link)

    setTimeout(() => {
      try {
        link.click()
        document.body.removeChild(link)
      } catch (error) {
        window.open(this.href, "_blank")
      } finally {
        delete this.dataset.downloading
      }
    }, 1000)
  })

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

function _thankYouBubble(buttonElement) {
  const bubbleContainer = document.createElement("div")
  const bubble = document.createElement("div")

  bubbleContainer.style.position = "relative"
  bubble.className = "thank-you-bubble"
  bubble.textContent = "Thank You!"

  buttonElement.parentNode.insertBefore(bubbleContainer, buttonElement.nextSibling)
  bubbleContainer.appendChild(bubble)

  bubble.addEventListener("animationend", () => bubbleContainer.remove())
}

  async function _fetchAndDownload(url) {
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error("Download failed")

      const blob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement("a")

      link.download = "resumeSteveSchrader.pdf"
      link.href = downloadUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(downloadUrl)
    } catch {
      window.open(url, "_blank")
    }
  }
}

async function block6Setup() {
  const form = document.querySelector(".contactForm")
  const inputFields = form.querySelectorAll('input[type="text"], input[type="email"], textarea')
  const submitButton = form.querySelector('button[type="submit"]')

  emailjs.init("uuJqWlCvuML_Trzm-")
  form.setAttribute("novalidate", true)

  inputFields.forEach((field) => {
    field.addEventListener("blur", () => {
      const {isValid} = _validateField(field)

      _updateFieldStyle(field, isValid)
      _updateSubmitButton()
    })
  })

  form.addEventListener("submit", async function (e) {
    e.preventDefault()

    let hasErrors = false

    inputFields.forEach((field) => {
      const {isValid, message} = _validateField(field)

      if (!isValid) {
        hasErrors = true
        _updateFieldStyle(field, false)
        _createMessageBubble(field, message)
      }
    })

    if (hasErrors) {
      _updateSubmitButton(false)

      return
    }

    _updateSubmitButton(true)
    const formData = new FormData(this)

    try {
      const response = await emailjs.send("service_7pgphhl", "template_kmnam9c", {
        from_name: formData.get("fullName"),
        from_email: formData.get("email"),
        message: formData.get("message"),
      })

      if (formData.get("forward")) {
        await emailjs.send("service_7pgphhl", "template_o26fij7", {
          from_name: formData.get("fullName"),
          from_email: formData.get("email"),
          message: formData.get("message"),
          to_email: formData.get("email"),
        })
      }

      if (response.status === 200) {
        // Trigger 'Thank You' animation from Employment & remove next line
        alert("Message sent successfully!")
        this.reset()

        inputFields.forEach((field) => {
          field.classList.remove(
            "border-light-successColour",
            "dark:border-dark-successColour",
            "border-light-alertColour",
            "dark:border-dark-alertColour"
          )
        })

        _updateSubmitButton(false)
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
    }
  })

  function _validateField(field) {
    const fieldType = field.type
    const value = field.value.trim()
    let isValid = true
    let message = ""

    switch (fieldType) {
      case "text":
        if (value === "") {
          isValid = false
          message = "Name is required"
        } else if (/\d/.test(value) || !/^[A-Za-z\s'-]+$/.test(value)) {
          isValid = false
          message = "Name can only contain letters, spaces, hyphens and apostrophes"
        }
        break
      case "email":
        if (value === "") {
          isValid = false
          message = "Email address is required"
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          isValid = false
          message = "Please enter a valid email address"
        }
        break
      case "textarea":
        if (value === "") {
          isValid = false
          message = "Message is required"
        } else if (value.length < 8) {
          isValid = false
          message = "Message must be at least 8 characters long"
        } else if (value.length > 1000) {
          isValid = false
          message = "Message cannot exceed 1000 characters"
        }
        break
    }

    return {isValid, message}
  }

  function _updateFieldStyle(field, isValid) {
    field.classList.remove("formContainer-field-valid", "formContainer-field-invalid")

    if (field.value.trim() !== "") {
      if (isValid) {
        field.classList.add("formContainer-field-valid")
      } else {
        field.classList.add("formContainer-field-invalid")
      }
    }
  }

  function _updateSubmitButton() {
    const allFieldsValid = Array.from(inputFields).every((field) => {
      const value = field.value.trim()
      const isValid = _validateField(field).isValid
      return value !== "" && isValid
    })

    submitButton.classList.remove("button-valid", "button-invalid")

    if (allFieldsValid) {
      submitButton.classList.add("button-valid")
    } else {
      submitButton.classList.add("button-invalid")
    }
  }

  function _createMessageBubble(field, message) {
    const bubble = document.createElement("div")
    let bubbleClass = "errorBubble animate-fadeIn"

    bubble.textContent = message

    // Add specific positioning based on field type/id
    switch (field.id) {
      case "contactName":
        bubbleClass += " error-name" // Position for name field
        break
      case "contactEmail":
        bubbleClass += " error-email" // Position for email field
        break
      case "contactMessage":
        bubbleClass += " error-message" // Position for message field
        break
    }

    bubble.className = bubbleClass

    const container = document.createElement("div")

    container.className = "relative w-full h-0"
    field.parentNode.insertBefore(container, field)
    container.appendChild(bubble)

    setTimeout(() => {
      bubble.classList.remove("animate-fadeIn")
      bubble.classList.add("animate-fadeOut")
      setTimeout(() => {
        container.remove()
        field.classList.remove("formContainer-field-invalid")
        field.value = ""
        _updateSubmitButton()
      }, 850)
    }, 2000)
  }
}

function footerDate() {
  const currentYear = new Date().getFullYear()

  document.querySelector("#copyDate").innerHTML = "&copySteve Schrader " + currentYear
}

function init() {
  /*
    TO-DO LIST
    - (POSITION AND STYLE MESSAGE BUBBLES)                              4h
    - Check all colours used are defined for light/dark modes           4h
      (consolidate colours where possible. ie: panelProject and timeline eventCards)
    - Confirm full responsiveness for all functionality                 2d
      (Modify parallax settings for responsive sizing of Launch Control images)
    - NEXT UPDATE: Add scroll-based animations to text blocks           3d
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
