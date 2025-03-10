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
        // let scale = 1

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
  // Get screenwidth and adapt widget display to match
}

function block4Setup() {
  // Get screenwidth and adapt widget display to match
}

// function _adjustTimelineWidth() {
//   const prevWidth = prevBtn.offsetWidth
//   const nextWidth = nextBtn.offsetWidth
//   const totalButtonWidth = prevWidth + nextWidth

//   timeline.style.width = `calc(100% - ${totalButtonWidth}px)`
//   timeline.style.margin = `0 ${prevWidth}px`
// }
function block5Setup() {
  const timeline = document.querySelector("#block5 #timeline")
  const historyLine = document.querySelector("#block5 #historyLine")
  const prevBtn = document.querySelector("#block5 .prev")
  const nextBtn = document.querySelector("#block5 .next")
  const dateLinks = document.querySelectorAll("#block5 #dates a")
  const datesContainer = document.querySelector("#block5 #dates")
  const eventsContainer = document.querySelector("#block5 #eventsContainer")
  const selectedElement = document.querySelector("#block5 #dates .selected")
  const resumeButton = document.querySelector("#block5 #resumeDownloadButton")

  const startIndex = selectedElement
    ? parseInt(selectedElement.closest("a").getAttribute("href").split("-")[1])
    : 1

  const svgIcons = {
    left: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2" class="text-light-alertColour dark:text-dark-alertColour bg-light-sectionBackColour dark:bg-dark-sectionBackColour"><path d="M20 9l-7 7 7 7M13 9l-7 7 7 7"/></svg>`,
    right: `<svg width="34" height="34" viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="2" class="text-light-alertColour dark:text-dark-alertColour bg-light-sectionBackColour dark:bg-dark-sectionBackColour"><path d="M14 9l7 7-7 7M21 9l7 7-7 7"/></svg>`,
  }

  let isMobile = window.innerWidth < 650
  let currentIndex = 1
  let isAnimating = false
  let currentCard = null
  let markers = null
  let positions = null
  let events = null

  _initializeTimeline()
  window.addEventListener("resize", _debounce(_handleScreenChange, 250))

  function _initializeTimeline() {
    if (window.timelineObserver) {
      window.timelineObserver.disconnect()
      window.timelineObserver = null
    }

    const eventCards = document.querySelectorAll("#block5 #eventsContainer li")

    eventCards.forEach((card) => {
      card.classList.remove("enter-left", "enter-right", "exit-left", "exit-right")
    })

    _setupDateMarkers()
    _calculatePositions()

    events = Array.from(eventsContainer.querySelectorAll("li[data-date]")).slice(1, -1)

    if (isMobile) {
      _displayVerticalTimeline()
    } else {
      _displayHorizontalTimeline()
    }
  }

  function _setupDateMarkers() {
    dateLinks.forEach((link) => {
      if (link.textContent) {
        const marker = document.createElement("div")
        const label = document.createElement("span")

        marker.className = link.classList.contains("selected")
          ? "date-marker selected"
          : "date-marker"
        label.className = link.classList.contains("selected") ? "date-label selected" : "date-label"
        label.textContent = link.textContent
        link.textContent = ""
        link.appendChild(label)
        link.appendChild(marker)
      }
    })

    markers = document.querySelectorAll("#block5 .date-marker")

    return markers
  }

  function _calculatePositions() {
    const dates = Array.from(dateLinks)
    const startDate = new Date(dates[0].dataset.date.split("/").reverse().join("-"))
    const endDate = new Date(dates[dates.length - 1].dataset.date.split("/").reverse().join("-"))
    const timespan = endDate - startDate

    positions = dates.map((date) => {
      const currentDate = new Date(date.dataset.date.split("/").reverse().join("-"))
      const position = ((currentDate - startDate) / timespan) * (isMobile ? 90 : 400)

      if (isMobile) {
        date.parentElement.style.top = `${position}%`
        date.parentElement.style.left = ""
        date.parentElement.style.right = "-2rem"

        const label = date.querySelector(".date-label")

        if (label) {
          label.style.top = "100%"
          label.style.left = "-2.5rem"
          label.style.marginTop = "0.25rem"
          label.style.transform = "none"
        }
      } else {
        date.parentElement.style.left = `${position}%`
        date.parentElement.style.top = ""
        date.parentElement.style.right = ""
      }

      return position
    })

    return positions
  }

  function _displayVerticalTimeline() {
    eventsContainer.classList.remove("hidden")

    events.forEach((event, index) => {
      const marker = markers[index]

      if (!marker) return

      const markerTop = marker.closest("li").style.top

      event.style.cssText = `
        position: absolute !important;
        top: ${markerTop} !important;
        left: 80px !important;
        width: calc(100% - 100px) !important;
        display: block !important;
        z-index: 100 !important;
      `
      const content = event.querySelector(".content");

      if (content) {
        content.style.cssText = `
          opacity: 1 !important;
          transform: none !important;
          display: block !important;
          max-width: 100% !important;
        `;
      }

      console.log(`Setting event ${index} to match marker position ${markerTop}`)
    })

    const observerOptions = {
      root: null,
      threshold: 0.9,
      rootMargin: "-40% 0px -40% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const markerIndex = Array.from(markers).indexOf(entry.target)
        const event = events[markerIndex]

        if (!event) return

        const eventCard = event.querySelector(".content")

        if (entry.isIntersecting) {
          eventCard.classList.remove("exit-left")
          eventCard.classList.add("enter-left")
        } else {
          eventCard.classList.remove("enter-left")
          eventCard.classList.add("exit-left")
        }
      })
    }, observerOptions)

    window.timelineObserver = observer

    markers.forEach((marker) => {
      observer.observe(marker)
    })

    const resizeHandler = _debounce(() => {
      if (window.innerWidth >= 650) {
        eventsContainer.classList.add("hidden")
        // Reset inline styles when switching to horizontal
        events.forEach((event) => {
          event.style.cssText = ""
          const content = event.querySelector(".content")
          if (content) {
            content.style.cssText = ""
          }
        })
      }
    }, 250)

    window.addEventListener("resize", resizeHandler)
  }

  function _displayHorizontalTimeline() {
    _setupEventListeners()
    _updateUI(parseInt(startIndex))
    _initializeEventCard()
  }

  function _updateUI(index, source = "init") {
    if (isAnimating) return

    const transform = -positions[index] + 50

    isAnimating = true

    if (!isMobile) {
      // Large screen
      historyLine.style.transform = `translateX(${transform}%)`
    } else {
      // Small screen
      historyLine.style.transform = "none"
    }

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

    if (!isMobile) {
      prevBtn.innerHTML = index === 1 ? "" : svgIcons.left
      nextBtn.innerHTML = index === 9 ? "" : svgIcons.right
      prevBtn.disabled = index === 1
      nextBtn.disabled = index === 9
    }

    setTimeout(() => (isAnimating = false), 500)
    currentIndex = index
  }

  function _handleEventCardAnimation(index) {
    const eventTemplate = document.querySelector(`#block5 #eventsContainer #event-${index}`)
    const cardContainer = document.querySelector("#block5 #eventCardContainer")

    if (!eventTemplate) return

    const newCard = eventTemplate.cloneNode(true)

    if (currentCard?.dataset?.date === newCard.dataset.date) return

    const animateSequence = async () => {
      if (currentCard) {
        currentCard.classList.remove("card-enter")
        currentCard.classList.add("card-exit")
        await new Promise((resolve) => setTimeout(resolve, 500))
        currentCard.remove()
      }

      cardContainer.appendChild(newCard)
      newCard.classList.add("card-enter")
      currentCard = newCard
    }

    animateSequence()
  }

  function _initializeEventCard() {
    const selectedDateLink = document.querySelector("#block5 #dates .selected")

    if (!selectedDateLink) return

    const index = parseInt(selectedDateLink.closest("a").getAttribute("href").split("-")[1])

    _handleEventCardAnimation(index)
  }

  function _setupEventListeners() {
    timeline.addEventListener("click", (e) => {
      const prevBtn = e.target.closest(".prev")
      const nextBtn = e.target.closest(".next")

      if (prevBtn && currentIndex > 1) {
        _updateUI(currentIndex - 1, "navigation")
      } else if (nextBtn && currentIndex < 9) {
        _updateUI(currentIndex + 1, "navigation")
      }
    })

    datesContainer.addEventListener("click", (e) => {
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

  function _handleScreenChange() {
    isMobile = window.innerWidth < 650
    _initializeTimeline()
  }

  function _debounce(func, delay) {
    let timeout

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }

      clearTimeout(timeout)
      timeout = setTimeout(later, delay)
    }
  }

  resumeButton.addEventListener("click", function (e) {
    e.preventDefault()
    if (this.dataset.downloading) return

    // this.dataset.downloading = "true"
    // _thankYouBubble(this)

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

// Check for appearance of bubble over different-sized devices
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
      : Studies
      : Projects

      : Employment

    - TextShadows have been removed. Revisit wavy bottoms to text_blocks.
    - !! Come up with a concept for Overview section !!
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
    // block3Setup()
    // block4Setup()
    block5Setup()
  }

  block6Setup()

  window.addEventListener("scroll", updateScrollProgress)
  updateScrollProgress()
}

window.onload = init
