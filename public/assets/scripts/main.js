document.addEventListener('DOMContentLoaded', () => {
  const mainView = document.querySelector('main');
  const pageViews = {
    '#preguntas': document.getElementById('faq-page'),
    '#guia': document.getElementById('parents-guide-page'),
    '#comunidad': document.getElementById('comunidad-page'),
  };

  function showView(hash, updateHistory = false) {
    const selectedView = pageViews[hash] || mainView;

    if (mainView) mainView.style.display = selectedView === mainView ? 'block' : 'none';
    Object.values(pageViews).forEach((view) => {
      if (view) view.classList.toggle('active', view === selectedView);
    });

    window.scrollTo({ top: 0, behavior: 'auto' });

    const nextHash = pageViews[hash] ? hash : '#landing';
    if (updateHistory && window.location.hash !== nextHash) {
      window.history.pushState(null, '', nextHash);
    } else if (window.location.hash !== nextHash) {
      window.history.replaceState(null, '', nextHash);
    }
  }

  document.querySelectorAll('.menu a').forEach((link) => {
    link.addEventListener('click', (event) => {
      const hash = link.getAttribute('href');
      if (!pageViews[hash]) return;
      event.preventDefault();
      showView(hash, true);
      hamburger?.classList.remove('active');
      navbarRight?.classList.remove('active');
    });
  });

  const hamburger = document.querySelector('.hamburger');
  const navbarRight = document.querySelector('.navbar-right');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navbarRight?.classList.toggle('active');
  });

  const logo = document.querySelector('.logo');
  if (logo) {
    logo.addEventListener('click', (event) => {
      event.preventDefault();
      showView('#landing', true);
    });
  }

  window.addEventListener('popstate', () => showView(window.location.hash));
  showView(window.location.hash);

  const communitySlides = [
    document.getElementById('slide1'),
    document.getElementById('slide2'),
  ].filter(Boolean);
  const nextSlide = document.getElementById('nextSlide');
  const previousSlide = document.getElementById('prevSlide');
  let activeSlide = 0;

  function showCommunitySlide(index) {
    activeSlide = Math.max(0, Math.min(index, communitySlides.length - 1));
    communitySlides.forEach((slide, slideIndex) => {
      slide.style.display = slideIndex === activeSlide ? 'flex' : 'none';
      slide.setAttribute('aria-hidden', String(slideIndex !== activeSlide));
    });

    if (previousSlide) previousSlide.style.display = activeSlide === 0 ? 'none' : 'block';
    if (nextSlide) nextSlide.style.display = activeSlide === communitySlides.length - 1 ? 'none' : 'block';
  }

  nextSlide?.addEventListener('click', () => showCommunitySlide(activeSlide + 1));
  previousSlide?.addEventListener('click', () => showCommunitySlide(activeSlide - 1));
  showCommunitySlide(0);
});
