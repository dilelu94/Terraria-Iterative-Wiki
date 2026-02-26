import React from 'react';
import { EventBoss, Language, Item } from '../../types';

interface EventBossDetailProps {
  boss: EventBoss;
  lang: Language;
  onBack: () => void;
  items: Item[];
  selectItem: (item: Item | null) => void;
}

const DIFFICULTY_ICONS = {
  classic: "https://terraria.wiki.gg/images/thumb/Classic_Mode.png/12px-Classic_Mode.png",
  expert: "https://terraria.wiki.gg/images/thumb/Expert_Mode.png/12px-Expert_Mode.png",
  master: "https://terraria.wiki.gg/images/thumb/Master_Mode.png/12px-Master_Mode.png"
};

const StatWithIcons: React.FC<{ value: string }> = ({ value }) => {
  const parts = value.split(' / ');
  if (parts.length >= 2) {
    return (
      <div className="stat-with-icons">
        <span className="stat-part"><img src={DIFFICULTY_ICONS.classic} alt="Classic" /> {parts[0]}</span>
        <span className="stat-part"><img src={DIFFICULTY_ICONS.expert} alt="Expert" /> {parts[1]}</span>
        {parts[2] && <span className="stat-part"><img src={DIFFICULTY_ICONS.master} alt="Master" /> {parts[2]}</span>}
      </div>
    );
  }
  return <span>{value}</span>;
};

const EventBossDetail: React.FC<EventBossDetailProps> = ({ boss, lang, onBack, items, selectItem }) => {
  return (
    <div className="crafting-view animate-slide">
      <button className="back-btn" onClick={onBack}>
        {lang === 'es' ? '← Volver a buscar' : '← Back to search'}
      </button>
      
      <div className="item-hero">
        <div className="hero-content">
          {boss.image ? (
            <img src={boss.image} alt={boss.name_en} className="item-icon-large" />
          ) : (
            <div className="item-icon-placeholder large">👹</div>
          )}
          <div className="hero-text">
            <h2>{boss.display_name}</h2>
            <p className="hero-subtitle">{lang === 'es' ? boss.name_en : boss.name_es}</p>
            <div className="enemy-stats-row hero-stats">
              <div className="stat-pill">❤️ <StatWithIcons value={boss.health} /></div>
              <div className="stat-pill">⚔️ <StatWithIcons value={boss.damage} /></div>
              <div className="stat-pill">🛡️ {boss.defense}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="crafting-grid">
        <div className="recipe-box">
          <h3>{lang === 'es' ? 'Información' : 'Information'}</h3>
          <div className="info-list">
            <div className="info-item">
              <strong>{lang === 'es' ? 'Evento / Bioma:' : 'Event / Biome:'}</strong> {boss.display_biome}
            </div>
          </div>
        </div>

        <div className="raw-materials-box">
          <h3>{lang === 'es' ? 'Botín Principal (Drops)' : 'Main Drops'}</h3>
          {boss.drops && boss.drops.length > 0 ? (
            <div className="ingredients-list">
              {boss.drops.map((dropName, idx) => {
                const itemDetails = items.find(i => i.name_en.toLowerCase() === dropName.toLowerCase() || i.name_es.toLowerCase() === dropName.toLowerCase());
                return (
                  <div key={idx} className="ing-item" onClick={() => itemDetails && selectItem(itemDetails)}>
                    {itemDetails?.image_url ? (
                      <img src={itemDetails.image_url} alt={dropName} className="ing-icon" />
                    ) : (
                      <div className="item-icon-placeholder tiny">📦</div>
                    )}
                    <span className="ing-name">{itemDetails?.display_name || dropName}</span>
                    {itemDetails && <span className="can-craft">↗</span>}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="base-material">
              {lang === 'es' ? 'No hay información de botín.' : 'No drop information available.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventBossDetail;
