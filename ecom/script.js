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

// Chat Functionality
const chatToggle = document.getElementById('chatToggle');
const chatContainer = document.getElementById('chatContainer');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const typingIndicator = document.getElementById('typingIndicator');
const chatBadge = document.getElementById('chatBadge');

// Hover to show chat
chatToggle.addEventListener('mouseenter', () => {
    chatContainer.classList.add('open');
});

// Click to toggle (for mobile)
chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('open');
    chatBadge.style.display = 'none';
});

// Keep open when hovering container
chatContainer.addEventListener('mouseenter', () => {
    chatContainer.classList.add('open');
});

// Hide when leaving both elements
[chatToggle, chatContainer].forEach(el => {
    el.addEventListener('mouseleave', () => {
        setTimeout(() => {
            if (!chatContainer.matches(':hover') && !chatToggle.matches(':hover')) {
                chatContainer.classList.remove('open');
            }
        }, 300);
    });
});

// Close Chat
chatClose.addEventListener('click', () => {
    chatContainer.classList.remove('open');
});

// Send Message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        typingIndicator.style.display = 'flex';
        
        // Simulate bot response after delay
        setTimeout(() => {
            typingIndicator.style.display = 'none';
            const responses = [
                "I'd be happy to help with that!",
                "Our team can assist you with this matter.",
                "Thanks for your question! Let me check that for you.",
                "We have several options available for that."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
            
            // Add quick replies for common questions
            if (Math.random() > 0.5) {
                addQuickReplies();
            }
        }, 1500);
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender + '-message');
    messageDiv.textContent = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Add quick reply buttons
function addQuickReplies() {
    const quickReplies = [
        "Order status",
        "Return policy",
        "Payment options",
        "Product availability"
    ];
    
    const quickReplyDiv = document.createElement('div');
    quickReplyDiv.classList.add('quick-replies');
    
    quickReplies.forEach(reply => {
        const button = document.createElement('div');
        button.classList.add('quick-reply');
        button.textContent = reply;
        button.addEventListener('click', () => {
            chatInput.value = reply;
            sendMessage();
        });
        quickReplyDiv.appendChild(button);
    });
    
    chatBody.appendChild(quickReplyDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Event Listeners
chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Show chat badge after 5 seconds if not opened
setTimeout(() => {
    if (!chatContainer.classList.contains('open')) {
        chatBadge.style.display = 'flex';
    }
}, 5000);
