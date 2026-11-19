import { useLang } from './i18n/LanguageContext.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Stats from './components/Stats.jsx';
import Products from './components/Products.jsx';
import Reports from './components/Reports.jsx';
import Marketplace from './components/Marketplace.jsx';
import Why from './components/Why.jsx';
import Process from './components/Process.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const { t } = useLang();

  return (
    <>
      <a className="skip-link" href="#main">{t('skip')}</a>
      <Header />
      <main id="main">
        <Hero />
        <Stats />
        <Products />
        <Reports />
        <Marketplace />
        <Why />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
