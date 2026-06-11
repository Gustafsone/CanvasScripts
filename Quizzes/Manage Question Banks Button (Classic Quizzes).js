// Question Banks Button
function addQuestionBanksButton() {
    const removeMenuItem = () => {
      const questionBankMenuItem = document.querySelector('li.ui-menu-item a[href*="/question_banks"]');
      if (questionBankMenuItem) {
        questionBankMenuItem.closest('li').remove();
      }
    };
  
    const addButton = () => {
      const addQuizButton = document.querySelector('button.choose-quiz-engine');
      if (!addQuizButton || document.querySelector('[title="Manage Question Banks"]')) return;
  
      const button = document.createElement('button');
      button.className = 'btn Button';
      button.title = 'Manage Question Banks';
      button.setAttribute('aria-label', 'Manage Question Banks');
      button.style.marginLeft = '4px';
  
      const icon = document.createElement('i');
      icon.className = 'icon-question';
      button.appendChild(icon);
      button.appendChild(document.createTextNode(' Manage Question Banks'));
  
      button.onclick = () => {
        const courseId = window.location.pathname.split('/')[2];
        window.location.href = `/courses/${courseId}/question_banks`;
      };
  
      addQuizButton.after(button);
    };
  
    // Initial removal attempt
    removeMenuItem();
  
    // Watch for dynamic updates
    new MutationObserver(removeMenuItem).observe(document.body, { childList: true, subtree: true });
    
    // Handle button addition
    setTimeout(addButton, 1000);
    new MutationObserver(addButton).observe(document.body, { childList: true, subtree: true });
}

// Check if we're on the quizzes page
if (window.location.pathname.includes('/quizzes')) {
  addQuestionBanksButton();
}
