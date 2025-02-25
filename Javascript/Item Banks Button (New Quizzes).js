// Item Banks Button for New Quizzes
function addItemBanksButton() {
    // Configuration - Set your institution's external tool ID here
    const externalToolId = 0; // Change this value to match your institution's external tool ID
    
    const addButton = () => {
        // Look for the Manage Question Banks button instead of addQuizButton
        const questionBanksButton = document.querySelector('[title="Manage Question Banks"]');
        
        // Check if the Manage Question Banks button exists and our button doesn't exist yet
        if (!questionBanksButton || document.querySelector('[title="Item Banks"]')) return;
        
        const button = document.createElement('button');
        button.className = 'btn Button';
        button.title = 'Item Banks';
        button.setAttribute('aria-label', 'Item Banks');
        button.style.marginLeft = '4px';
        
        const icon = document.createElement('i');
        icon.className = 'icon-bank';
        button.appendChild(icon);
        button.appendChild(document.createTextNode(' Item Banks'));
        
        button.onclick = () => {
            const courseId = window.location.pathname.split('/')[2];
            window.location.href = `/courses/${courseId}/external_tools/${externalToolId}`;
        };
        
        // Insert our button after the Manage Question Banks button
        questionBanksButton.after(button);
    };
    
    // Run the function after a delay to ensure the page is loaded
    setTimeout(addButton, 1000);
    
    // Keep checking for changes in the DOM to handle dynamic loading
    new MutationObserver(addButton).observe(document.body, { childList: true, subtree: true });
}

// Check if we're on the quizzes page
if (window.location.pathname.includes('/quizzes')) {
    addItemBanksButton();
}
