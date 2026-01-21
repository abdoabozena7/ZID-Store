const directions = ['top', 'right', 'bottom', 'left'];
let density = 3;
let distance = 0;
let speed = 180;
let isPaused = false;
const images = Array.from({ length: 20 }, (_, i) => `Assets/images/${i + 1}.png`);
const allGridElements = [];
let intervalId;

function preloadImages(srcArray, callback) {
  let loaded = 0;
  srcArray.forEach((src) => {
    const img = new Image();
    img.onload = () => {
      loaded++;
      if (loaded === srcArray.length) callback();
    };
    img.onerror = () => {
      loaded++;
      if (loaded === srcArray.length) callback();
    };
    img.src = src;
  });
}

function renderWalls() {
  const gridContainer = document.querySelector('.cubic-bg');
  if (!gridContainer) return;
  gridContainer.style.setProperty('--grid-sz', density);
  gridContainer.style.setProperty('--rev-dis', distance);

  allGridElements.length = 0;

  directions.forEach((dir) => {
    const parent = document.querySelector(`.cubic-bg .${dir}`);
    if (!parent) return;

    parent.innerHTML = '';
    const total = density * density;

    for (let i = 1; i <= total; i++) {
      const div = document.createElement('div');
      div.classList.add(`${dir.charAt(0)}${i}`);
      parent.appendChild(div);
      allGridElements.push(div);
    }
  });

  startImageInterval();
}

function startImageInterval() {
  if (intervalId) clearInterval(intervalId);

  let loadedCount = 0;
  const totalElementsToLoad = allGridElements.length;

  intervalId = setInterval(() => {
    if (isPaused) return;

    const unloadedElements = allGridElements.filter((el) => !el.classList.contains('loaded'));
    if (unloadedElements.length === 0) return;

    const randomElement = unloadedElements[Math.floor(Math.random() * unloadedElements.length)];
    const randomImage = images[Math.floor(Math.random() * images.length)];

    randomElement.style.backgroundImage = `url('${randomImage}')`;
    randomElement.classList.add('loaded');
    loadedCount++;

    if (loadedCount >= totalElementsToLoad) {
      clearInterval(intervalId);
    }
  }, speed);
}

function bootCubicBg() {
  preloadImages(images, renderWalls);
}

document.addEventListener('DOMContentLoaded', bootCubicBg);
