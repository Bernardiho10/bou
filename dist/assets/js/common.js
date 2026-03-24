// @ts-ignore
const AOS_GLOBAL = window['AOS'] || (typeof AOS !== 'undefined' ? AOS : undefined);

let isInitialized = false;

function initCommon() {
  if (isInitialized) return;
  isInitialized = true;

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

  /**
   * Mobile nav toggle
   */
  function mobileNavToggle() {
    console.log('[BOU DEBUG] Toggling mobile nav. Body active before:', document.body.classList.contains('mobile-nav-active'));
    document.body.classList.toggle('mobile-nav-active');
    const mobileNavShow = document.querySelector('.mobile-nav-show');
    const mobileNavHide = document.querySelector('.mobile-nav-hide');
    mobileNavShow?.classList.toggle('d-none');
    mobileNavHide?.classList.toggle('d-none');
    console.log('[BOU DEBUG] Body active after:', document.body.classList.contains('mobile-nav-active'));
  }

  document.addEventListener('click', (e) => {
    const target = e.target;
    // @ts-ignore - target is actually an Element but we're keeping JS syntax for Rollup
    if (target && target.closest && target.closest('.mobile-nav-toggle')) {
      console.log('[BOU DEBUG] Mobile toggle clicked!', target);
      e.preventDefault();
      mobileNavToggle();
    }
  });

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {
    if (!navbarlink.getAttribute('href')) return;

    navbarlink.addEventListener('click', () => {
      if (document.body.classList.contains('mobile-nav-active')) {
        mobileNavToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
  navDropdowns.forEach(el => {
    el.addEventListener('click', function (event) {
      const self = this;
      // Use .classList check instead of instanceof for Rollup compatibility
      // @ts-ignore
      if (self && self.classList && document.body.classList.contains('mobile-nav-active')) {
        event.preventDefault();
        // @ts-ignore
        self.classList.toggle('active');
        // @ts-ignore
        self.nextElementSibling?.classList.toggle('dropdown-active');

        // @ts-ignore
        let dropDownIndicator = self.querySelector('.dropdown-indicator');
        if (dropDownIndicator) {
          dropDownIndicator.classList.toggle('bi-chevron-up');
          dropDownIndicator.classList.toggle('bi-chevron-down');
        }
      }
    });
  });

  // Active link state
  const pathname = window.location.pathname;
  let currentPath = pathname.split('/').pop() || 'index.html';
  if (currentPath === '') currentPath = 'index.html';

  // Normalize currentPath (remove extension for comparison if needed)
  const normalizedCurrent = currentPath.replace('.html', '');

  console.log('[BOU DEBUG] pathname:', pathname);
  console.log('[BOU DEBUG] currentPath:', currentPath);

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

  // @ts-ignore
  if (pageTitles[currentPath]) {
    // @ts-ignore
    document.title = `Welcome to BOU - ${pageTitles[currentPath]}`;
  } else {
    document.title = 'Welcome to BOU';
  }

  document.querySelectorAll('#navbar ul li a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const normalizedHref = href.replace('.html', '').replace('./', '');

    link.classList.remove('active');


    if (normalizedHref === normalizedCurrent) {
      link.classList.add('active');
    }

    // Hide Home link on index page
    if (normalizedHref === 'index' && normalizedCurrent === 'index') {
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
    };
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
  if (typeof AOS_GLOBAL !== 'undefined') {
    // @ts-ignore
    AOS_GLOBAL.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
}

export { initCommon };
