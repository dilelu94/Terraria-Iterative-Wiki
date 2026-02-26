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
  const preHardmodeItems = npc.items_sold.filter(i => !i.is_hardmode);
  const hardmodeItems = npc.items_sold.filter(i => i.is_hardmode);

  const renderItemList = (itemsList: typeof npc.items_sold, title: string) => (
    <div className="recipe-box" style={{ marginBottom: '1rem' }}>
      <h3>{title}</h3>
      <div className="ingredients-list">
        {itemsList.map((sale, idx) => {
          const itemDetails = sale.item_id ? items.find(i => i.id === sale.item_id) : null;
          return (
            <div key={idx} className="ing-item" onClick={() => itemDetails && selectItem(itemDetails)}>
              {itemDetails?.image_url ? (
                <img src={itemDetails.image_url} alt={sale.item_name} className="ing-icon" />
              ) : (
                <div className="item-icon-placeholder tiny">📦</div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span className="ing-name">{itemDetails?.display_name || sale.item_name}</span>
                {sale.condition && <small style={{ fontSize: '0.7rem', opacity: 0.7 }}>{sale.condition}</small>}
              </div>
              {itemDetails && <span className="can-craft">↗</span>}
            </div>
          );
        })}
      </div>
    </div>
  );

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
            <a href={npc.wiki_url} target="_blank" rel="noreferrer" className="wiki-chip" style={{ marginTop: '1rem' }}>
              {lang === 'es' ? 'Wiki Oficial ↗' : 'Official Wiki ↗'}
            </a>
          </div>
        </div>
      </div>

      <div className="crafting-grid">
        {preHardmodeItems.length > 0 && renderItemList(preHardmodeItems, lang === 'es' ? 'Venta (Pre-Hardmode)' : 'Sells (Pre-Hardmode)')}
        {hardmodeItems.length > 0 && renderItemList(hardmodeItems, lang === 'es' ? 'Venta (Hardmode)' : 'Sells (Hardmode)')}
        {npc.items_sold.length === 0 && (
          <div className="recipe-box">
            <p className="base-material" style={{ opacity: 0.6 }}>
              {lang === 'es' ? 'Este NPC no vende ningún objeto.' : 'This NPC does not sell any items.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NPCDetail;
