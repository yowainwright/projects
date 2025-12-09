import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProjectsMicrofrontend } from '@/components/ProjectsMicrofrontend';

export function App() {
  return (
    <>
      <Header />
      <main className="section">
        <header className="header__description">
          <h1>Projects</h1>
          <p>
            This page showcases projects I work on—from JavaScript utilities like es-check to contributions to Koa.js, JSPM and other community projects.
          </p>
        </header>
        <ProjectsMicrofrontend />
      </main>
      <Footer />
    </>
  );
}
