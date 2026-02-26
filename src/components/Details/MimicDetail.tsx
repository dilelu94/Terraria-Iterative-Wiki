import React from 'react';
import { Mimic, Language, Item } from '../../types';
import ShareButton from '../ShareButton';

interface MimicDetailProps {
  mimic: Mimic;
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

const MimicDetail: React.FC<MimicDetailProps> = ({ mimic, lang, onBack, items, selectItem }) => {
  const keyItem = mimic.key_item_id ? items.find(i => i.id === mimic.key_item_id) : null;

  return (
    <div className="crafting-view animate-slide">
      <button className="back-btn" onClick={onBack}>
        {lang === 'es' ? '← Volver a buscar' : '← Back to search'}
      </button>
      
      <div className="item-hero">
        <div className="hero-content">
          {mimic.image ? (
            <img src={mimic.image} alt={mimic.name_en} className="item-icon-large" />
          ) : (
            <div className="item-icon-placeholder large">📦</div>
          )}
          <div className="hero-text">
            <div className="detail-header-row">
              <h2>{mimic.display_name}</h2>
              <ShareButton lang={lang} />
            </div>
            <p className="hero-subtitle">{lang === 'es' ? mimic.name_en : (mimic.name_es || "Terraria Mimic")}</p>
            <a href={mimic.wiki_url} target="_blank" rel="noreferrer" className="wiki-chip">
              {lang === 'es' ? 'Wiki Oficial ↗' : 'Official Wiki ↗'}
            </a>
            <div className="enemy-stats-row hero-stats">
              <div className="stat-pill">❤️ <StatWithIcons value={mimic.health} /></div>
              <div className="stat-pill">⚔️ <StatWithIcons value={mimic.damage} /></div>
              <div className="stat-pill">🛡️ {mimic.defense}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="crafting-grid">
        <div className="recipe-box">
          <h3>{lang === 'es' ? 'Información de Aparición' : 'Spawn Information'}</h3>
          <div className="info-list">
            <div className="info-item">
              <strong>{lang === 'es' ? 'Bioma:' : 'Biome:'}</strong> {mimic.display_biome}
            </div>
            <div className="info-item">
              <strong>{lang === 'es' ? 'Llave de Invocación:' : 'Summon Key:'}</strong> 
              {keyItem ? (
                <div className="ing-item" onClick={() => selectItem(keyItem)} style={{ marginTop: '0.5rem', padding: '0.5rem' }}>
                  {keyItem.image_url ? (
                    <img src={keyItem.image_url} alt={keyItem.name_en} className="ing-icon" />
                  ) : (
                    <div className="item-icon-placeholder tiny">🔑</div>
                  )}
                  <span className="ing-name" style={{ color: 'var(--accent)' }}>{mimic.summon_key.split(' (')[0]}</span>
                  <span className="can-craft">↗</span>
                </div>
              ) : (
                <span style={{ display: 'block', marginTop: '0.2rem' }}>{mimic.summon_key.split(' (')[0]}</span>
              )}
            </div>
          </div>
        </div>

        <div className="raw-materials-box">
          <h3>{lang === 'es' ? 'Botín Principal (Drops)' : 'Main Drops'}</h3>
          {mimic.drops && mimic.drops.length > 0 ? (
            <div className="ingredients-list">
              {mimic.drops.map((drop, idx) => {
                const itemDetails = drop.item_id ? items.find(i => i.id === drop.item_id) : null;
                return (
                  <div key={idx} className="ing-item" onClick={() => itemDetails && selectItem(itemDetails)}>
                    {itemDetails?.image_url ? (
                      <img src={itemDetails.image_url} alt={drop.item_name} className="ing-icon" />
                    ) : (
                      <div className="item-icon-placeholder tiny">📦</div>
                    )}
                    <span className="ing-name">{itemDetails?.display_name || drop.item_name}</span>
                    {itemDetails && <span className="can-craft">↗</span>}
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="base-material">
              {lang === 'es' ? 'No tiene drops únicos.' : 'No unique drops.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MimicDetail;
