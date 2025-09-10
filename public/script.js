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

// Allow Enter key to trigger the greeting
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('nameInput');
    nameInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            greetUser();
        }
    });
});
