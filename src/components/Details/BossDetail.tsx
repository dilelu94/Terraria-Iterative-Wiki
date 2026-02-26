import React, { useState } from 'react';
import { Boss, Language, Item } from '../../types';
import ShareButton from '../ShareButton';

interface BossDetailProps {
  boss: Boss;
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

const BossDetail: React.FC<BossDetailProps> = ({ boss, lang, onBack, items, selectItem }) => {
  const [isExpertOpen, setIsExpertOpen] = useState(false);

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
            <div className="item-icon-placeholder large">👑</div>
          )}
          <div className="hero-text">
            <div className="detail-header-row">
              <h2>{boss.display_name}</h2>
              <ShareButton lang={lang} />
            </div>
            <p className="hero-subtitle">{lang === 'es' ? boss.name_en : boss.name_es}</p>
            <div className="enemy-stats-row hero-stats">
              <div className="stat-pill">❤️ <StatWithIcons value={boss.health} /></div>
              <div className="stat-pill">⚔️ <StatWithIcons value={boss.damage} /></div>
              <div className="stat-pill">🛡️ {boss.defense}</div>
            </div>
            <a href={boss.wiki_url} target="_blank" rel="noreferrer" className="wiki-chip" style={{ marginTop: '1rem' }}>
              {lang === 'es' ? 'Wiki Oficial ↗' : 'Official Wiki ↗'}
            </a>
          </div>
        </div>
      </div>

      <div className="crafting-grid">
        {/* Caja de Botín Unificada */}
        <div className="boss-loot-container">
          <h3 className="loot-section-title">
            🎁 {lang === 'es' ? 'Botín Completo' : 'Complete Loot'}
          </h3>
          
          <div className="loot-grid" style={{ marginBottom: boss.treasure_bag ? '1.5rem' : '0' }}>
            {boss.drops.map((drop, idx) => {
              const itemDetails = drop.item_id ? items.find(i => i.id === drop.item_id) : null;
              return (
                <div key={idx} className="ing-item" onClick={() => itemDetails && selectItem(itemDetails)}>
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

          {boss.treasure_bag && (
            <div className="treasure-bag-accordion">
              <div 
                className="accordion-header" 
                onClick={() => setIsExpertOpen(!isExpertOpen)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img 
                    src={`https://terraria.wiki.gg/wiki/Special:FilePath/${boss.treasure_bag.item_name.replace(/ /g, '_')}.png`} 
                    alt={boss.treasure_bag.item_name} 
                    style={{ width: '24px', height: '24px' }}
                  />
                  <strong>{lang === 'es' ? 'Bolsa de Tesoro (Botín Experto)' : 'Treasure Bag (Expert Drops)'}</strong>
                </div>
                <span className={`accordion-icon ${isExpertOpen ? 'open' : ''}`}>▼</span>
              </div>
              
              <div className={`accordion-content ${isExpertOpen ? 'open' : ''}`}>
                <div className="loot-grid">
                  {boss.expert_drops && boss.expert_drops.map((drop, idx) => {
                    const itemDetails = items.find(i => i.id === drop.item_id);
                    return (
                      <div key={idx} className="ing-item" onClick={() => itemDetails && selectItem(itemDetails)}>
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
              </div>
            </div>
          )}
        </div>

        <div className="recipe-box" style={{ gridColumn: '1 / -1' }}>
          <h3>{lang === 'es' ? 'Información' : 'Information'}</h3>
          <div className="info-list">
            <div className="info-item">
              <strong>{lang === 'es' ? 'Bioma:' : 'Biome:'}</strong> {boss.display_biome}
            </div>
            <div className="info-item">
              <strong>{lang === 'es' ? 'Tiempo:' : 'Time:'}</strong> {boss.display_time}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BossDetail;
