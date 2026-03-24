import AOS from 'aos';

export function initCommon() {
  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
    // Fallback if load already happened
    if (document.readyState === 'complete') {
      preloader.remove();
    }
  }

  // Mobile nav toggle
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function (event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.body.classList.toggle('mobile-nav-active');
    mobileNavShow?.classList.toggle('d-none');
    mobileNavHide?.classList.toggle('d-none');
  }

  // Active link state
  let currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if (currentPath === '') currentPath = 'index.html';

  const pageTitles = {
    'index.html': 'Home',
    'technology.html': 'Technology',
    'agriculture.html': 'Agriculture',
    'education.html': 'Education',
    'energy.html': 'Energy',
    'real-estate.html': 'Real Estate',
    'about.html': 'About Us',
    'contact.html': 'Contact'
  };

  if (pageTitles[currentPath]) {
    document.title = `Welcome to BOU - ${pageTitles[currentPath]}`;
  } else {
    document.title = 'Welcome to BOU';
  }

  document.querySelectorAll('#navbar ul li a').forEach(link => {
    const href = link.getAttribute('href');
    
    // Remove active class to ensure clean state
    link.classList.remove('active');
    
    if (href === currentPath) {
      link.classList.add('active');
    }

    // Hide Home link on index page
    if (href === 'index.html' && currentPath === 'index.html') {
      if (link.parentElement) {
        link.parentElement.style.display = 'none';
      }
    }
  });

  // Scroll top button
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // AOS Init
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}
