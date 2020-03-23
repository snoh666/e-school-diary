(() => {

  // Intersect animations
  const fadeUpElements = document.querySelectorAll('.fade-up');

  const Observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add('fade-up--in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: .7
  });

  fadeUpElements.forEach(element => Observer.observe(element));
})();