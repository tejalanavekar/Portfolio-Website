/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
// Grab links & sections
const navLinks = Array.from(document.querySelectorAll('.nav__menu a[href^="#"]'));
const sections = Array.from(document.querySelectorAll('section[id]'));

function setActive(id) {
  navLinks.forEach(a => a.classList.remove('active-link'));
  const link = document.querySelector(`.nav__menu a[href="#${id}"]`);
  link?.classList.add('active-link');
}

// IntersectionObserver
const io = new IntersectionObserver((entries) => {
  let mostVisible = null;

  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Always prioritize Contact if it’s visible
      if (entry.target.id === "contact") {
        mostVisible = entry;
      } else if (
        !mostVisible ||
        entry.intersectionRatio > mostVisible.intersectionRatio
      ) {
        mostVisible = entry;
      }
    }
  });

  if (mostVisible) setActive(mostVisible.target.id);
}, {
  root: null,
  rootMargin: "-120px 0px -20% 0px", // top offset for header, bottom tightened
  threshold: [0.1, 0.25, 0.5, 0.75, 1]
});

sections.forEach(sec => io.observe(sec));

// Immediate highlight on click
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(a => a.classList.remove("active-link"));
    link.classList.add("active-link");
  });
});


/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});


/*===== PROJECT CARDS TOGGLE =====*/
document.querySelectorAll('[data-project]').forEach(card => {
  const btn = card.querySelector('.project-card__summary');
  const content = card.querySelector('.project-card__content');

  btn.addEventListener('click', () => {
    const isOpen = card.classList.toggle('is-open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    // show/hide for screen readers
    if (isOpen) content.removeAttribute('hidden');
    else content.setAttribute('hidden', '');
  });
});

/*===== EDUCATION BUTTON =====*/

document.querySelectorAll('.education-card__summary').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', !expanded);

    const content = button.nextElementSibling;
    content.hidden = expanded;
  });
});

/*===== CONTACT FORM =====*/

const form   = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();                    // stop page navigation
  status.textContent = 'Sending…';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      form.reset();
      status.style.color = '#2e7d32';
      status.textContent = 'Thanks! Your message was sent.';
    } else {
      status.style.color = '#c62828';
      status.textContent = 'Oops—something went wrong.';
    }
  } catch (err) {
    status.style.color = '#c62828';
    status.textContent = 'Network error. Please try again later.';
  }
});



sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
