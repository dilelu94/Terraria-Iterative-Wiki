import React from 'react';
import { NPC, Language, Item } from '../../types';
import ShareButton from '../ShareButton';

interface NPCDetailProps {
  npc: NPC;
  lang: Language;
  onBack: () => void;
  items: Item[];
  selectItem: (item: Item | null) => void;
}

const NPCDetail: React.FC<NPCDetailProps> = ({ npc, lang, onBack, items, selectItem }) => {
  return (
    <div className="crafting-view animate-slide">
      <button className="back-btn" onClick={onBack}>
        {lang === 'es' ? '← Volver a buscar' : '← Back to search'}
      </button>
      
      <div className="item-hero">
        <div className="hero-content">
          {npc.image ? (
            <img src={npc.image} alt={npc.name_en} className="item-icon-large" />
          ) : (
            <div className="item-icon-placeholder large">👤</div>
          )}
          <div className="hero-text">
            <div className="detail-header-row">
              <h2>{npc.display_name}</h2>
              <ShareButton lang={lang} />
            </div>
            <p className="hero-subtitle">{lang === 'es' ? npc.name_en : npc.name_es}</p>
            <a href={npc.wiki_url} target="_blank" rel="noreferrer" className="wiki-chip">
              {lang === 'es' ? 'Wiki Oficial ↗' : 'Official Wiki ↗'}
            </a>
          </div>
        </div>
      </div>

      <div className="crafting-grid">
        <div className="recipe-box">
          <h3>{lang === 'es' ? 'Vende estos ítems' : 'Sells these items'}</h3>
          <div className="ingredients-list">
            {npc.items_sold.map((sale, idx) => {
              const itemDetails = sale.item_id ? items.find(i => i.id === sale.item_id) : null;
              return (
                <div key={idx} className="ing-item" onClick={() => itemDetails && selectItem(itemDetails)}>
                  {itemDetails?.image_url ? (
                    <img src={itemDetails.image_url} alt={sale.item_name} className="ing-icon" />
                  ) : (
                    <div className="item-icon-placeholder tiny">📦</div>
                  )}
                  <span className="ing-name">{itemDetails?.display_name || sale.item_name}</span>
                  {itemDetails && <span className="can-craft">↗</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NPCDetail;
