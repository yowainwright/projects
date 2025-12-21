import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProjectsMicrofrontend } from '@/components/ProjectsMicrofrontend';

export function App() {
  return (
    <>
      <Header />
      <main className="section">
        <header className="header__description">
          <h1>
            Projects showcase: This page showcase projects I work on, maintain, or have done so in the past.
          </h1>
        </header>
        <ProjectsMicrofrontend />
      </main>
      <Footer />
    </>
  );
}
