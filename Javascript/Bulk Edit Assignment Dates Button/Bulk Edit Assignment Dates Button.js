// Bulk Assignments Edit Button
function setupBulkAssignmentEditing() {
    // Add edit button
    const button = document.createElement('button');
    button.className = 'btn Button';
    button.title = 'Edit Assignment Dates'; 
    button.setAttribute('aria-label', 'Edit Assignment Dates');
    button.style.marginLeft = '4px';
  
    const icon = document.createElement('i');
    icon.className = 'icon-edit';
    button.appendChild(icon);
    button.appendChild(document.createTextNode(' Edit Assignment Dates'));
  
    button.onclick = () => {
      const menuItem = document.querySelector('#requestBulkEditMenuItem');
      if (menuItem) menuItem.click();
    };
  
    function insertButton() {
      const addAssignmentButton = document.querySelector('a[href$="/assignments/new"]');
      if (addAssignmentButton && !document.querySelector('[title="Edit Assignment Dates"]')) {
        addAssignmentButton.parentNode.insertBefore(button, addAssignmentButton.nextSibling);
      }
    }
  
    // Hide menu item
    const style = document.createElement('style');
    style.textContent = '#requestBulkEditMenuItem { display: none !important; }';
    document.head.appendChild(style);
  
    // Setup button insertion
    setTimeout(insertButton, 1000);
    new MutationObserver(insertButton).observe(document.body, { childList: true, subtree: true });
}

// Check if we're on the assignments page
if (window.location.pathname.includes('/assignments')) {
    setupBulkAssignmentEditing();
}
