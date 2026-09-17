import { useState } from 'react';
import { NAV_LINKS, BRAND } from '../data/navigation';
import { useTheme } from '../hooks/useTheme';

function SunIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
    );
}

function MoonIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 14.5A8.5 8.5 0 1 1 9.5 3a7 7 0 0 0 11.5 11.5z" />
        </svg>
    );
}

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isLight = theme === 'light';
    const themeLabel = isLight ? '切換為深色主題' : '切換為淺色主題';

    return (
        <header className="navbar" role="banner">
            <div className="navbar__inner container">
                <a href="/" className="navbar__brand" aria-label={`${BRAND.name} 首頁`}>
                    <span className="navbar__logo" aria-hidden="true">◆</span>
                    <span className="navbar__brand-name">{BRAND.name}</span>
                </a>

                <div className="navbar__actions">
                    <button
                        type="button"
                        className="navbar__theme-toggle"
                        onClick={toggleTheme}
                        aria-label={themeLabel}
                        title={themeLabel}
                    >
                        {isLight ? <MoonIcon /> : <SunIcon />}
                    </button>

                    <button
                        type="button"
                        className="navbar__toggle"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-expanded={menuOpen}
                        aria-controls="nav-menu"
                        aria-label="切換導覽選單"
                    >
                        <span className="navbar__toggle-bar" />
                        <span className="navbar__toggle-bar" />
                        <span className="navbar__toggle-bar" />
                    </button>
                </div>

                <nav
                    id="nav-menu"
                    className={`navbar__nav ${menuOpen ? 'navbar__nav--open' : ''}`}
                    role="navigation"
                    aria-label="主要導覽"
                >
                    <ul className="navbar__list">
                        {NAV_LINKS.map((link) => (
                            <li key={link.href} className="navbar__item">
                                <a href={link.href} className="navbar__link" onClick={() => setMenuOpen(false)}>
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <button
                        type="button"
                        className="navbar__theme-toggle navbar__theme-toggle--desktop"
                        onClick={toggleTheme}
                        aria-label={themeLabel}
                        title={themeLabel}
                    >
                        {isLight ? <MoonIcon /> : <SunIcon />}
                    </button>
                    <a href="#demo" className="btn btn--primary btn--sm navbar__cta">
                        預約 Demo
                    </a>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;
