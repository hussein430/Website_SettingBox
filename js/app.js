"use strict";

// Setting Box 

// Selectors
const settingBox = document.querySelector(".setting-box");
const toggleSetting = document.querySelector(".toggle-setting");
const gearIcon = document.querySelector(".toggle-setting .fa-gear");
const colorItems = document.querySelectorAll(".colors-list li");
const randomBackgroundEl = document.querySelectorAll(".random-background span");

// Show the setting box
toggleSetting.addEventListener("click", function () {
  settingBox.classList.toggle("open");
  gearIcon.classList.toggle("fa-spin");
});

// Change the main color of the page

// Save the color option to the local storage
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);

  // add the active class for the selected color
  colorItems.forEach((item) => {
    item.classList.remove("active");
    if (item.dataset.color === mainColor) {
      item.classList.add("active");
    }
  });
}

// Function to change the color of the entire page

colorItems.forEach((item) => {
  item.addEventListener("click", function () {
    // Get the data-color attribute
    const newColor = item.getAttribute("data-color");

    // Set the --main-color variable to the selected color
    document.documentElement.style.setProperty("--main-color", newColor);

    // Save the color to the local storage
    localStorage.setItem("color-option", newColor);

    // Remove 'active' class from all items and add it to the clicked item
    colorItems.forEach((li) => li.classList.remove("active"));
    item.classList.add("active");
  });
});


// Turn on/off the auto background change
// Random Background Option
let backgroundOption = true;

// Remove 'active' class from all spans
randomBackgroundEl.forEach((el) => el.classList.remove("active"));

randomBackgroundEl.forEach((span) => {
  span.addEventListener("click", () => {
    // Remove 'active' class from all spans
    randomBackgroundEl.forEach((el) => el.classList.remove("active"));

    // Add 'active' class to the clicked span
    span.classList.add("active");

    // Get the selected option (yes or no)
    let option = span.dataset.background;

    // Update backgroundOption based on selection
    backgroundOption = option === "yes";

    // Save the background option in localStorage
    localStorage.setItem("background-option", backgroundOption);
  });
});

// Retrieve and apply the background option from localStorage on page load
let savedBackgroundOption = localStorage.getItem("background-option");
if (savedBackgroundOption !== null) {
  backgroundOption = savedBackgroundOption === "true";

  // Set the active class based on the saved setting
  if (backgroundOption) {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
} else{
  document.querySelector(".random-background .yes").classList.add("active");
}

/////////////////////////////////////////////////////////////////////////////////////////
// The Bullets 

// Select all the bullets
const allBullets = document.querySelectorAll('.nav-bullets .bullet');


allBullets.forEach(bullet => {
  bullet.addEventListener("click", (e)=>{
    document.querySelector(`.${e.target.dataset.section}`).scrollIntoView({
      behavior: "smooth"
    })
  })
})

/////////////////////////////////////////////////////////////////////////////////////////

// Random Header Imgs
const introductionImage = document.querySelector(".landing-page");

// Get the images
const images = [
  "./imgs/header1.jpg",
  "./imgs/header2.jpg",
  "./imgs/header3.jpg",
  "./imgs/header4.jpg",
];

// Change the images on the heading

// Set the initial background image
introductionImage.style.backgroundImage = `url('${images[0]}')`;

let currentIndex = 0;
function changeImage() {
  if (backgroundOption === true) {
    currentIndex = (currentIndex + 1) % images.length;
  }
  introductionImage.style.backgroundImage = `url('${images[currentIndex]}')`;
}

setInterval(changeImage, 4000);

/////////////////////////////////////////////////////////////////////////////////////////

// Select the skills section
let ourSkills = document.querySelector(".skills");
let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

// Debounce Scroll Event using requestAnimationFrame
let isScrolling = false;

function handleScroll() {
  if (isScrolling) return;
  isScrolling = true;

  window.requestAnimationFrame(() => {
    let skillsOffsetTop = ourSkills.offsetTop;
    let skillsOuterHeight = ourSkills.offsetHeight;
    let windowHeight = window.innerHeight;
    let windowScrollTop = window.scrollY;

    // Trigger skill animation when the section is in view
    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
      allSkills.forEach(skill => {
        skill.style.width = skill.dataset.progress;
      });
    }

    isScrolling = false;
  });
}

window.addEventListener("scroll", handleScroll);

// Trigger skill animation when the page is loaded and section is in view
document.addEventListener("DOMContentLoaded", handleScroll);


/////////////////////////////////////////////////////////////////////////////////////////

// Create popup with the image
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");

    // Add class to overlay
    overlay.className = "popup-overlay";

    // Append overlay to the body
    document.body.appendChild(overlay);

    // Create the popup box
    let popupBox = document.createElement("div");

    // Add Class the popup box
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Text for heading
      let imgText = document.createTextNode(img.alt);

      // Append the text to the heading
      imgHeading.appendChild(imgText);

      // Append the text to the popup box
      popupBox.appendChild(imgHeading);
    }

    // Create the image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = img.src;

    // Add image to popup box
    popupBox.appendChild(popupImage);

    // Append the popup box to the body
    document.body.appendChild(popupBox);

    // Create the close span
    let closeButton = document.createElement("span");

    // Create The Close Button Text
    let closeButtonText = document.createTextNode("X");

    // Append the close button text to the close span
    closeButton.appendChild(closeButtonText);

    // Add class to the close button
    closeButton.className = "close-button";

    // Add close button to the popup box
    popupBox.appendChild(closeButton);
  });
});

// Close the popup
document.addEventListener("click", (e) => {
  if (e.target.className == "close-button") {
    // Remove the popup box
    e.target.parentNode.remove();

    // Remove the overlay
    document.querySelector(".popup-overlay").remove();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////

// Show and hide the bullets
let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsContainer = document.querySelector('.nav-bullets');

// Load saved setting from localStorage
let savedDisplay = localStorage.getItem('bulletsDisplay');
if (savedDisplay) {
  bulletsContainer.style.display = savedDisplay === 'show' ? 'block' : 'none';
  bulletsSpan.forEach(span => {
    span.classList.toggle('active', span.dataset.display === savedDisplay);
  });
}

bulletsSpan.forEach(span => {
  span.addEventListener("click", (e) => {
    let displaySetting = span.dataset.display;
    bulletsContainer.style.display = displaySetting === 'show' ? 'block' : 'none';

    // Save the setting to localStorage
    localStorage.setItem('bulletsDisplay', displaySetting);

    bulletsSpan.forEach(s => s.classList.remove('active'));
    span.classList.add('active');
  });
});


/////////////////////////////////////////////////////////////////////////////////////////
// Reset Button
document.querySelector('.reset_options').onclick = function(){
  localStorage.clear();  
  window.location.reload();
}


/////////////////////////////////////////////////////////////////////////////////////////
// Toggle menu for the navbar
const toggle = document.querySelector('.toggle-menu');
const links = document.querySelector('.links');

function closeMenuOnClickOutside(event) {
  if (!toggle.contains(event.target) && !links.contains(event.target)) {
    toggle.classList.remove('active');
    links.classList.remove('open');

    window.removeEventListener('click', closeMenuOnClickOutside);
  }
}

toggle.addEventListener('click', (e) => {
  toggle.classList.toggle('active');
  links.classList.toggle('open');

  if (toggle.classList.contains('active') && links.classList.contains('open')) {
    window.addEventListener('click', closeMenuOnClickOutside);
  }
});
