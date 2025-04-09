document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.trending-carousel');
    const cards = document.querySelectorAll('.trending-card');
    const dotsContainer = document.querySelector('.carousel-dots');
    let currentIndex = 0;
    const cardWidth = 280 + 20; // card width + margin
    
    // Create dots
    cards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if(index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
    
    // Auto-slide function
    function autoSlide() {
      currentIndex = (currentIndex + 1) % cards.length;
      updateCarousel();
    }
    
    // Update carousel position
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      
      // Update active dot
      document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
      resetTimer();
    }
    
    // Reset timer when user interacts
    function resetTimer() {
      clearInterval(slideInterval);
      slideInterval = setInterval(autoSlide, 2000);
    }
    
    // Start auto-sliding
    let slideInterval = setInterval(autoSlide, 2000);
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(slideInterval));
    carousel.addEventListener('mouseleave', () => {
      slideInterval = setInterval(autoSlide, 2000);
    });
  });
