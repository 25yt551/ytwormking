document.addEventListener('DOMContentLoaded', () => {
    // Domain configuration
    const domain = 'mywormateextension.wuaze.com';
    const supportEmail = `support@${domain}`;
    const discordInvite = 'mywormateextension';

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const header = document.querySelector('header');
    const nav = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
        }
    });

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Store button click handler
    const storeButton = document.querySelector('.store-button');
    if (storeButton) {
        storeButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Add your Chrome Web Store URL here
            window.open('https://chrome.google.com/webstore', '_blank');
        });
    }

    // Support button click handlers
    const supportButtons = document.querySelectorAll('.support-button');
    supportButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.href.startsWith('mailto:')) {
                e.preventDefault();
                window.location.href = `mailto:${supportEmail}`;
            } else if (button.href.includes('discord.gg')) {
                e.preventDefault();
                window.open(`https://discord.gg/${discordInvite}`, '_blank');
            }
        });
    });

    // Add domain-specific analytics or tracking
    if (window.location.hostname === domain) {
        console.log('Running on production domain');
        // Add your analytics code here
    }

    // Handle extension installation
    const installButton = document.querySelector('.cta-button');
    if (installButton) {
        installButton.addEventListener('click', () => {
            // Track installation attempt
            console.log('Installation attempted from:', domain);
        });
    }
}); 