import React from 'react';
import { Item, Enemy, NPC, Boss, Language, Mimic } from '../types';
import { categoryTranslations } from '../constants/translations';

interface CardProps {
  lang: Language;
  onClick: () => void;
}

export const ItemCard: React.FC<CardProps & { item: Item }> = ({ item, lang, onClick }) => (
  <div className="item-card" onClick={onClick}>
    <div className="item-preview">
      {item.image_url ? (
        <img src={item.image_url} alt={item.name_en} className="item-icon-small" />
      ) : (
        <div className="item-icon-placeholder small">📦</div>
      )}
      <div className="item-info">
        <h3>{item.display_name}</h3>
        <p className="item-subname">{lang === 'es' ? item.name_en : item.name_es}</p>
        <span className="category-tag">
          {lang === 'es' ? (categoryTranslations[item.category] || item.category) : item.category}
        </span>
      </div>
    </div>
    <div className="card-action">{lang === 'es' ? 'Receta →' : 'Recipe →'}</div>
  </div>
);

export const EnemyCard: React.FC<CardProps & { enemy: Enemy }> = ({ enemy, lang, onClick }) => (
  <div className="item-card" onClick={onClick}>
    <div className="item-preview">
      {enemy.image ? (
        <img src={enemy.image} alt={enemy.name_en} className="item-icon-small" />
      ) : (
        <div className="item-icon-placeholder small">💀</div>
      )}
      <div className="item-info">
        <h3>{enemy.display_name}</h3>
        <p className="item-subname">{lang === 'es' ? enemy.name_en : enemy.name_es}</p>
        <div className="enemy-stats-row">
          <span>❤️ {enemy.health}</span>
          <span>⚔️ {enemy.damage}</span>
          <span>🛡️ {enemy.defense}</span>
        </div>
      </div>
    </div>
    <div className="card-action">{lang === 'es' ? 'Detalles →' : 'Details →'}</div>
  </div>
);

export const NPCCard: React.FC<CardProps & { npc: NPC }> = ({ npc, lang, onClick }) => (
  <div className="item-card" onClick={onClick}>
    <div className="item-preview">
      {npc.image ? (
        <img src={npc.image} alt={npc.name_en} className="item-icon-small" />
      ) : (
        <div className="item-icon-placeholder small">👤</div>
      )}
      <div className="item-info">
        <h3>{npc.display_name}</h3>
        <p className="item-subname">{lang === 'es' ? npc.name_en : npc.name_es}</p>
        <span className="category-tag">
          {lang === 'es' ? 'Aldeano' : 'Town NPC'}
        </span>
      </div>
    </div>
    <div className="card-action">{lang === 'es' ? 'Tienda →' : 'Shop →'}</div>
  </div>
);

export const BossCard: React.FC<CardProps & { boss: Boss }> = ({ boss, lang, onClick }) => (
  <div className="item-card" onClick={onClick}>
    <div className="item-preview">
      {boss.image ? (
        <img src={boss.image} alt={boss.name_en} className="item-icon-small" />
      ) : (
        <div className="item-icon-placeholder small">👑</div>
      )}
      <div className="item-info">
        <h3>{boss.display_name}</h3>
        <p className="item-subname">{lang === 'es' ? boss.name_en : boss.name_es}</p>
        <div className="enemy-stats-row">
          <span>❤️ {boss.health}</span>
          <span>⚔️ {boss.damage}</span>
          <span>🛡️ {boss.defense}</span>
        </div>
      </div>
    </div>
    <div className="card-action">{lang === 'es' ? 'Detalles →' : 'Details →'}</div>
  </div>
);

export const EventBossCard: React.FC<CardProps & { boss: any }> = ({ boss, lang, onClick }) => (
  <div className="item-card" onClick={onClick}>
    <div className="item-preview">
      {boss.image ? (
        <img src={boss.image} alt={boss.name_en} className="item-icon-small" />
      ) : (
        <div className="item-icon-placeholder small">👹</div>
      )}
      <div className="item-info">
        <h3>{boss.display_name}</h3>
        <p className="item-subname">{lang === 'es' ? boss.name_en : boss.name_es}</p>
        <div className="enemy-stats-row">
          <span>❤️ {boss.health}</span>
          <span>⚔️ {boss.damage}</span>
          <span>🛡️ {boss.defense}</span>
        </div>
      </div>
    </div>
    <div className="card-action">{lang === 'es' ? 'Detalles →' : 'Details →'}</div>
  </div>
);

export const MimicCard: React.FC<CardProps & { mimic: Mimic }> = ({ mimic, lang, onClick }) => (
  <div className="item-card" onClick={onClick}>
    <div className="item-preview">
      {mimic.image ? (
        <img src={mimic.image} alt={mimic.name_en} className="item-icon-small" />
      ) : (
        <div className="item-icon-placeholder small">📦</div>
      )}
      <div className="item-info">
        <h3>{mimic.display_name}</h3>
        <p className="item-subname">{lang === 'es' ? mimic.name_en : mimic.name_es}</p>
        <div className="enemy-stats-row">
          <span>❤️ {mimic.health}</span>
          <span>⚔️ {mimic.damage}</span>
          <span>🛡️ {mimic.defense}</span>
        </div>
      </div>
    </div>
    <div className="card-action">{lang === 'es' ? 'Detalles →' : 'Details →'}</div>
  </div>
);
