import React from 'react';
import { Item, Enemy, NPC, Boss, Language, ViewType, EventBoss, Mimic } from '../types';
import { ItemCard, EnemyCard, NPCCard, BossCard, EventBossCard, MimicCard } from './Cards';

interface ItemListProps {
  view: ViewType;
  results: (Item | Enemy | NPC | Boss | EventBoss | Mimic)[];
  lang: Language;
  onSelect: (entity: any) => void;
}

const ItemList: React.FC<ItemListProps> = ({ view, results, lang, onSelect }) => {
  return (
    <div className="item-list">
      {view === 'items' && (results as Item[]).map(item => (
        <ItemCard key={item.id} item={item} lang={lang} onClick={() => onSelect(item)} />
      ))}

      {view === 'enemies' && (results as Enemy[]).map(enemy => (
        <EnemyCard key={enemy.id} enemy={enemy} lang={lang} onClick={() => onSelect(enemy)} />
      ))}

      {view === 'npcs' && (results as NPC[]).map(npc => (
        <NPCCard key={npc.id} npc={npc} lang={lang} onClick={() => onSelect(npc)} />
      ))}

      {view === 'bosses' && (results as Boss[]).map(boss => (
        <BossCard key={boss.id} boss={boss} lang={lang} onClick={() => onSelect(boss)} />
      ))}

      {view === 'event_bosses' && (results as EventBoss[]).map(boss => (
        <EventBossCard key={boss.id} boss={boss} lang={lang} onClick={() => onSelect(boss)} />
      ))}

      {view === 'mimics' && (results as Mimic[]).map(mimic => (
        <MimicCard key={mimic.id} mimic={mimic} lang={lang} onClick={() => onSelect(mimic)} />
      ))}
    </div>
  );
};

export default ItemList;
