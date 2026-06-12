const packageSelect = document.querySelector("#package");
const guestsSelect = document.querySelector("#guests");
const dateInput = document.querySelector("#date");
const quoteButton = document.querySelector("#quoteButton");
const quotePrice = document.querySelector("#quotePrice");
const quoteText = document.querySelector("#quoteText");
const productCards = Array.from(document.querySelectorAll(".product-card"));
const productImages = Array.from(document.querySelectorAll(".product-visual-image"));
const productCaption = document.querySelector("#productCaption");
const routeCards = Array.from(document.querySelectorAll(".route-list article"));
const routeImages = Array.from(document.querySelectorAll(".route-visual-image"));
const routeCaption = document.querySelector("#routeCaption");
const opsCards = Array.from(document.querySelectorAll(".ops-grid article"));
const opsImages = Array.from(document.querySelectorAll(".ops-visual-image"));
const opsCaption = document.querySelector("#opsCaption");
const staySlides = Array.from(document.querySelectorAll(".stay-slide"));
const stayDots = Array.from(document.querySelectorAll(".stay-dots button"));

let activeRouteStep = 0;
let routeCarouselTimer;
let activeOpsStep = 0;
let opsCarouselTimer;
let activeStaySlide = 0;
let stayCarouselTimer;

const productCopy = {
  ticket: "早鸟单人夜游票，适合先锁定七夕主题周名额，含入园夜游与基础打卡动线。",
  pair: "双人产品，适合情侣或闺蜜，含花笺互动、指定打卡点与预约核销。",
  family: "家庭周末套餐，适合亲子白天加傍晚入园，现场需按餐位与游玩项目确认。",
  group: "团建/生日咨询金，作为预约锁档使用，最终方案按人数、餐饮和布置另行确认。"
};

function showProductVisual(index) {
  productCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === index);
  });

  productImages.forEach((image, imageIndex) => {
    image.classList.toggle("is-active", imageIndex === index);
  });

  if (productCards[index] && productCaption) {
    productCaption.textContent = productCards[index].dataset.caption;
  }
}

function showRouteStep(index) {
  activeRouteStep = (index + routeCards.length) % routeCards.length;

  routeCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === activeRouteStep);
  });

  routeImages.forEach((image, imageIndex) => {
    image.classList.toggle("is-active", imageIndex === activeRouteStep);
  });

  if (routeCards[activeRouteStep] && routeCaption) {
    routeCaption.textContent = routeCards[activeRouteStep].dataset.caption;
  }
}

function startRouteCarousel() {
  if (routeCards.length < 2) {
    return;
  }

  window.clearInterval(routeCarouselTimer);
  routeCarouselTimer = window.setInterval(() => {
    showRouteStep(activeRouteStep + 1);
  }, 4600);
}

function showOpsStep(index) {
  activeOpsStep = (index + opsCards.length) % opsCards.length;

  opsCards.forEach((card, cardIndex) => {
    card.classList.toggle("is-active", cardIndex === activeOpsStep);
  });

  opsImages.forEach((image, imageIndex) => {
    image.classList.toggle("is-active", imageIndex === activeOpsStep);
  });

  if (opsCards[activeOpsStep] && opsCaption) {
    opsCaption.textContent = opsCards[activeOpsStep].dataset.caption;
  }
}

function startOpsCarousel() {
  if (opsCards.length < 2) {
    return;
  }

  window.clearInterval(opsCarouselTimer);
  opsCarouselTimer = window.setInterval(() => {
    showOpsStep(activeOpsStep + 1);
  }, 5000);
}

function showStaySlide(index) {
  activeStaySlide = (index + staySlides.length) % staySlides.length;

  staySlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeStaySlide);
  });

  stayDots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeStaySlide;
    dot.classList.toggle("is-active", isActive);
    dot.setAttribute("aria-current", isActive ? "true" : "false");
  });
}

function startStayCarousel() {
  if (staySlides.length < 2) {
    return;
  }

  window.clearInterval(stayCarouselTimer);
  stayCarouselTimer = window.setInterval(() => {
    showStaySlide(activeStaySlide + 1);
  }, 5200);
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
dateInput.min = formatLocalDate(tomorrow);
dateInput.value = formatLocalDate(tomorrow);

function getPackageUnits(type, guests) {
  if (type === "ticket") {
    return guests;
  }

  if (type === "pair") {
    return Math.ceil(guests / 2);
  }

  if (type === "family") {
    return Math.ceil(guests / 4);
  }

  return Math.max(1, Math.ceil(guests / 20));
}

function updateQuote() {
  const option = packageSelect.options[packageSelect.selectedIndex];
  const base = Number(packageSelect.value);
  const type = option.dataset.type;
  const guests = Number(guestsSelect.value);
  const units = getPackageUnits(type, guests);
  const total = base * units;
  const tentName = option.text;

  quotePrice.textContent = `¥${total.toLocaleString("zh-CN", {
    minimumFractionDigits: total % 1 === 0 ? 0 : 1,
    maximumFractionDigits: 1
  })}`;
  quoteText.textContent = `${tentName}，${guests}人到访。${productCopy[type]}`;
}

packageSelect.addEventListener("change", updateQuote);
guestsSelect.addEventListener("change", updateQuote);
quoteButton.addEventListener("click", updateQuote);
productCards.forEach((card, index) => {
  card.addEventListener("click", () => showProductVisual(index));
  card.addEventListener("mouseenter", () => showProductVisual(index));
  card.addEventListener("focus", () => showProductVisual(index));
});
routeCards.forEach((card, index) => {
  const activateRouteStep = () => {
    showRouteStep(index);
    startRouteCarousel();
  };

  card.addEventListener("click", activateRouteStep);
  card.addEventListener("mouseenter", activateRouteStep);
  card.addEventListener("focus", activateRouteStep);
});
opsCards.forEach((card, index) => {
  const activateOpsStep = () => {
    showOpsStep(index);
    startOpsCarousel();
  };

  card.addEventListener("click", activateOpsStep);
  card.addEventListener("mouseenter", activateOpsStep);
  card.addEventListener("focus", activateOpsStep);
});
stayDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showStaySlide(index);
    startStayCarousel();
  });
});

updateQuote();
showProductVisual(0);
showRouteStep(0);
startRouteCarousel();
showOpsStep(0);
startOpsCarousel();
showStaySlide(0);
startStayCarousel();
