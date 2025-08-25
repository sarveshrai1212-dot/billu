VanillaTilt.init(document.querySelector("#image-comparison-slider"), {
    max: 5,
    speed: 800,
    scale: 1.02
});


const slider = document.querySelector("#image-comparison-slider");
const sliderImgWrapper = document.querySelector("#image-comparison-slider .img-wrapper");
const sliderHandle = document.querySelector("#image-comparison-slider .handle");
const sliderPopup = document.querySelector("#image-comparison-slider .slider-popup"); // If you have a popup/tooltip element

let isDragging = false;

slider.addEventListener("mousedown", startDrag);
slider.addEventListener("touchstart", startDrag);
slider.addEventListener("mousemove", onDrag);
slider.addEventListener("touchmove", onDrag);
slider.addEventListener("mouseup", stopDrag);
slider.addEventListener("touchend", stopDrag);
slider.addEventListener("mouseleave", stopDrag);


function updateSlider(mouseX) {
    const sliderWidth = slider.clientWidth;
    const sliderHandleWidth = sliderHandle.clientWidth;
    if (mouseX < 0) mouseX = 0;
    else if (mouseX > sliderWidth) mouseX = sliderWidth;
    sliderImgWrapper.style.width = `${((1 - mouseX / sliderWidth) * 100).toFixed(4)}%`;
    sliderHandle.style.left = `calc(${((mouseX / sliderWidth) * 100).toFixed(4)}% - ${sliderHandleWidth / 2}px)`;
    // Always show popup/tooltip above handle, both desktop and mobile
    if (sliderPopup) {
        sliderPopup.style.display = 'block';
        sliderPopup.style.left = `calc(${((mouseX / sliderWidth) * 100).toFixed(4)}% - 50px)`;
        // Adjust -50px to half popup width for perfect centering
    }
}

function onDrag(event) {
    let mouseX;
    if (event.touches) {
        mouseX = event.touches[0].clientX - slider.offsetLeft;
    } else {
        mouseX = event.clientX - slider.offsetLeft;
    }
    if (!isDragging && event.type.startsWith('mouse')) return;
    updateSlider(mouseX);
}

function startDrag(event) {
    isDragging = true;
    onDrag(event);
    // Prevent scrolling on touch
    if (event.type === 'touchstart') event.preventDefault();
}

function stopDrag() {
    isDragging = false;
    // Do not hide popup, keep it visible always
}

// On load, set popup position to initial handle position
window.addEventListener('DOMContentLoaded', () => {
    const sliderWidth = slider.clientWidth;
    let startX = 0;
    let endX = sliderWidth / 2;
    let duration = 700; // ms
    let startTime = null;

    function animateSliderHandle(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentX = startX + (endX - startX) * progress;
        updateSlider(currentX);
        if (progress < 1) {
            requestAnimationFrame(animateSliderHandle);
        }
    }
    requestAnimationFrame(animateSliderHandle);
});
