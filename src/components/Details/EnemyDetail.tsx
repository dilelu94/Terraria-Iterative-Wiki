import React from 'react';
import { Enemy, Language, Item } from '../../types';
import ShareButton from '../ShareButton';

interface EnemyDetailProps {
  enemy: Enemy;
  lang: Language;
  onBack: () => void;
  items: Item[];
  setSelectedItem: (item: Item | null) => void;
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

const EnemyDetail: React.FC<EnemyDetailProps> = ({ enemy, lang, onBack, items, setSelectedItem }) => {
  return (
    <div className="crafting-view animate-slide">
      <button className="back-btn" onClick={onBack}>
        {lang === 'es' ? '← Volver a buscar' : '← Back to search'}
      </button>
      
      <div className="item-hero">
        <div className="hero-content">
          {enemy.image ? (
            <img src={enemy.image} alt={enemy.name_en} className="item-icon-large" />
          ) : (
            <div className="item-icon-placeholder large">💀</div>
          )}
          <div className="hero-text">
            <div className="detail-header-row">
              <h2>{enemy.display_name}</h2>
              <ShareButton lang={lang} />
            </div>
            <p className="hero-subtitle">{lang === 'es' ? enemy.name_en : enemy.name_es}</p>
            <div className="enemy-stats-row hero-stats">
              <div className="stat-pill" title="Health">
                ❤️ <StatWithIcons value={enemy.health} />
              </div>
              <div className="stat-pill" title="Damage">
                ⚔️ <StatWithIcons value={enemy.damage} />
              </div>
              <div className="stat-pill" title="Defense">
                🛡️ {enemy.defense}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="crafting-grid">
        <div className="recipe-box">
          <h3>{lang === 'es' ? 'Información' : 'Information'}</h3>
          <div className="info-list">
            <div className="info-item">
              <strong>{lang === 'es' ? 'Bioma:' : 'Biome:'}</strong> {enemy.display_biome}
            </div>
            <div className="info-item">
              <strong>{lang === 'es' ? 'Tiempo:' : 'Time:'}</strong> {enemy.display_time}
            </div>
          </div>
        </div>

        <div className="raw-materials-box">
          <h3>{lang === 'es' ? 'Botín (Drops)' : 'Drops'}</h3>
          {enemy.drops && enemy.drops.length > 0 ? (
            <div className="ingredients-list">
              {enemy.drops.map((drop, idx) => {
                const itemDetails = items.find(i => i.id === drop.item_id);
                return (
                  <div key={idx} className="ing-item" onClick={() => itemDetails && setSelectedItem(itemDetails)}>
                    {itemDetails?.image_url ? (
                      <img src={itemDetails.image_url} alt={drop.item_name} className="ing-icon" />
                    ) : (
                      <div className="item-icon-placeholder tiny">📦</div>
                    )}
                    <span className="ing-name">{itemDetails?.display_name || drop.item_name}</span>
                    {drop.chance && <span className="chance-pill">{drop.chance}</span>}
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

export default EnemyDetail;
