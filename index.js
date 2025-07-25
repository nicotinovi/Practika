// DOM Elements
const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');
const registrationBtn = document.querySelector('.registration-btn');
const registrationModal = document.getElementById('registrationModal');
const closeModal = document.querySelector('.close-modal');
const tabBtns = document.querySelectorAll('.tab-btn');
const schedulePanels = document.querySelectorAll('.schedule-panel');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const carousel = document.getElementById('photoCarousel');
const slides = document.querySelectorAll('.carousel-slide');
const contactForm = document.getElementById('contactForm');
const registrationForm = document.getElementById('registrationForm');

// Mobile Menu Toggle
if (burgerMenu && navLinks) {
  burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animation for burger menu
    const spans = burgerMenu.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Modal Functionality
if (registrationBtn && registrationModal && closeModal) {
  registrationBtn.addEventListener('click', () => {
    registrationModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  });
  
  closeModal.addEventListener('click', () => {
    registrationModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  });
  
  // Close modal when clicking outside of content
  registrationModal.addEventListener('click', (e) => {
    if (e.target === registrationModal) {
      registrationModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Schedule Tabs
if (tabBtns.length && schedulePanels.length) {
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and panels
      tabBtns.forEach(b => b.classList.remove('active'));
      schedulePanels.forEach(panel => panel.classList.remove('active'));
      
      // Add active class to clicked button and corresponding panel
      btn.classList.add('active');
      const day = btn.getAttribute('data-day');
      const panel = document.getElementById(day);
      if (panel) {
        panel.classList.add('active');
      }
    });
  });
  
  // Initialize schedule data
  initializeSchedule();
}

// Image Carousel
if (carousel && slides.length && nextBtn && prevBtn) {
  let currentSlide = 0;
  const slideCount = slides.length;
  
  // Automatic slide change
  let slideInterval = setInterval(nextSlide, 5000);
  
  // Next slide function
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slideCount;
    slides[currentSlide].classList.add('active');
  }
  
  // Previous slide function
  function prevSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide - 1 + slideCount) % slideCount;
    slides[currentSlide].classList.add('active');
  }
  
  // Event listeners for buttons
  nextBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    nextSlide();
    slideInterval = setInterval(nextSlide, 5000);
  });
  
  prevBtn.addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 5000);
  });
}

// Form Submission
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would normally send the form data to a server
    // For demonstration, we'll just show an alert
    alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.');
    contactForm.reset();
  });
}

if (registrationForm) {
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would normally send the form data to a server
    // For demonstration, we'll just show an alert
    alert('Спасибо за заявку! Мы свяжемся с вами для подтверждения записи на занятие.');
    registrationForm.reset();
    registrationModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      // If mobile menu is open, close it
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const spans = burgerMenu.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
      
      // Calculate header height for offset
      const headerHeight = document.querySelector('.header').offsetHeight;
      
      window.scrollTo({
        top: targetElement.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  });
});

// Header scroll effect
window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.style.padding = '8px 0';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.padding = '16px 0';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }
});

// Initialize schedule data
function initializeSchedule() {
  // Schedule data
  const scheduleData = {
    monday: [
      {
        time: '09:00 - 10:00',
        class: 'Группа "Малыши" (3-4 года)',
        description: 'Развивающие игры в воде',
        trainer: 'Елена П.'
      },
      {
        time: '10:30 - 11:30',
        class: 'Группа "Дельфины" (5-6 лет)',
        description: 'Обучение плаванию',
        trainer: 'Андрей К.'
      },
      {
        time: '15:00 - 16:00',
        class: 'Группа "Волна" (7-9 лет)',
        description: 'Техника плавания',
        trainer: 'Мария С.'
      }
    ],
    tuesday: [
      {
        time: '09:00 - 10:00',
        class: 'Группа "Малыши" (3-4 года)',
        description: 'Адаптация к воде',
        trainer: 'Елена П.'
      },
      {
        time: '11:00 - 12:00',
        class: 'Группа "Русалочки" (5-7 лет)',
        description: 'Синхронное плавание',
        trainer: 'Мария С.'
      },
      {
        time: '16:00 - 17:00',
        class: 'Группа "Акватика" (8-10 лет)',
        description: 'Аквааэробика',
        trainer: 'Андрей К.'
      }
    ],
    wednesday: [
      {
        time: '09:30 - 10:30',
        class: 'Группа "Крабики" (2-3 года)',
        description: 'Мама и малыш',
        trainer: 'Елена П.'
      },
      {
        time: '11:00 - 12:00',
        class: 'Группа "Дельфины" (5-6 лет)',
        description: 'Обучение плаванию',
        trainer: 'Андрей К.'
      },
      {
        time: '15:30 - 16:30',
        class: 'Группа "Волна" (7-9 лет)',
        description: 'Техника плавания',
        trainer: 'Мария С.'
      }
    ],
    thursday: [
      {
        time: '09:00 - 10:00',
        class: 'Группа "Малыши" (3-4 года)',
        description: 'Развивающие игры в воде',
        trainer: 'Елена П.'
      },
      {
        time: '10:30 - 11:30',
        class: 'Группа "Русалочки" (5-7 лет)',
        description: 'Синхронное плавание',
        trainer: 'Мария С.'
      },
      {
        time: '16:00 - 17:00',
        class: 'Группа "Акватика" (8-10 лет)',
        description: 'Аквааэробика',
        trainer: 'Андрей К.'
      }
    ],
    friday: [
      {
        time: '09:00 - 10:00',
        class: 'Группа "Малыши" (3-4 года)',
        description: 'Адаптация к воде',
        trainer: 'Елена П.'
      },
      {
        time: '10:30 - 11:30',
        class: 'Группа "Дельфины" (5-6 лет)',
        description: 'Обучение плаванию',
        trainer: 'Андрей К.'
      },
      {
        time: '15:00 - 16:00',
        class: 'Группа "Волна" (7-9 лет)',
        description: 'Техника плавания',
        trainer: 'Мария С.'
      }
    ],
    weekend: [
      {
        time: '10:00 - 11:00',
        class: 'Семейное плавание',
        description: 'Для детей с родителями',
        trainer: 'Елена П.'
      },
      {
        time: '11:30 - 12:30',
        class: 'Группа "Морские звезды" (4-7 лет)',
        description: 'Свободное плавание с элементами игр',
        trainer: 'Андрей К.'
      },
      {
        time: '13:00 - 14:00',
        class: 'Группа "Чемпионы" (8-12 лет)',
        description: 'Подготовка к соревнованиям',
        trainer: 'Мария С.'
      }
    ]
  };

  // Create and populate schedule panels
  Object.keys(scheduleData).forEach(day => {
    const panel = document.getElementById(day);
    if (panel) {
      // Clear existing content
      panel.innerHTML = '';
      
      // Add schedule items
      scheduleData[day].forEach(item => {
        const scheduleItem = document.createElement('div');
        scheduleItem.className = 'schedule-item';
        
        scheduleItem.innerHTML = `
          <span class="time">${item.time}</span>
          <div class="class-info">
            <h4>${item.class}</h4>
            <p>${item.description}</p>
          </div>
          <span class="trainer">${item.trainer}</span>
        `;
        
        panel.appendChild(scheduleItem);
      });
    }
  });
}

// Initialize the first tab as active on page load
document.addEventListener('DOMContentLoaded', () => {
  // Activate first tab by default
  if (tabBtns.length > 0) {
    tabBtns[0].click();
  }
});