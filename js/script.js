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
  // document.querySelectorAll('a[href^="#"]').forEach((section) => {
  document.querySelectorAll('a[href^="#content"]').forEach((section) => {
    section.addEventListener("click", function (e) {
      // if (section.getAttribute("href").startsWith("#event-")) {
      //   return
      // }

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

    // if (prevScrollPos > currentScrollPos) {
    if (prevScrollPos == currentScrollPos) {
      document.querySelector("nav").style.top = "0"
    } else {
      document.querySelector("nav").style.top = "-5rem"
    }

    clearTimeout(isScrolling)

    isScrolling = setTimeout(() => {
      document.querySelector("nav").style.top = "0"
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

function initGlitching() {
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
    let count = 0

    const intervalId = setInterval(() => {
      animationFrameId = requestAnimationFrame(() => {
        const elementRect = element.getBoundingClientRect()
        const maxSkew = Math.min(20, elementRect.width / 20)
        const skew = Math.random() * maxSkew - maxSkew / 2
        const top1 = Math.random() * 100
        const btm1 = Math.random() * 100
        const top2 = Math.random() * 100
        const btm2 = Math.random() * 100
        let scale = 1

        const translateAmount = Math.min(0.025, elementRect.width / 1000)
        const before = element.querySelector(".glitch-before")
        const after = element.querySelector(".glitch-after")

        element.style.transform = `skew(${skew}deg) scale(${scale})`

        if (before && after) {
          before.style.clipPath = `polygon(0 ${top1}%, 100% ${top1}%, 100% ${btm1}%, 0 ${btm1}%)`
          before.style.transform = `translate(${translateAmount}em, ${translateAmount}em)`

          after.style.clipPath = `polygon(0 ${top2}%, 100% ${top2}%, 100% ${btm2}%, 0 ${btm2}%)`
          after.style.transform = `translate(-${translateAmount}em, -${translateAmount}em)`
        }

        count++
        if (count % 15 === 0) {
          const bigSkew = Math.random() * 180 - 90

          element.style.transform = `skew(${bigSkew}deg) scale(${scale})`
        }
        if (count % 30 === 0) {
          scale = 1 + Math.random() / 2
          element.style.transform = `skew(${skew}deg) scale(${scale})`
        }
      })
    }, 100)

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
}

function block3Setup() {
  // Get screenwidth and adapt widget display to match
}

function block4Setup() {
  // Get screenwidth and adapt widget display to match
}

function block5Setup() {
  // Get screenwidth and adapt widget display to match
  // Can use vertical timeline for mobile displays
}

async function block6Setup() {
  // Default functionality required for non-JS browsers
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
    - Add sections back in. Focus on xs: sizing and up
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
    initGlitching()
    launchControl()
    // block2Setup()
    // block3Setup()
    // block4Setup()
    // block5Setup()
  }

  block6Setup()

  window.addEventListener("scroll", updateScrollProgress)
  updateScrollProgress()
}

window.onload = init
