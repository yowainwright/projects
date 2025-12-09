import { useEffect, useState } from 'react';

const NAV_ITEMS = [
  { alias: 'resume', name: 'Resume', path: 'https://jeffry.in/resume/' },
  { alias: 'archive', name: 'Archive', path: 'https://jeffry.in/archive/' },
  { alias: 'projects', name: 'Projects', path: '/projects/' },
  { alias: 'about', name: 'About', path: 'https://jeffry.in/about/' },
];

function Moon() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
      <path d="M9.37 5.51c-.18.64-.27 1.31-.27 1.99 0 4.08 3.32 7.4 7.4 7.4.68 0 1.35-.09 1.99-.27C17.45 17.19 14.93 19 12 19c-3.86 0-7-3.14-7-7 0-2.93 1.81-5.45 4.37-6.49zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z" />
    </svg>
  );
}

function Sun() {
  return (
    <svg viewBox="0 0 24 24" style={{ width: '100%', height: '100%' }}>
      <path d="m6.76 4.84-1.8-1.79-1.41 1.41 1.79 1.79zM1 10.5h3v2H1zM11 .55h2V3.5h-2zm8.04 2.495 1.408 1.407-1.79 1.79-1.407-1.408zm-1.8 15.115 1.79 1.8 1.41-1.41-1.8-1.79zM20 10.5h3v2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm-1 4h2v2.95h-2zm-7.45-.96 1.41 1.41 1.79-1.8-1.41-1.41z" />
    </svg>
  );
}

function Icon({ isDarkMode }: { isDarkMode: boolean }) {
  return isDarkMode ? <Sun /> : <Moon />;
}

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedPreference = localStorage.getItem('darkMode');
    if (storedPreference !== null) {
      setIsDarkMode(storedPreference === 'true');
    } else {
      setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if (isDarkMode) {
      body?.classList.add('js-is-darkmode');
    } else {
      body?.classList.remove('js-is-darkmode');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  const handleToggle = () => setIsDarkMode(!isDarkMode);

  return (
    <nav
      id="site-nav"
      className="site-nav"
      role="navigation"
      itemType="http://schema.org/SiteNavigationElement"
    >
      <section className="site-nav__container">
        <a href="https://jeffry.in" className="logo">
          <h3 className="logo__title">j</h3>
        </a>
        <div className="site-nav__links-wrapper">
          <ul className="site-nav__items">
            {NAV_ITEMS.map(({ alias, name, path }) => (
              <li key={alias} className={`site-nav__item site-nav__item--${alias}`}>
                <a
                  className={`site-nav__link site-nav__link--${alias}`}
                  href={path}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="site-nav__toggle"
            onClick={handleToggle}
            title="Toggle Darkmode"
          >
            <Icon isDarkMode={isDarkMode} />
          </button>
        </div>
      </section>
    </nav>
  );
}
