import React from 'react';
import { Language, ViewType } from '../types';

interface HeaderProps {
  lang: Language;
  setLang: (lang: Language) => void;
  view: ViewType;
  setView: (view: ViewType) => void;
  resetSelections: () => void;
}

const Header: React.FC<HeaderProps> = ({ lang, setLang, view, setView, resetSelections }) => {
  return (
    <header className="main-header">
      <div className="lang-switcher">
        <button 
          className={`lang-btn ${lang === 'es' ? 'active' : ''}`} 
          onClick={() => setLang('es')}
        >ES</button>
        <button 
          className={`lang-btn ${lang === 'en' ? 'active' : ''}`} 
          onClick={() => setLang('en')}
        >EN</button>
      </div>
      
      <nav className="view-nav">
        <button 
          className={`nav-link ${view === 'items' ? 'active' : ''}`}
          onClick={() => setView('items')}
        >
          {lang === 'es' ? 'Ítems' : 'Items'}
        </button>
        <button 
          className={`nav-link ${view === 'npcs' ? 'active' : ''}`}
          onClick={() => setView('npcs')}
        >
          {lang === 'es' ? 'Aldeanos' : 'NPCs'}
        </button>
        <button 
          className={`nav-link ${view === 'bosses' ? 'active' : ''}`}
          onClick={() => setView('bosses')}
        >
          {lang === 'es' ? 'Jefes' : 'Bosses'}
        </button>
        <button 
          className={`nav-link ${view === 'event_bosses' ? 'active' : ''}`}
          onClick={() => setView('event_bosses')}
        >
          {lang === 'es' ? 'Eventos' : 'Event Bosses'}
        </button>
        <button 
          className={`nav-link ${view === 'mimics' ? 'active' : ''}`}
          onClick={() => setView('mimics')}
        >
          {lang === 'es' ? 'Mímicos' : 'Mimics'}
        </button>
        <button 
          className={`nav-link ${view === 'enemies' ? 'active' : ''}`}
          onClick={() => setView('enemies')}
        >
          {lang === 'es' ? 'Enemigos' : 'Enemies'}
        </button>
        <button 
          className={`nav-link ${view === 'shimmer' ? 'active' : ''}`}
          onClick={() => setView('shimmer')}
        >
          {lang === 'es' ? 'Fulgor' : 'Shimmer'}
        </button>
      </nav>

      <h1 onClick={resetSelections}>TIW: Terraria Iterative Wiki</h1>
      <p>{lang === 'es' ? 'Tu guía interactiva definitiva' : 'Your ultimate interactive guide'}</p>
    </header>
  );
};

export default Header;
