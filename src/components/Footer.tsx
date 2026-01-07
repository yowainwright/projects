const SOCIAL_ITEMS = [
  { name: 'Github', path: 'https://github.com/yowainwright', small: true },
  { name: 'Instagram', path: 'https://instagram.com/yowainwright', small: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/in/jeffrywainwright/', small: true },
  { name: 'RSS', path: 'https://jeffry.in/rss.xml', small: true },
];

function SocialList() {
  const getSocialId = (name: string) => name.toLowerCase();
  return (
    <ul id="social-list" className="social-list">
      {SOCIAL_ITEMS.map(({ name, path, small }, i) => (
        <li
          key={i}
          id={`social-item-${getSocialId(name)}`}
          className={`social-list__item social-list__item--${small ? 'showing' : 'hidden'}`}
        >
          <a id={`social-link-${getSocialId(name)}`} href={path} className="social-list__link">
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function SocialFooter() {
  return (
    <nav id="social-footer" className="social-footer">
      <SocialList />
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      id="site-footer"
      className="site-footer"
      role="contentinfo"
      itemType="http://schema.org/WPFooter"
    >
      <section id="site-footer-main" className="site-footer__wrapper site-footer__wrapper--main">
        <article id="site-footer-contact" className="site-footer__col site-footer__col--contact">
          <h3 id="site-footer-contact-title" className="site-footer__title">Contact</h3>
          <address id="site-footer-address" className="site-footer__address">
            <p id="site-footer-tagline" className="site-footer__content">Happy to chat, learn, help!</p>
            <p id="site-footer-contact-info" className="site-footer__content">
              <a id="site-footer-email" href="mailto:yowainwright@gmail.com">yowainwright@gmail.com</a>,
              Los Angeles, CA
            </p>
          </address>
        </article>
        <div id="site-footer-social" className="site-footer__col site-footer__col site-footer__col--social">
          <h3 id="site-footer-social-title" className="site-footer__title">Connect</h3>
          <SocialFooter />
        </div>
        <article id="site-footer-about" className="site-footer__col site-footer__col--self">
          <h3 id="site-footer-about-title" className="site-footer__title site-footer__title--self">About</h3>
          <figure id="site-footer-figure" className="site-footer__figure">
            <img
              id="site-footer-avatar"
              className="media--circular site-footer__image"
              src="https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=150&h=150&fit=crop&auto=format"
              height="100%"
              width="100%"
              alt="Me smiling with a beard"
            />
            <figcaption id="site-footer-caption" className="site-footer__caption">
              <a id="site-footer-home-link" className="site-footer__link" href="https://jeffry.in">
                <strong>jeffry.in</strong>, {new Date().getFullYear()}
              </a>
              , is the blog of{' '}
              <a id="site-footer-about-link" className="site-footer__link" href="https://jeffry.in/about">
                Jeffry (Jeff) Wainwright
              </a>
              , a software engineer, person, living in Los Angeles.
            </figcaption>
          </figure>
        </article>
      </section>
      <section id="site-footer-copyright" className="site-footer__wrapper site-footer__wrapper--last">
        <h3 id="site-footer-copyright-title" className="site-footer__title site-footer__title--last">
          <a id="site-footer-copyright-link" className="site-footer__link" href="https://jeffry.in">
            jeffry.in
          </a>
          , {new Date().getFullYear()}
        </h3>
      </section>
    </footer>
  );
}
