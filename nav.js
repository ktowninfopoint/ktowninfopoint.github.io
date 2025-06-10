function loadNavigation() {
    fetch('nav.json')
        .then(response => response.json())
        .then(data => {
            const nav = document.createElement('nav');
            nav.className = 'main-nav';

            const menu = document.createElement('ul');
            menu.className = 'nav-menu';

            data.menu_links.forEach(link => {
                const menuItem = document.createElement('li');
                const menuLink = document.createElement('a');
                menuLink.href = link.url;
                menuLink.textContent = link.title;

                // Open in new tab if specified
                if (link.new_tab) {
                    menuLink.target = '_blank';
                    menuLink.rel = 'noopener noreferrer';
                }

                // Highlight current page (for same-page links only)
                if (!link.new_tab && window.location.pathname.endsWith(link.url)) {
                    menuLink.classList.add('active');
                }

                menuItem.appendChild(menuLink);
                menu.appendChild(menuItem);
            });

            nav.appendChild(menu);
            document.body.insertBefore(nav, document.body.firstChild);
        })
        .catch(error => {
            console.error('Error loading navigation:', error);
            document.body.insertAdjacentHTML('afterbegin', fallbackNav);
        });
}

document.addEventListener('DOMContentLoaded', loadNavigation);