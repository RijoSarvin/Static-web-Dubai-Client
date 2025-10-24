document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation ---
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
            const isNavOpen = document.body.classList.contains('nav-open');
            menuToggle.setAttribute('aria-expanded', isNavOpen);
        });
    }

    // --- Interactive Testimonial Slider ---
    const sliderContainer = document.querySelector('.testimonial-slider-container');
    if (sliderContainer) {
        const slider = sliderContainer.querySelector('.testimonial-slider');
        const slides = slider.querySelectorAll('.testimonial-slide');
        const prevButton = sliderContainer.querySelector('.slider-btn--prev');
        const nextButton = sliderContainer.querySelector('.slider-btn--next');
        let currentSlide = 0;
        let slideInterval;

        function showSlide(index) {
            slider.style.transform = `translateX(-${index * 100}%)`;
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        function startSlider() {
            slideInterval = setInterval(nextSlide, 5000);
        }

        function resetSlider() {
            clearInterval(slideInterval);
            startSlider();
        }

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', () => {
                nextSlide();
                resetSlider();
            });

            prevButton.addEventListener('click', () => {
                prevSlide();
                resetSlider();
            });
        }
        
        startSlider();
    }
    
    // --- Dynamic News Feed from JSON ---
    const newsFeedContainer = document.getElementById('news-feed-container');
    if (newsFeedContainer) {
        fetch('assets/data/updates.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const ul = document.createElement('ul');
                data.slice(0, 3).forEach(item => { // Show first 3 items
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${item.date}:</strong> <a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
                    ul.appendChild(li);
                });
                newsFeedContainer.innerHTML = ''; // Clear "Loading..." message
                newsFeedContainer.appendChild(ul);
            })
            .catch(error => {
                newsFeedContainer.innerHTML = '<p>Could not load latest news.</p>';
                console.error('Error fetching news:', error);
            });
    }
});

// ---------------------------
// Testimonial Slider Logic
// ---------------------------
document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonial-slider");
  const slides = document.querySelectorAll(".testimonial-slide");
  const prevBtn = document.querySelector(".slider-btn--prev");
  const nextBtn = document.querySelector(".slider-btn--next");

  if (!slider || slides.length === 0) return;

  let currentIndex = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? "block" : "none";
    });
  }

  // Show the first slide initially
  showSlide(currentIndex);

  // Next button
  nextBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  // Previous button
  prevBtn?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });
});



