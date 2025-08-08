// Main JavaScript for DeepRapid AI Whitepapers
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSearch();
    initMobileMenu();
    initScrollEffects();
    initCodeHighlighting();
    initMermaid();
    initLanguageSelector();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    
    // Mobile menu toggle
    if (navbarToggle && navbarMenu) {
        navbarToggle.addEventListener('click', function() {
            navbarMenu.classList.toggle('active');
            navbarToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navbar && !navbar.contains(event.target)) {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        }
    });
    
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
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchModal = document.getElementById('search-modal');
    const searchResults = document.getElementById('search-results');
    const closeModal = document.querySelector('.close-modal');
    
    if (!searchInput) return;
    
    // Search input focus
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.boxShadow = '0 0 0 3px rgba(139, 0, 0, 0.1)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.boxShadow = 'none';
    });
    
    // Search functionality
    searchInput.addEventListener('input', debounce(function() {
        const query = this.value.trim();
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        performSearch(query);
    }, 300));
    
    // Close modal
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            searchModal.classList.remove('active');
        });
    }
    
    // Close modal on outside click
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Escape to close modal
        if (e.key === 'Escape') {
            searchModal.classList.remove('active');
        }
    });
}

// Perform search
function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    const searchModal = document.getElementById('search-modal');
    
    // Show loading state
    searchResults.innerHTML = '<div class="search-loading">Searching...</div>';
    searchModal.classList.add('active');
    
    // Simulate search (replace with actual search implementation)
    setTimeout(() => {
        const results = mockSearchResults(query);
        displaySearchResults(results);
    }, 500);
}

// Mock search results (replace with actual search)
function mockSearchResults(query) {
    const allWhitepapers = [
        {
            title: 'Everything as Tools: The Future of AI-First APIs',
            url: '/whitepapers/everything-as-tools/',
            excerpt: 'A revolutionary approach to API architecture where every operation is a discoverable, composable tool designed for AI consumption.',
            tags: ['AI', 'APIs', 'Architecture']
        },
        {
            title: 'The AI-First API Revolution',
            url: '/whitepapers/ai-first-apis/',
            excerpt: 'Exploring how AI-first design principles are transforming the way we build and consume APIs.',
            tags: ['AI', 'Design', 'Innovation']
        }
    ];
    
    return allWhitepapers.filter(paper => 
        paper.title.toLowerCase().includes(query.toLowerCase()) ||
        paper.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        paper.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
        return;
    }
    
    const resultsHTML = results.map(result => `
        <div class="search-result">
            <h4><a href="${result.url}">${result.title}</a></h4>
            <p>${result.excerpt}</p>
            <div class="search-tags">
                ${result.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
}

// Mobile menu functionality
function initMobileMenu() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = this.querySelectorAll('span');
            if (this.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Parallax effect for hero sections
    const heroSections = document.querySelectorAll('.hero');
    heroSections.forEach(hero => {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Code highlighting
function initCodeHighlighting() {
    // Add copy button to code blocks
    document.querySelectorAll('pre code').forEach(block => {
        const pre = block.parentElement;
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', function() {
            navigator.clipboard.writeText(block.textContent).then(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.background = '#10b981';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                    this.style.background = '';
                }, 2000);
            });
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.card, .hero-content, .whitepaper-title').forEach(el => {
        observer.observe(el);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', initAnimations);

// Service Worker for PWA features (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Analytics tracking (optional)
function trackEvent(eventName, properties = {}) {
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
}

// Track whitepaper views
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.whitepaper')) {
        trackEvent('whitepaper_view', {
            whitepaper_title: document.querySelector('.whitepaper-title')?.textContent
        });
    }
});

// Track search usage
function trackSearch(query) {
    trackEvent('search', {
        search_term: query
    });
}

// Mermaid diagram initialization
function initMermaid() {
    console.log('Initializing Mermaid...');
    
    if (typeof mermaid !== 'undefined') {
        console.log('Mermaid library found');
        
        mermaid.initialize({
            startOnLoad: false, // We'll manually trigger rendering
            theme: 'default',
            flowchart: {
                useMaxWidth: true,
                htmlLabels: true
            },
            sequence: {
                useMaxWidth: true,
                htmlLabels: true
            }
        });
        
        // Process all mermaid diagrams with language-mermaid class
        const mermaidBlocks = document.querySelectorAll('pre code.language-mermaid');
        console.log('Found', mermaidBlocks.length, 'mermaid code blocks');
        
        mermaidBlocks.forEach((block, index) => {
            console.log('Processing mermaid block', index + 1);
            const pre = block.parentElement;
            const diagramDiv = document.createElement('div');
            diagramDiv.className = 'mermaid';
            diagramDiv.textContent = block.textContent;
            
            // Replace the code block with the diagram
            pre.parentNode.replaceChild(diagramDiv, pre);
        });
        
        // Also look for any code blocks that contain mermaid syntax
        const allCodeBlocks = document.querySelectorAll('pre code');
        console.log('Found', allCodeBlocks.length, 'total code blocks');
        
        allCodeBlocks.forEach((block, index) => {
            const content = block.textContent.trim();
            if (content.startsWith('graph') || content.startsWith('flowchart') || content.startsWith('sequenceDiagram')) {
                console.log('Found mermaid syntax in block', index + 1);
                const pre = block.parentElement;
                const diagramDiv = document.createElement('div');
                diagramDiv.className = 'mermaid';
                diagramDiv.textContent = content;
                
                // Replace the code block with the diagram
                pre.parentNode.replaceChild(diagramDiv, pre);
            }
        });
        
        // Manually trigger mermaid rendering
        console.log('Triggering mermaid.init()');
        mermaid.init();
    } else {
        console.log('Mermaid library not found');
    }
}

// Language selector functionality
function initLanguageSelector() {
    const languageBtn = document.getElementById('language-btn');
    const languageDropdown = document.getElementById('language-dropdown');
    const currentLang = document.getElementById('current-lang');
    
    if (!languageBtn || !languageDropdown) return;
    
    // Set current language based on URL
    const path = window.location.pathname;
    if (path.includes('/th/')) {
        currentLang.textContent = 'TH';
    } else {
        currentLang.textContent = 'EN';
    }
    
    // Toggle dropdown
    languageBtn.addEventListener('click', function(e) {
        e.preventDefault();
        languageDropdown.classList.toggle('active');
        languageBtn.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!languageBtn.contains(e.target) && !languageDropdown.contains(e.target)) {
            languageDropdown.classList.remove('active');
            languageBtn.classList.remove('active');
        }
    });
    
    // Handle language selection
    languageDropdown.addEventListener('click', function(e) {
        if (e.target.closest('.language-option')) {
            e.preventDefault();
            const option = e.target.closest('.language-option');
            const lang = option.dataset.lang;
            
            // Navigate to the correct language URL
            if (lang === 'en') {
                window.location.href = '/whitepapers/en/';
            } else if (lang === 'th') {
                window.location.href = '/whitepapers/th/';
            }
        }
    });
}

// Export functions for external use
window.DeepRapidWhitepapers = {
    trackEvent,
    trackSearch,
    performSearch
}; 