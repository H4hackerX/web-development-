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

        // Chatbot Configuration
        const chatbotConfig = {
          brandName: "FJackets",
          responseDelay: 1000,
          typingIndicatorDuration: 1500,
          welcomeMessage: "Hello! I'm your FJackets assistant. Ask me about faux leather jackets, styles, care, or anything else!",
          defaultResponses: [
              "I can help with FJackets information, styling tips, and purchase advice.",
              "Our faux leather jackets combine style and sustainability.",
              "Would you like to know about our latest FJackets collection?"
          ],
          productInfo: {
              materials: ["Polyurethane (PU)", "Polyvinyl Chloride (PVC)", "Microfiber"],
              priceRange: "$49-$299",
              styles: ["Moto", "Bomber", "Trench", "Blazer", "Biker", "Oversized"],
              benefits: [
                  "Cruelty-free alternative to leather",
                  "More affordable than genuine leather",
                  "Wide variety of colors and finishes",
                  "Easier to clean and maintain"
              ]
          }
      };
  
      // DOM Elements
      const chatToggle = document.getElementById('chatToggle');
      const chatContainer = document.getElementById('chatContainer');
      const chatClose = document.getElementById('chatClose');
      const chatBody = document.getElementById('chatBody');
      const chatInput = document.getElementById('chatInput');
      const chatSend = document.getElementById('chatSend');
      const typingIndicator = document.getElementById('typingIndicator');
      const chatBadge = document.getElementById('chatBadge');
  
      // Initialize Chat
      document.addEventListener('DOMContentLoaded', () => {
          setTimeout(() => {
              addMessage(chatbotConfig.welcomeMessage, 'bot');
              addQuickReplies([
                  "Show me FJackets styles",
                  "How to care for FJackets?",
                  "Faux vs real leather",
                  "Current promotions"
              ]);
          }, 1000);
      });
  
      // Chat Toggle Functionality
      function setupChatToggle() {
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
      }
  
      // Message Handling
      function sendMessage() {
          const message = chatInput.value.trim();
          if (message) {
              addMessage(message, 'user');
              chatInput.value = '';
              showTypingIndicator();
              
              setTimeout(() => {
                  hideTypingIndicator();
                  processUserMessage(message);
              }, chatbotConfig.typingIndicatorDuration);
          }
      }
  
      function processUserMessage(message) {
          const lowerMsg = message.toLowerCase();
          let response = "";
  
          // Product Information
          if (lowerMsg.includes('style') || lowerMsg.includes('type') || lowerMsg.includes('design')) {
              response = `Our ${chatbotConfig.brandName} come in these styles: ${chatbotConfig.productInfo.styles.join(', ')}. Which style interests you?`;
          }
          else if (lowerMsg.includes('material') || lowerMsg.includes('made of')) {
              response = `Faux leather jackets are typically made from: ${chatbotConfig.productInfo.materials.join(', ')}. These materials provide durability while being animal-friendly.`;
          }
          else if (lowerMsg.includes('price') || lowerMsg.includes('cost') || lowerMsg.includes('how much')) {
              response = `Our ${chatbotConfig.brandName} range from ${chatbotConfig.productInfo.priceRange}. The price varies by style, detailing, and quality of the faux leather.`;
          }
          
          // Comparisons
          else if (lowerMsg.includes('vs ') || lowerMsg.includes('compare') || lowerMsg.includes('difference')) {
              response = `Faux leather vs real leather:\n` +
                         `✅ ${chatbotConfig.productInfo.benefits.join('\n✅ ')}\n` +
                         `❌ Doesn't develop patina like real leather\n` +
                         `❌ Generally less breathable\n` +
                         `❌ May not last as many years`;
          }
          
          // Care Instructions
          else if (lowerMsg.includes('care') || lowerMsg.includes('clean') || lowerMsg.includes('maintain')) {
              response = `FJackets Care Guide:\n` +
                         `1. Wipe with damp microfiber cloth\n` +
                         `2. Use mild soap for stains (test hidden area first)\n` +
                         `3. Hang to dry naturally\n` +
                         `4. Store in breathable garment bag\n` +
                         `5. Avoid heat sources and direct sunlight\n` +
                         `Never machine wash or dry clean faux leather!`;
          }
          
          // Purchase Related
          else if (lowerMsg.includes('buy') || lowerMsg.includes('purchase') || lowerMsg.includes('where')) {
              response = `You can purchase ${chatbotConfig.brandName}:\n` +
                         `🛍️ Our website: www.fjackets.com\n` +
                         `📱 Mobile app: Available on iOS & Android\n` +
                         `🏬 Flagship stores in NY, LA, and Chicago\n` +
                         `Would you like to check availability for a specific style?`;
          }
          
          // Default Response
          else {
              response = chatbotConfig.defaultResponses[
                  Math.floor(Math.random() * chatbotConfig.defaultResponses.length)
              ];
          }
  
          addMessage(response, 'bot');
          
          // Add context-appropriate quick replies
          if (lowerMsg.includes('jacket') || lowerMsg.includes('fjacket')) {
              addFJacketsQuickReplies();
          }
      }
  
      // UI Helpers
      function addMessage(text, sender) {
          const messageDiv = document.createElement('div');
          messageDiv.classList.add('message', `${sender}-message`);
          
          // Format newlines as paragraphs
          const formattedText = text.split('\n').map(paragraph => {
              return paragraph ? `<p>${paragraph}</p>` : '';
          }).join('');
          
          messageDiv.innerHTML = formattedText;
          chatBody.appendChild(messageDiv);
          chatBody.scrollTop = chatBody.scrollHeight;
      }
  
      function showTypingIndicator() {
          typingIndicator.style.display = 'flex';
      }
  
      function hideTypingIndicator() {
          typingIndicator.style.display = 'none';
      }
  
      // Quick Replies
      function addFJacketsQuickReplies() {
          const quickReplies = [
              "Most popular FJackets",
              "How to measure for size?",
              "Waterproof FJackets",
              "Return policy",
              "Latest FJackets trends"
          ];
          addQuickReplies(quickReplies);
      }
  
      function addQuickReplies(replies) {
          const quickReplyDiv = document.createElement('div');
          quickReplyDiv.classList.add('quick-replies');
          
          replies.forEach(reply => {
              const button = document.createElement('button');
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
      function setupEventListeners() {
          chatSend.addEventListener('click', sendMessage);
          chatInput.addEventListener('keypress', (e) => {
              if (e.key === 'Enter') {
                  sendMessage();
              }
          });
          
          // Show chat badge after delay if not opened
          setTimeout(() => {
              if (!chatContainer.classList.contains('open')) {
                  chatBadge.style.display = 'flex';
              }
          }, 5000);
      }
  
      // Initialize
      setupChatToggle();
      setupEventListeners();
