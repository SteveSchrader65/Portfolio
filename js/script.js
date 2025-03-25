/* jshint esversion: 8 */
"use strict"

let viewingMode = ""

function setViewingMode() {
  const lightModeButton = document.querySelector("#lightMode")
  const darkModeButton = document.querySelector("#darkMode")

  lightModeButton.addEventListener("click", _setLightMode)
  darkModeButton.addEventListener("click", _setDarkMode)
  viewingMode = localStorage.getItem("viewingMode")

  if (viewingMode == "darkness") {
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
      behavior: "smooth",
    })
  } else {
    element.scrollIntoView({behavior: "smooth", block: "start"})
  }
}

function smoothScroll() {
  document.querySelectorAll('a[href^="#content"]').forEach((section) => {
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

function navbarHide() {
  let prevScrollPos = window.scrollY
  let isScrolling

  document.addEventListener("scroll", () => {
    let currentScrollPos = window.scrollY

    if (prevScrollPos == currentScrollPos) {
      document.querySelector("nav").style.top = "0"
    } else {
      document.querySelector("nav").style.top = "-5rem"

      if (window.innerWidth < 650) {
        const mainMenu = document.querySelector("#mainMenu")
        mainMenu.style.visibility = ""
        mainMenu.style.transform = ""
      }

      const dropMenu = document.querySelector("#dropMenu")
      dropMenu.style.display = "none"
      document.querySelector("#dropMenu").style.display = "none"
    }

    clearTimeout(isScrolling)

    isScrolling = setTimeout(() => {
      document.querySelector("nav").style.top = "0"
      document.querySelector("#dropMenu").style.display = ""
    }, 1200)

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

function initHamburger() {
  const hamburger = document.querySelector(".hamburger-menu")
  const mainMenu = document.querySelector("#mainMenu")

  if (window.innerWidth >= 650) {
    return
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    hamburger.addEventListener("click", () => {
      if (mainMenu.classList.contains("hidden")) {
        mainMenu.classList.remove("hidden")
        mainMenu.classList.add("flex")
        mainMenu.style.transform = "translateX(0)"
      } else {
        mainMenu.style.transform = "translateX(-100%)"
        setTimeout(() => {
          mainMenu.classList.add("hidden")
          mainMenu.classList.remove("flex")
        }, 300)
      }
    })

    return
  }

  hamburger.addEventListener("mouseenter", () => {
    hamburger.classList.add("hover-active")
    _showMenu()
  })

  hamburger.addEventListener("mouseleave", () => {
    hamburger.classList.remove("hover-active")
    mainMenu.timeoutId = setTimeout(() => {
      if (!mainMenu.matches(":hover")) _hideMenu()
    }, 150)
  })

  mainMenu.addEventListener("mouseenter", () => {
    clearTimeout(mainMenu.timeoutId)
  })

  mainMenu.addEventListener("mouseleave", _hideMenu)

  mainMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 650) _hideMenu()
    })
  })

  function _showMenu() {
    mainMenu.classList.remove("hidden")
    mainMenu.classList.add("flex")
    requestAnimationFrame(() => {
      mainMenu.style.transform = "translateX(0)"
    })
  }

  function _hideMenu() {
    mainMenu.style.transform = "translateX(-100%)"
    mainMenu.addEventListener(
      "transitionend",
      () => {
        mainMenu.classList.add("hidden")
        mainMenu.classList.remove("flex")
      },
      {once: true}
    )
  }
}

function initGlitch() {
  const titles = document.querySelectorAll(".title")
  const resizeObservers = new Map()
  let animationFrameId = null
  let hasScrolled = false

  function _setupGlitchElements(element) {
    const originalText = element.innerHTML
    const before = document.createElement("span")
    const after = document.createElement("span")

    before.className = "glitch-before"
    after.className = "glitch-after"
    element.innerHTML = ""
    before.textContent = originalText
    element.appendChild(before)
    element.appendChild(after)
    element.dataset.originalText = originalText
  }

  function _startGlitch(element) {
    const intervalId = setInterval(() => {
      animationFrameId = requestAnimationFrame(() => {
        const skew = Math.random() * 20 - 10
        const top1 = Math.random() * 100
        const btm1 = Math.random() * 100
        const top2 = Math.random() * 100
        const btm2 = Math.random() * 100
        const before = element.querySelector(".glitch-before")
        const after = element.querySelector(".glitch-after")

        element.style.transform = `skew(${skew}deg)`

        if (before && after) {
          before.style.clipPath = `polygon(0 ${top1}%, 100% ${top1}%, 100% ${btm1}%, 0 ${btm1}%)`
          after.style.clipPath = `polygon(0 ${top2}%, 100% ${top2}%, 100% ${btm2}%, 0 ${btm2}%)`
        }

        if (Math.random() > 0.95) {
          element.style.transform = "skew(45deg)"
          element.style.transform = "translateX(30%)"
        }
      })
    }, 130)

    element.dataset.glitchInterval = intervalId

    let resizeTimeout
    const resizeObserver = new ResizeObserver(() => {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      resizeTimeout = setTimeout(() => {
        const currentInterval = element.dataset.glitchInterval

        if (currentInterval) {
          clearInterval(currentInterval)
        }
        _startGlitch(element)
      }, 250)
    })

    resizeObserver.observe(element)
    resizeObservers.set(element, resizeObserver)
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!hasScrolled) {
        hasScrolled = true
        _startGlitch(titles[0])
      }
    },
    {passive: true}
  )

  titles.forEach((title, index) => {
    _setupGlitchElements(title)
    if (index > 0) {
      _startGlitch(title)
    }
  })

  window.addEventListener("unload", () => {
    titles.forEach((title) => {
      if (title.dataset.glitchInterval) {
        clearInterval(title.dataset.glitchInterval)
      }
    })

    resizeObservers.clear()
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId)
    }
  })
}

// Check if bottom of parallax image == top of next parallax image
// If not, move image below upwards to bottom of previous
// ---- Reverse for deploySections ----
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

  launchButton.addEventListener("mousemove", async function audioInit() {
    if (!audioContext) {
      await _initAudio()

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

    titles.forEach((title) => {
      title.style.opacity = 0
    })

    document.querySelector('#parallax3 h2').classList.remove("hidden")

    textBlocks.forEach((block, index) => {
      setTimeout(() => {
        block.scrollIntoView()
        block.classList.add("collapsed")
        _playSound(closeSound)

        if (index == textBlocks.length - 1) {
          setTimeout(() => {
            block.addEventListener("animationend", scrollToTop())
          }, 1000)
        }
      }, index * 900)
    })
  }

  function _deploySections() {
    const textBlocks = document.querySelectorAll(".text_block")

    document.querySelector("#parallax3 h2").classList.add("hidden")

    titles.forEach((title) => {
      title.style.opacity = 1
    })

    Array.from(textBlocks).reverse().forEach((block, index) => {
      setTimeout(() => {
        setTimeout(() => {
          block.scrollIntoView()
        }, 150)
        block.classList.remove("collapsed")
        _playSound(openSound)

        if (index == textBlocks.length - 1) {
          setTimeout(() => {
            block.addEventListener("animationend", scrollToTop())
          }, 1000)
        }
      }, index * 900)
    })
  }

  async function _initAudio() {
    audioContext = new AudioContext()

    try {
      const [openResponse, closeResponse] = await Promise.all([
        fetch("/sounds/openPanels.mp3"),
        fetch("/sounds/closePanels.mp3"),
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
  let colourArray
  let letters

  letters = [...output.innerHTML]
  output.innerHTML = letters.map((letter) => `<span class="letter">${letter}</span>`).join("")

  if (viewingMode == "lightness") {
    colourArray = lightArray
  } else {
    colourArray = darkArray
  }

  setInterval(() => {
    document.querySelectorAll(".letter").forEach((letterSpan) => {
      const colourIndex = Math.floor(Math.random() * colourArray.length)

      letterSpan.style.color = colourArray[colourIndex]
    })
  }, 250)
}

function block3Setup() {
  const diplomas = document.querySelector("#block3 ul")
  const output = document.querySelector("#block3 #diploma-info")
  const instructionLine = document.querySelector("#block3 #diplomaInstruction")
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

      instructionLine.innerHTML = "Click diploma to return to Diploma Wall:"
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
          instructionLine.innerHTML = "Select a diploma for further information:"
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
  const eventsList = document.querySelector("#block5 #timelineWrapper #eventsList")
  const prevBtn = document.querySelector("#block5 #timelineWrapper #timeline #prevBtn")
  const nextBtn = document.querySelector("#block5 #timelineWrapper #timeline #nextBtn")
  const resumeButton = document.querySelector("#block5 #resumeDownloadButton")
  let currentIndex = 0
  let isAnimating = false
  let isMobile = window.innerWidth < 650
  let markers
  let positions = []
  let events = []

  const svgIcons = {
    left: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2" class="text-light-alertColour dark:text-dark-alertColour bg-light-sectionBackColour dark:bg-dark-sectionBackColour"><path d="M20 9l-7 7 7 7M13 9l-7 7 7 7"/></svg>`,
    right: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2" class="text-light-alertColour dark:text-dark-alertColour bg-light-sectionBackColour dark:bg-dark-sectionBackColour"><path d="M14 9l7 7-7 7M21 9l7 7-7 7"/></svg>`,
  }

  _initializeTimeline()

  window.addEventListener("resize", _debounce(_handleScreenChange, 250))

  function _initializeTimeline() {
    if (window.timelineObserver) {
      window.timelineObserver.disconnect()
      window.timelineObserver = null
    }

    events = Array.from(eventsList.querySelectorAll(".event")).slice(1, -1)
    markers = _setupMarkers()
    positions = _calculatePositions()

    events.forEach((event) => {
      event.classList.remove("enter-left", "exit-left", "card-enter", "card-exit")
    })

    currentIndex = events.findIndex((event) => event.classList.contains("selected"))
    events[currentIndex].classList.add("selected")

    if (isMobile) {
      _displayVerticalTimeline()
    } else {
      _displayHorizontalTimeline()

          // Center the selected item on initial load
      if (positions && positions.length > 0) {
        const selectedPos = parseFloat(events[currentIndex].style.left)
        const centerOffset = 50 - selectedPos

        events.forEach((event) => {
          const marker = event.querySelector(".dateMarker")
          const label = event.querySelector(".dateLabel")
          const currentPos = parseFloat(event.style.left)
          const newPos = currentPos + centerOffset

          if (marker) marker.style.left = `${newPos}%`
          if (label) label.style.left = `${newPos}%`

          event.style.left = `${newPos}%`
        })
      }
    }
  }

  function _setupMarkers() {
    const dates = events.filter(e => e.dataset.date)

    dates.forEach((date) => {
      if (date.querySelector(".eventDate")) {
        const marker = document.createElement("div")
        const label = document.createElement("span")

        date.querySelector(".eventDate").classList.add('hidden')

        marker.className = date.classList.contains("selected")
          ? "dateMarker selected"
          : "dateMarker"

        label.className = date.classList.contains("selected") ? "dateLabel selected" : "dateLabel"
        label.textContent = date.querySelector(".eventDate").textContent
        date.appendChild(marker)
        date.appendChild(label)
      }
    })

    return document.querySelectorAll(".dateMarker")
  }

  function _calculatePositions() {
    const validEvents = events.filter(e => e.dataset.date)

    if (validEvents.length < 2) return null

    const parsedEvents = validEvents.map(
      (event) => new Date(event.dataset.date.split("/").reverse().join("-"))
    )

    const startDate = parsedEvents[0]
    const endDate = parsedEvents[parsedEvents.length - 1]

    positions = parsedEvents.map(event => {
      if (isMobile) return (event - startDate) / (endDate - startDate) * 170
      if (!isMobile) return (event - startDate) / (endDate - startDate) * 250
    })

    validEvents.forEach((event, index) => {
      const marker = event.querySelector(".dateMarker")
      const label = event.querySelector(".dateLabel")

      if (isMobile) {
        if (marker) marker.style.marginTop = `${positions[index]}%`
        if (label) label.style.marginTop = `${positions[index]}%`

        event.style.marginTop = `${positions[index]}%`
      } else {
        if (marker) marker.style.left = `${positions[index]}%`
        if (label) label.style.left = `${positions[index]}%`

        event.style.left = `${positions[index]}%`
      }
    })

    return positions
  }

  function _displayVerticalTimeline() {
    if (prevBtn) prevBtn.style.display = "none"
    if (nextBtn) nextBtn.style.display = "none"

    const observerOptions = {
      root: null,
      threshold: 0.9,
      rootMargin: "-40% 0px -40% 0px",
    }

    events.forEach((event, index) => {
      const marker = markers[index]

      event.style.top = `${marker.offsetTop - 64}px`
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const markerIndex = Array.from(markers).indexOf(entry.target)
        const event = events[markerIndex]
        // console.log(event)
        const eventCard = event.querySelector(".content")

        eventCard.style.animation = "none"
        eventCard.offsetHeight
        eventCard.style.animation = null

        if (entry.isIntersecting) {
          eventCard.classList.remove("exit-left")
          eventCard.classList.add("enter-left")
        } else {
          eventCard.classList.remove("enter-left")
          eventCard.classList.add("exit-left")
        }
      })
    }, observerOptions)

    markers.forEach((marker) => {
      observer.observe(marker)
    })
  }

  function _displayHorizontalTimeline() {
    if (prevBtn) {
      prevBtn.style.display = "block"
      prevBtn.innerHTML = currentIndex === 0 ? "" : svgIcons.left
      prevBtn.disabled = currentIndex === 0
    }

    if (nextBtn) {
      nextBtn.style.display = "block"
      nextBtn.innerHTML = currentIndex === events.length - 1 ? "" : svgIcons.right
      nextBtn.disabled = currentIndex === events.length - 1
    }

    events.forEach((event, index) => {
      const marker = event.querySelector(".dateMarker")
      const label = event.querySelector(".dateLabel")
      const content = event.querySelector(".content")

      if (content) {
        content.classList.remove("card-enter", "card-exit")
        content.style.opacity = index === currentIndex ? "1" : "0"
        content.style.pointerEvents = index === currentIndex ? "auto" : "none"
      }

      if (index === currentIndex) {
        event.classList.add("selected")

        if (marker) marker.classList.add("selected")
        if (label) label.classList.add("selected")

        if (content) {
          content.classList.add("card-enter")
        }
      } else {
        event.classList.remove("selected")

        if (marker) marker.classList.remove("selected")
        if (label) label.classList.remove("selected")
      }
    })

    setTimeout(() => {
      const selectedEvent = events[currentIndex]

      if (selectedEvent) {
        const content = selectedEvent.querySelector(".content")

        if (content) {
          content.classList.remove("card-enter")
        }
      }
    }, 1000)

    _setupListeners()
  }

  function _setupListeners() {
    prevBtn.addEventListener("click", () => {
      if (!isAnimating && currentIndex > 0) {
        _navigateTimeline(currentIndex - 1, false)
      }
    })

    nextBtn.addEventListener("click", () => {
      if (!isAnimating && currentIndex < events.length - 1) {
        _navigateTimeline(currentIndex + 1, false)
      }
    })

    events.forEach((event, index) => {
      const marker = event.querySelector(".dateMarker")

      if (marker) {
        marker.addEventListener("click", () => {
          if (!isAnimating) {
            _navigateTimeline(index, true)
          }
        })
      }
    })
  }

  function _navigateTimeline(targetIndex, selectEvent) {
    if (selectEvent && events[targetIndex].classList.contains("selected")) return
    if (targetIndex < 0 || targetIndex >= events.length) return
    if (isAnimating) return

    isAnimating = true

    const currentEvent = events[currentIndex]
    const targetEvent = events[targetIndex]
    const targetPos = parseFloat(targetEvent.style.left)
    const centerOffset = 50 - targetPos

    if (selectEvent) {
      const currentContent = currentEvent.querySelector(".content")
      const targetContent = targetEvent.querySelector(".content")

      if (currentContent) {
        currentContent.classList.remove("card-enter")
        currentContent.classList.add("card-exit")
      }

      setTimeout(() => {
        events.forEach(event => {
          const eventMarker = event.querySelector(".dateMarker")
          const eventLabel = event.querySelector(".dateLabel")
          const eventContent = event.querySelector(".content")

          event.classList.remove("selected")

        if (eventMarker) eventMarker.classList.remove("selected")
        if (eventLabel) eventLabel.classList.remove("selected")

        if (eventContent && event !== targetEvent) {
          eventContent.style.opacity = "0"
          eventContent.style.pointerEvents = "none"
        }
      }, 500)

      targetEvent.classList.add("selected")
      targetEvent.querySelector(".dateMarker")?.classList.add("selected")
      targetEvent.querySelector(".dateLabel")?.classList.add("selected")

      if (targetContent) {
        targetContent.style.opacity = "1"
        targetContent.style.pointerEvents = "auto"
        targetContent.classList.add("card-enter")
        targetContent.classList.remove("card-exit")
      }}
    )}

    const timelineTransition = "left 0.5s cubic-bezier(0.25, 0.1, 0.25, 1)"

    requestAnimationFrame(() => {
      events.forEach((event) => {
        const marker = event.querySelector(".dateMarker")
        const label = event.querySelector(".dateLabel")
        const currentPos = parseFloat(event.style.left)
        const newPos = currentPos + centerOffset

        event.style.transition = timelineTransition

        if (marker) marker.style.transition = timelineTransition
        if (label) label.style.transition = timelineTransition

        requestAnimationFrame(() => {
          event.style.left = `${newPos}%`

          if (marker) marker.style.left = `${newPos}%`
          if (label) label.style.left = `${newPos}%`
        })
      })

      currentIndex = targetIndex
      prevBtn.innerHTML = currentIndex === 0 ? "" : svgIcons.left
      nextBtn.innerHTML = currentIndex === events.length - 1 ? "" : svgIcons.right
      prevBtn.disabled = currentIndex === 0
      nextBtn.disabled = currentIndex === events.length - 1

      setTimeout(() => {
        events.forEach((event) => {
          const marker = event.querySelector(".dateMarker")
          const label = event.querySelector(".dateLabel")
          const content = event.querySelector(".content")

          event.style.transition = ""

          if (marker) marker.style.transition = ""
          if (label) label.style.transition = ""

          if (content) {
            content.classList.remove("card-exit")

            if (!event.classList.contains("selected")) {
              content.classList.remove("card-enter")
            }
          }
        })

        isAnimating = false
      }, 1000)
    })
  }

  function _handleScreenChange() {
    const newIsMobile = window.innerWidth < 650

    if (newIsMobile !== isMobile) {
      isMobile = newIsMobile
      _initializeTimeline()
    }
  }

  function _debounce(func, delay) {
    let timeout

    return function (...args) {
      const context = this
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(context, args), delay)
    }
  }

  resumeButton.addEventListener("click", function (e) {
    e.preventDefault()
    if (this.dataset.downloading) return

    const link = document.createElement("a")

    link.href = this.href
    link.download = "resumeSteveSchrader.pdf"
    this.dataset.downloading = "true"
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

    _thankYouBubble(this)
  })
}

async function block6Setup() {
  const form = document.querySelector(".contactForm")
  const inputFields = form.querySelectorAll('input[type="text"], input[type="email"], textarea')
  const submitButton = form.querySelector('button[type="submit"]')
  const currentYear = new Date().getFullYear()
  let isShowingErrors = false

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

    if (submitButton.disabled || isShowingErrors) return

    submitButton.disabled = true

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
      isShowingErrors = true
      _updateSubmitButton(false)
      submitButton.disabled = false

      setTimeout(() => {
        isShowingErrors = false
      }, 3000)
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
        _thankYouBubble(submitButton, "block6")

        this.reset()

        inputFields.forEach((field) => {
          field.classList.remove(
            "formContainer-field-valid",
            "formContainer-field-invalid",
            "border-light-successColour",
            "dark:border-dark-successColour",
            "border-light-alertColour",
            "dark:border-dark-alertColour"
          )
        })

        _updateSubmitButton(false)

        setTimeout(() => {
          submitButton.disabled = false
        }, 3000)
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      submitButton.disabled = false
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
          message = "Name cannot contain numbers and characters"
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
        bubbleClass += " error-name"
        break
      case "contactEmail":
        bubbleClass += " error-email"
        break
      case "contactMessage":
        bubbleClass += " error-message"
        break
    }

    bubble.className = bubbleClass

    const wrapper = field.closest('div[id$="Wrapper"]')

    wrapper.insertBefore(bubble, field)

    setTimeout(() => {
      bubble.classList.remove("animate-fadeIn")
      bubble.classList.add("animate-fadeOut")
      setTimeout(() => {
        bubble.remove()
        field.classList.remove("formContainer-field-invalid")
        field.value = ""
        _updateSubmitButton()
      }, 850)
    }, 2000)
  }

  document.querySelector("#copyDate").innerHTML = "&copySteve Schrader " + currentYear
}

function _thankYouBubble(buttonElement, source = "block5") {
  const bubbleContainer = document.createElement("div")
  const bubble = document.createElement("div")

  bubbleContainer.style.position = "relative"

  if (source == "block5") {
    bubbleContainer.style.left = "50%"
    bubbleContainer.style.transform = "translateX(-50%)"
  }

  bubble.className = "thank-you-bubble"

  if (source == "block6") {
    bubble.classList.add("thank-you-bubble-contact")
  }

  bubble.textContent = "Thank You!"

  buttonElement.parentNode.insertBefore(bubbleContainer, buttonElement.nextSibling)
  bubbleContainer.appendChild(bubble)

  bubble.addEventListener("animationend", () => bubbleContainer.remove())
}

/*
  TO-DO LIST:
    - Re-introduce sections. Focus on xs: sizing and up before moving to next
      : Overview
      : About
      : Studies
      : Projects
      : Employment

    - !!! Conflict between event listeners for Projects,
      and event listeners for Employment
    - thankYou bubble not displaying on resume download
    - !! Come up with a concept for Overview section !!
    - !! Optimize all images !!
*/
function init() {
  setViewingMode()
  initHamburger()

  if (!window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) {
    smoothScroll()
    navbarHide()
    scrollToTop()
    initGlitch()
    launchControl()
    block2Setup()
    block3Setup()
    block4Setup()
    block5Setup()
  }

  block6Setup()

  window.addEventListener("scroll", updateScrollProgress)
  updateScrollProgress()
}

window.onload = init
