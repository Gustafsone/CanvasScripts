///////////////////////////////////////////////
// All Courses Tabbed Navigation
///////////////////////////////////////////////
'use strict';

function initializeCourseTabs() {
    // Only run on the courses page
    if (!window.location.pathname.endsWith('/courses')) {
        return;
    }

    const content = document.getElementById('content');
    if (!content) return;

    // If tabs are already there, don't run again.
    if (document.querySelector('.mbu-course-tabs-container')) {
        return;
    }

    // Select tables directly by their IDs for better reliability
    const myCoursesTable = document.querySelector('#my_courses_table');
    const pastEnrollmentsTable = document.querySelector('#past_enrollments_table');
    const futureEnrollmentsTable = document.querySelector('#future_enrollments_table');
    const myGroupsTable = document.querySelector('#my_groups_table');

    // If no tables exist yet, return false so we know to keep observing
    if (!myCoursesTable && !pastEnrollmentsTable && !futureEnrollmentsTable && !myGroupsTable) {
        return false;
    }

    // Find the original headings so we can remove them later
    const pastEnrollmentsHeading = Array.from(content.querySelectorAll('h2')).find(h => h.textContent.trim() === 'Past Enrollments');
    const futureEnrollmentsHeading = Array.from(content.querySelectorAll('h2')).find(h => h.textContent.trim() === 'Future Enrollments');
    const myGroupsHeading = Array.from(content.querySelectorAll('h2')).find(h => h.textContent.trim() === 'My Groups');

    const tabsContainer = document.createElement('div');
    tabsContainer.className = 'mbu-course-tabs-container';
    const contentPanesContainer = document.createElement('div');

    const tabsData = [
        { name: 'Current Enrollments', table: myCoursesTable, heading: null },
        { name: 'My Groups', table: myGroupsTable, heading: myGroupsHeading },
        { name: 'Future Enrollments', table: futureEnrollmentsTable, heading: futureEnrollmentsHeading },
        { name: 'Past Enrollments', table: pastEnrollmentsTable, heading: pastEnrollmentsHeading },
    ];

    tabsData.forEach((tabInfo, index) => {
        // Only create a tab if its corresponding table exists.
        if (!tabInfo.table) return;

        const button = document.createElement('button');
        button.className = 'mbu-course-tab-button';
        button.textContent = tabInfo.name;
        button.dataset.tab = `mbu-tab-${index}`;
        tabsContainer.appendChild(button);

        const pane = document.createElement('div');
        pane.id = `mbu-tab-${index}`;
        pane.className = 'mbu-course-tab-content';

        const paneTitle = document.createElement('h2');
        paneTitle.textContent = tabInfo.name;
        pane.appendChild(paneTitle);

        pane.appendChild(tabInfo.table);
        if (tabInfo.heading) tabInfo.heading.remove();

        contentPanesContainer.appendChild(pane);

        button.addEventListener('click', () => {
            document.querySelectorAll('.mbu-course-tab-button').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.mbu-course-tab-content').forEach(p => p.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(button.dataset.tab).classList.add('active');
        });
    });

    // Set the first tab and pane as active
    if (tabsContainer.firstChild) {
        tabsContainer.firstChild.classList.add('active');
    }
    if (contentPanesContainer.firstChild) {
        contentPanesContainer.firstChild.classList.add('active');
    }

    // Find the action header div.
    const actionHeader = document.querySelector('.ic-Action-header.content--hasMarginTop');

    if (actionHeader) {
        actionHeader.insertAdjacentElement('afterend', tabsContainer);
        tabsContainer.insertAdjacentElement('afterend', contentPanesContainer);
    } else {
        // Fallback if the action header is not found
        content.prepend(contentPanesContainer);
        content.prepend(tabsContainer);
        console.warn('Could not find ".ic-Action-header.content--hasMarginTop". Placing tabs at the top of the content area as a fallback.');
    }

    console.log("MBU Canvas course tabs created successfully!");
    return true; // Return true to indicate success
}

// Try to initialize immediately (in case content is already loaded)
if (initializeCourseTabs() !== true) {
    // If initialization didn't succeed, set up observer to wait for content
    const mbuCourseTabsObserver = new MutationObserver(function(mutations, obs) {
        if (initializeCourseTabs() === true) {
            obs.disconnect(); // Success! Stop observing
        }
    });

    // Start observing the body for changes
    mbuCourseTabsObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
}
