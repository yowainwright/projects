const SOCIAL_ITEMS = [
  { name: 'Github', path: 'https://github.com/yowainwright', small: true },
  { name: 'Instagram', path: 'https://instagram.com/yowainwright', small: true },
  { name: 'LinkedIn', path: 'https://www.linkedin.com/in/jeffrywainwright/', small: true },
];

function SocialList() {
  return (
    <ul className="social-list">
      {SOCIAL_ITEMS.map(({ name, path, small }, i) => (
        <li
          key={i}
          className={`social-list__item social-list__item--${small ? 'showing' : 'hidden'}`}
        >
          <a href={path} className="social-list__link">
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
}

function SocialFooter() {
  return (
    <nav className="social-footer">
      <SocialList />
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      className="site-footer"
      role="contentinfo"
      itemType="http://schema.org/WPFooter"
    >
      <section className="site-footer__wrapper site-footer__wrapper--main">
        <article className="site-footer__col site-footer__col--contact">
          <h3 className="site-footer__title">Contact</h3>
          <address className="site-footer__address">
            <p className="site-footer__content">Happy to chat, learn, help!</p>
            <p className="site-footer__content">
              <a href="mailto:yowainwright@gmail.com">yowainwright@gmail.com</a>,
              Los Angeles, CA
            </p>
          </address>
        </article>
        <div className="site-footer__col site-footer__col site-footer__col--social">
          <h3 className="site-footer__title">Connect</h3>
          <SocialFooter />
        </div>
        <article className="site-footer__col site-footer__col--self">
          <h3 className="site-footer__title site-footer__title--self">About</h3>
          <figure className="site-footer__figure">
            <img
              className="media--circular site-footer__image"
              src="https://yowainwright.imgix.net/portraits/me-smiling.jpg?w=150&h=150&fit=crop&auto=format"
              height="100%"
              width="100%"
              alt="Me smiling with a beard"
            />
            <figcaption className="site-footer__caption">
              <a className="site-footer__link" href="https://jeffry.in">
                <strong>jeffry.in</strong>, {new Date().getFullYear()}
              </a>
              , is the blog of{' '}
              <a className="site-footer__link" href="https://jeffry.in/about">
                Jeffry (Jeff) Wainwright
              </a>
              , a software engineer, person, living in Los Angeles.
            </figcaption>
          </figure>
        </article>
      </section>
      <section className="site-footer__wrapper site-footer__wrapper--last">
        <h3 className="site-footer__title site-footer__title--last">
          <a className="site-footer__link" href="https://jeffry.in">
            jeffry.in
          </a>
          , {new Date().getFullYear()}
        </h3>
      </section>
    </footer>
  );
}
