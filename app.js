class Calculator {
  themes = [
    {
      name: "theme-1",
      bg: "hsl(222, 26%, 31%)",
      toggleBg: "hsl(223, 31%, 20%)",
      keypadBg: "hsl(223, 31%, 20%)",
      screenBg: "hsl(224, 36%, 15%)",
      baseKeyBg: "hsl(30, 25%, 89%)",
      baseKeyShadowBg: "hsl(28, 16%, 65%)",
      keyBg: "hsl(225, 21%, 49%)",
      keyShadowBg: "hsl(224, 28%, 35%)",
      equalKeyBg: "hsl(6, 63%, 50%)",
      equalKeyShadowBg: "hsl(6, 70%, 34%)",
      primaryTextColor: "hsl(0, 0%, 100%)",
      secondaryTextColor: "hsl(221, 14%, 31%)",
    },
    {
      name: "theme-2",
      bg: "hsl(0, 0%, 90%)",
      toggleBg: "hsl(0, 5%, 81%)",
      keypadBg: "hsl(0, 5%, 81%)",
      screenBg: "hsl(0, 0%, 93%)",
      baseKeyBg: "hsl(45, 7%, 89%)",
      baseKeyShadowBg: "hsl(35, 11%, 61%)",
      keyBg: "hsl(185, 42%, 37%)",
      keyShadowBg: "hsl(185, 58%, 25%)",
      equalKeyBg: "hsl(25, 98%, 40%)",
      equalKeyShadowBg: " hsl(25, 99%, 27%)",
      primaryTextColor: "hsl(60, 10%, 19%)",
      secondaryTextColor: "hsl(60, 10%, 19%)",
    },
    {
      name: "theme-3",
      bg: "hsl(268, 75%, 9%)",
      toggleBg: "hsl(268, 71%, 12%)",
      keypadBg: "hsl(268, 71%, 12%)",
      screenBg: "hsl(268, 71%, 12%)",
      baseKeyBg: "hsl(268, 47%, 21%)",
      baseKeyShadowBg: "hsl(290, 70%, 36%)",
      keyBg: "hsl(281, 89%, 26%)",
      keyShadowBg: "hsl(285, 91%, 52%)",
      equalKeyBg: "hsl(176, 100%, 44%)",
      equalKeyShadowBg: "hsl(177, 92%, 70%)",
      primaryTextColor: "hsl(52, 100%, 62%)",
      secondaryTextColor: "hsl(52, 100%, 62%)",
    },
  ];
  constructor(screenEl, keypadEl, themeToggleEl) {
    this.calcScreenEl = screenEl;
    this.keypadEl = keypadEl;
    this.themeToggleEl = themeToggleEl;
    this.total = 0;
    this.firstNumber = 0;
    this.secondNumber = 0;
    this.currentOperation = "add";
    this.currentTheme = this.themes[0];
    this.setupKeypayListener();
    this.setupThemeSwitcher();
  }

  setupThemeSwitcher() {
    this.themeToggleEl.addEventListener(
      "click",
      this.themeToggleHandler.bind(this)
    );
  }

  themeToggleHandler() {
    let themeNum = parseInt(this.currentTheme.name.slice(-1));
    let themeName = `theme-${themeNum}`;
    if (themeNum < 3) {
      themeName = `theme-${themeNum + 1}`;
      this.themeToggleEl
        .querySelector(`.theme-${themeNum + 1}`)
        .classList.toggle("visibility");
      this.themeToggleEl
        .querySelector(`.theme-${themeNum}`)
        .classList.toggle("visibility");
      for (let theme of this.themes) {
        if (theme.name === themeName) {
          this.applyTheme(theme);
        }
      }
    } else {
      themeName = `theme-1`;
      this.applyTheme(this.themes[0]);
      this.themeToggleEl
        .querySelector(".theme-3")
        .classList.toggle("visibility");
      this.themeToggleEl
        .querySelector(".theme-1")
        .classList.toggle("visibility");
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    const buttons = document.querySelectorAll("button");
    const buttonConfig = document.querySelectorAll(".button-config");
    const buttonEqual = document.querySelector(".equal");
    const calcScreen = document.querySelector(".calc__screen");
    const calcInput = document.querySelector(".calc__input");
    const body = document.querySelector("body");
    const themeToggle = document.querySelector(".theme__toggle");

    for (let button of buttons) {
      button.style.backgroundColor = theme.baseKeyBg;
      button.style.boxShadow = `inset 0px -4px 0px ${theme.baseKeyShadowBg}`;
    }

    for (let button of buttonConfig) {
      button.style.backgroundColor = theme.keyBg;
      button.style.boxShadow = `inset 0px -4px 0px ${theme.keyShadowBg}`;
    }

    body.style.backgroundColor = theme.bg;
    body.style.color = theme.primaryTextColor;

    themeToggle.style.backgroundColor = theme.toggleBg;
    buttonEqual.style.backgroundColor = theme.equalKeyBg;
    buttonEqual.style.boxShadow = `inset 0px -4px 0px ${theme.equalKeyShadowBg}`;
    calcScreen.style.backgroundColor = theme.screenBg;
    calcInput.style.backgroundColor = theme.keypadBg;
  }

  calcScreenHandler(text, reset = false) {
    const screenText = this.calcScreenEl.querySelector("#calc-screen-text");

    if (reset) {
      screenText.textContent = "0";
      return;
    } else if (screenText.textContent === "0") {
      screenText.textContent = text;
    } else {
      screenText.textContent = screenText.textContent + text;
    }
  }

  setupKeypayListener() {
    this.addKeyListener("one", this.printToScreenHandler.bind(this, "1"));
    this.addKeyListener("two", this.printToScreenHandler.bind(this, "2"));
    this.addKeyListener("three", this.printToScreenHandler.bind(this, "3"));
    this.addKeyListener("four", this.printToScreenHandler.bind(this, "4"));
    this.addKeyListener("five", this.printToScreenHandler.bind(this, "5"));
    this.addKeyListener("six", this.printToScreenHandler.bind(this, "6"));
    this.addKeyListener("seven", this.printToScreenHandler.bind(this, "7"));
    this.addKeyListener("eight", this.printToScreenHandler.bind(this, "8"));
    this.addKeyListener("nine", this.printToScreenHandler.bind(this, "9"));
    this.addKeyListener("zero", this.printToScreenHandler.bind(this, "0"));
    this.addKeyListener("point", this.printToScreenHandler.bind(this, "."));
    this.addKeyListener("equal", this.equalkeyHandler.bind(this));
    this.addKeyListener("addition", this.operatorKeyHandler.bind(this, "+"));
    this.addKeyListener("multiply", this.operatorKeyHandler.bind(this, "x"));
    this.addKeyListener("divide", this.operatorKeyHandler.bind(this, "/"));
    this.addKeyListener("subtract", this.operatorKeyHandler.bind(this, "-"));
    this.addKeyListener("reset", this.resetKeyHandler.bind(this));
    this.addKeyListener("del", this.deleteKeyHandler.bind(this));
  }

  addKeyListener(key, handler) {
    this.keypadEl.querySelector(`.${key}`).addEventListener("click", handler);
  }

  printToScreenHandler(output) {
    this.calcScreenHandler(output);
  }

  resetKeyHandler() {
    this.calcScreenHandler("0", true);
    this.firstNumber = 0;
    this.secondNumber = 0;
  }

  clearCalcScreen() {
    const screenText = this.calcScreenEl.querySelector("#calc-screen-text");
    screenText.textContent = "";
  }

  deleteKeyHandler() {
    const screenText = this.calcScreenEl.querySelector("#calc-screen-text");

    screenText.textContent = screenText.textContent.slice(0, -1);
    if (screenText.textContent === "") {
      screenText.textContent = "0";
    }
  }

  operatorKeyHandler(operation) {
    const screenText = this.calcScreenEl.querySelector("#calc-screen-text");
    screenText.textContent = screenText.textContent + operation;

    if (this.firstNumber === 0) {
      this.firstNumber = parseFloat(screenText.textContent);
      this.currentOperation = operation;
    }
  }

  equalkeyHandler() {
    const screenText = this.calcScreenEl.querySelector("#calc-screen-text");
    this.secondNumber = parseFloat(
      screenText.textContent.split(this.currentOperation)[1]
    );

    const result = this.performCalculation();
    screenText.textContent = result;
    this.firstNumber = 0;
    this.secondNumber = 0;
  }

  performCalculation() {
    if (this.currentOperation === "+") {
      return this.firstNumber + this.secondNumber;
    } else if (this.currentOperation === "-") {
      return this.firstNumber - this.secondNumber;
    } else if (this.currentOperation === "x") {
      return this.firstNumber * this.secondNumber;
    } else {
      return this.firstNumber / this.secondNumber;
    }
  }
}

const theme1 = {
  name: "theme-1",
  bg: "hsl(222, 26%, 31%)",
  toggleBg: "hsl(223, 31%, 20%)",
  keypadBg: "hsl(223, 31%, 20%)",
  screenBg: "hsl(224, 36%, 15%)",
  baseKeyBg: "hsl(30, 25%, 89%)",
  baseKeyShadowBg: "hsl(28, 16%, 65%)",
  keyBg: "hsl(225, 21%, 49%)",
  keyShadowBg: "hsl(224, 28%, 35%)",
  equalKeyBg: "hsl(6, 63%, 50%)",
  equalKeyShadowBg: "hsl(6, 70%, 34%)",
  primaryTextColor: "hsl(0, 0%, 100%)",
  secondaryTextColor: "hsl(221, 14%, 31%)",
};

const theme2 = {
  name: "theme-2",
  bg: "hsl(0, 0%, 90%)",
  toggleBg: "hsl(0, 5%, 81%)",
  keypadBg: "hsl(0, 5%, 81%)",
  screenBg: "hsl(0, 0%, 93%)",
  baseKeyBg: "hsl(45, 7%, 89%)",
  baseKeyShadowBg: "hsl(35, 11%, 61%)",
  keyBg: "hsl(185, 42%, 37%)",
  keyShadowBg: "hsl(185, 58%, 25%)",
  equalKeyBg: "hsl(25, 98%, 40%)",
  equalKeyShadowBg: " hsl(25, 99%, 27%)",
  primaryTextColor: "hsl(0, 0%, 100%)",
  secondaryTextColor: "hsl(60, 10%, 19%)",
};

const theme3 = {
  name: "theme-3",
  bg: "hsl(268, 75%, 9%)",
  toggleBg: "hsl(268, 71%, 12%)",
  keypadBg: "hsl(268, 71%, 12%)",
  screenBg: "hsl(268, 71%, 12%)",
  baseKeyBg: "hsl(268, 47%, 21%)",
  baseKeyShadowBg: "hsl(290, 70%, 36%)",
  keyBg: "hsl(281, 89%, 26%)",
  keyShadowBg: "hsl(285, 91%, 52%)",
  equalKeyBg: "hsl(176, 100%, 44%)",
  equalKeyShadowBg: "hsl(177, 92%, 70%)",
  primaryTextColor: "hsl(0, 0%, 100%)",
  secondaryTextColor: "hsl(52, 100%, 62%)",
};

new Calculator(
  document.querySelector(".calc__screen"),
  document.querySelector(".calc__input"),
  document.querySelector(".theme__toggle"),
  theme1
);
