// Client-side JavaScript for the web application

async function greetUser() {
    const nameInput = document.getElementById('nameInput');
    const greetingDiv = document.getElementById('greeting');
    const name = nameInput.value.trim();
    
    if (!name) {
        greetingDiv.textContent = 'Please enter your name!';
        greetingDiv.style.color = '#ff6b6b';
        return;
    }
    
    try {
        // Call the API endpoint
        const response = await fetch(`/api/greet/${encodeURIComponent(name)}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        greetingDiv.textContent = data.message;
        greetingDiv.style.color = '#ffffff';
        
        // Clear the input
        nameInput.value = '';
        
    } catch (error) {
        console.error('Error:', error);
        greetingDiv.textContent = 'Sorry, there was an error. Please try again.';
        greetingDiv.style.color = '#ff6b6b';
    }
}

// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-icon');
        this.body = document.body;
        this.isLightMode = localStorage.getItem('theme') === 'light';
        
        this.init();
    }
    
    init() {
        // Set initial theme
        if (this.isLightMode) {
            this.body.classList.add('light-mode');
            this.updateIcon();
        }
        
        // Add click listener
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', (e) => this.toggleTheme(e));
        }
    }
    
    toggleTheme(event) {
        const rect = this.themeToggle.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        this.isLightMode = !this.isLightMode;
        
        // Create radial reveal animation
        this.createRadialReveal(x, y, () => {
            // Toggle theme class
            this.body.classList.toggle('light-mode', this.isLightMode);
            
            // Update icon
            this.updateIcon();
            
            // Save to localStorage
            localStorage.setItem('theme', this.isLightMode ? 'light' : 'dark');
        });
    }
    
    createRadialReveal(x, y, callback) {
        // Create transition overlay
        const overlay = document.createElement('div');
        overlay.classList.add('theme-transition');
        
        // Calculate the maximum distance to cover the entire screen
        const maxDistance = Math.max(
            Math.sqrt(x * x + y * y),
            Math.sqrt((window.innerWidth - x) ** 2 + y * y),
            Math.sqrt(x * x + (window.innerHeight - y) ** 2),
            Math.sqrt((window.innerWidth - x) ** 2 + (window.innerHeight - y) ** 2)
        );
        
        // Set CSS custom properties for the reveal
        overlay.style.setProperty('--reveal-bg', this.isLightMode ? '#ffffff' : '#141414');
        
        // Update CSS for dynamic positioning
        const style = document.createElement('style');
        style.textContent = `
            .theme-transition::before {
                left: ${x}px;
                top: ${y}px;
                width: ${maxDistance * 2.5}px;
                height: ${maxDistance * 2.5}px;
                margin-left: ${-maxDistance * 1.25}px;
                margin-top: ${-maxDistance * 1.25}px;
            }
        `;
        document.head.appendChild(style);
        
        // Add to DOM
        document.body.appendChild(overlay);
        
        // Trigger animation
        requestAnimationFrame(() => {
            overlay.classList.add('animate');
        });
        
        // Execute callback after a short delay
        setTimeout(() => {
            callback();
        }, 100);
        
        // Clean up after animation
        setTimeout(() => {
            overlay.remove();
            style.remove();
        }, 600);
    }
    
    updateIcon() {
        if (this.themeIcon) {
            const iconName = this.isLightMode ? 'sun' : 'moon';
            this.themeIcon.setAttribute('data-lucide', iconName);
            
            // Re-initialize Lucide icons for the updated icon
            if (window.lucide) {
                lucide.createIcons();
            }
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme manager
    new ThemeManager();
    
    // API demo functionality
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                greetUser();
            }
        });
    }
});
