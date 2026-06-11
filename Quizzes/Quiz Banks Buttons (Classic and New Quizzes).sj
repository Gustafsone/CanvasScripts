// Quiz Banks Buttons (Classic and New Quizzes)
function setupQuizBanksButtons() {
    // Configuration - Set your institution's external tool ID here
    const externalToolId = 0; // Change this value to match your institution's external tool ID
    
    // Remove Question Banks menu item from the kebab menu
    const removeMenuItem = () => {
      const questionBankMenuItem = document.querySelector('li.ui-menu-item a[href*="/question_banks"]');
      if (questionBankMenuItem) {
        questionBankMenuItem.closest('li').remove();
      }
    };
  
    // Add both buttons to the page
    const addButtons = () => {
      const addQuizButton = document.querySelector('button.choose-quiz-engine');
      // Exit if we can't find the Add Quiz button or if we've already added our buttons
      if (!addQuizButton || document.querySelector('[title="Manage Question Banks"]')) return;
      
      // Create Question Banks button for Classic Quizzes
      const questionBanksButton = document.createElement('button');
      questionBanksButton.className = 'btn Button';
      questionBanksButton.title = 'Manage Question Banks';
      questionBanksButton.setAttribute('aria-label', 'Manage Question Banks');
      questionBanksButton.style.marginLeft = '4px';
      
      const questionIcon = document.createElement('i');
      questionIcon.className = 'icon-question';
      questionBanksButton.appendChild(questionIcon);
      questionBanksButton.appendChild(document.createTextNode(' Manage Question Banks'));
      
      questionBanksButton.onclick = () => {
        const courseId = window.location.pathname.split('/')[2];
        window.location.href = `/courses/${courseId}/question_banks`;
      };
      
      // Create Item Banks button for New Quizzes
      const itemBanksButton = document.createElement('button');
      itemBanksButton.className = 'btn Button';
      itemBanksButton.title = 'Item Banks';
      itemBanksButton.setAttribute('aria-label', 'Item Banks');
      itemBanksButton.style.marginLeft = '4px';
      
      const itemIcon = document.createElement('i');
      itemIcon.className = 'icon-bank';
      itemBanksButton.appendChild(itemIcon);
      itemBanksButton.appendChild(document.createTextNode(' Item Banks'));
      
      itemBanksButton.onclick = () => {
        const courseId = window.location.pathname.split('/')[2];
        window.location.href = `/courses/${courseId}/external_tools/${externalToolId}`;
      };
      
      // Add both buttons after the Add Quiz button
      addQuizButton.after(itemBanksButton);
      addQuizButton.after(questionBanksButton);
    };
  
    // Initial removal attempt for the menu item
    removeMenuItem();
  
    // Watch for dynamic updates
    new MutationObserver(removeMenuItem).observe(document.body, { childList: true, subtree: true });
    
    // Handle button addition
    setTimeout(addButtons, 1000);
    new MutationObserver(addButtons).observe(document.body, { childList: true, subtree: true });
}

// Check if we're on the quizzes page
if (window.location.pathname.includes('/quizzes')) {
  setupQuizBanksButtons();
}
