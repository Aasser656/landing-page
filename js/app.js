/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
 let d = document.createDocumentFragment();
 let menu = document.getElementById("navbar__list");
 let sections = Array.from(document.querySelectorAll("section"));
 
 
 /**
  * End Global Variables
  * Start Helper Functions
  * 
  */
 function isInViewport(el) {
     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
         const {
             top,
             bottom
         } = el.getBoundingClientRect();
         const elHeight = (window.innerHeight || document.documentElement.clientHeight);
 
         return (
             (top > 0 || bottom > 0) &&
             top < elHeight
         );
     } else {
         const rect = el.getBoundingClientRect();
         return (
             rect.top >= 0 &&
             rect.left >= 0 &&
             rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
             rect.right <= (window.innerWidth || document.documentElement.clientWidth)
         );
     }
 }
 
 
 
 /**
  * End Helper Functions
  * Begin Main Functions
  * 
  */
 
 // build the nav
 for (section of sections) {
     let secData = section.getAttribute("data-nav");
     let secId = section.getAttribute("id");
     let li = document.createElement("li");
     let a = document.createElement("a");
     a.classList.add("menu__link");
     a.setAttribute("data-nav", secId);
     a.append(secData);
     li.append(a);
     d.appendChild(li);
 }
 
 
 // Add class 'active' to section when near top of viewport
 function activeClass() {
     for (let i = 0; i < sections.length; i++) {
         if (isInViewport(sections[i])) {
             sections[i].classList.add("your-active-class");
         } else {
             sections[i].classList.remove("your-active-class");
         }
     }
 }
 // Scroll to anchor ID using scrollTO event
 
 
 /**
  * End Main Functions
  * Begin Events
  * 
  */
 document.addEventListener("scroll", function() {
     activeClass();
 })
 // Build menu 
 menu.appendChild(d);
 // Scroll to section on link click
 const links = document.querySelectorAll(".menu__link");
 links.forEach((item) => {
     item.addEventListener("click", () => {
         let el = document.getElementById(item.getAttribute("data-nav"));
         el.scrollIntoView({
             behavior: "smooth",
             block: "center"
         });
     })
 })
 // Set sections as active
