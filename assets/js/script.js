async function trackEvent(eventName, label) {
    // Unique ID for deduplication between Pixel and CAPI
    const eventId = 'simply_' + eventName.toLowerCase() + '_' + Date.now();

    // 1. Trigger Meta Browser Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, { content_name: label }, { eventID: eventId });
    }

    // 2. Trigger Vercel Serverless CAPI
    const vercelEndpoint = "https://simply-reflections-capi.vercel.app/api/track";

    try {
        await fetch(vercelEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                event_name: eventName,
                event_id: eventId,
                user_data: {}, 
                custom_data: { button_label: label },
                source_url: window.location.href
            })
        });
        console.log(Successfully tracked: ${label});
    } catch (err) {
        console.error("CAPI Tracking Failed:", err);
    }
}

// Automatically track PageView via CAPI on load
window.addEventListener('load', () => {
    trackEvent('PageView', 'Main Landing Page');
});

fetch('https://ipwho.is/')
    .then(res => res.json())
    .then(data => {
        if (!data.success) return;
        if (data.region?.toLowerCase() === 'california') {
            document.body.classList.add('is__california');
        }
    })
    .catch(err => console.log(err));

// Initialize AOS animation library
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true
});

// Initialize Swiper for hero section
const swiper = new Swiper('.hero-swiper', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    speed: 1000,
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.classList.toggle('mobile-menu-open');
});

// Close mobile menu when clicking on a link
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.classList.remove('mobile-menu-open');
    });
});

// Progress Bar Animation
const progressBars = document.querySelectorAll('.progress');

function animateProgressBars() {
    progressBars.forEach(progress => {
        const targetWidth = progress.style.width;
        progress.style.width = '0';
        setTimeout(() => {
            progress.style.width = targetWidth;
        }, 100);
    });
}

// Back to Top Button
const backToTopButton = document.getElementById('back-to-top');

function checkScrollPosition() {
    if (window.scrollY > 500) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
    } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
    }
}

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Initialize animations
window.addEventListener('load', function() {
    animateProgressBars();
    checkScrollPosition();
});

window.addEventListener('scroll', function() {
    checkScrollPosition();
});

// Add ripple effect to buttons
const rippleButtons = document.querySelectorAll('.ripple');

rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const x = e.clientX - e.target.getBoundingClientRect().left;
        const y = e.clientY - e.target.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// review slider
const review = new Swiper('.review_slider', {
    loop: true,
    spaceBetween: 20,
    speed: 800,
    slidesPerView: 1,

    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
    },


    breakpoints: {
        768: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        }
    }
});
