import { useEffect } from 'react';
import { Menu } from 'react-feather';

const MenuSize = () => {

    const updateSidebarState = () => {
        const body = document.body;
        const isMobile = window.innerWidth <= 1024;

        if (isMobile) {
            body.setAttribute('data-sidebar', 'hidden');
        } else {
            body.setAttribute('data-sidebar', 'default');
        }
    };

    useEffect(() => {
        updateSidebarState();
        window.addEventListener('resize', updateSidebarState);
        return () => {
            window.removeEventListener('resize', updateSidebarState);
        };
    }, []);

    const handleToggle = () => {
        const body = document.body;
        const current = body.getAttribute('data-sidebar');

        if (current === 'hidden') {
            body.setAttribute('data-sidebar', 'default');
        } else {
            body.setAttribute('data-sidebar', 'hidden');
        }
    };

    return (
        <li>
            <button className="button-toggle-menu nav-link" onClick={handleToggle}>
                <Menu className="noti-icon" />
            </button>
        </li>
    );
};

export default MenuSize;
