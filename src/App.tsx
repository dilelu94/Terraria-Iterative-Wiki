import React, { useState, useMemo, useEffect } from 'react';
import { useData } from './hooks/useData';
import { Item, Enemy, NPC, Boss, EventBoss, Mimic, Language, ViewType } from './types';
import { calculateTotalMaterials } from './utils/crafting';
import Header from './components/Header';
import SearchFilters from './components/SearchFilters';
import ItemList from './components/ItemList';
import Pagination from './components/Pagination';
import ItemDetail from './components/Details/ItemDetail';
import EnemyDetail from './components/Details/EnemyDetail';
import NPCDetail from './components/Details/NPCDetail';
import BossDetail from './components/Details/BossDetail';
import EventBossDetail from './components/Details/EventBossDetail';
import MimicDetail from './components/Details/MimicDetail';

function App() {
  const { items: rawItems, enemies: rawEnemies, npcs: rawNPCs, bosses: rawBosses, eventBosses: rawEventBosses, mimics: rawMimics, loading, error } = useData();
  
  const [view, setView] = useState<ViewType>('items');
  const [lang, setLang] = useState<Language>('es');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBiome, setSelectedBiome] = useState<string>('All');
  const [selectedTime, setSelectedTime] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);
  const [selectedNPC, setSelectedNPC] = useState<NPC | null>(null);
  const [selectedBoss, setSelectedBoss] = useState<Boss | null>(null);
  const [selectedEventBoss, setSelectedEventBoss] = useState<EventBoss | null>(null);
  const [selectedMimic, setSelectedMimic] = useState<Mimic | null>(null);
  const [navigationHistory, setNavigationHistory] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const items = useMemo(() => {
    return rawItems.map(item => ({
      ...item,
      display_name: lang === 'es' ? (item.name_es || item.name_en) : item.name_en
    })) as Item[];
  }, [rawItems, lang]);

  const enemies = useMemo(() => {
    return rawEnemies.map(enemy => ({
      ...enemy,
      display_name: lang === 'es' ? (enemy.name_es || enemy.name_en) : enemy.name_en,
      display_biome: lang === 'es' ? enemy.biome_es : enemy.biome_en,
      display_time: lang === 'es' ? enemy.time_es : enemy.time_en
    })) as Enemy[];
  }, [rawEnemies, lang]);

  const npcs = useMemo(() => {
    return rawNPCs.map(npc => ({
      ...npc,
      display_name: lang === 'es' ? (npc.name_es || npc.name_en) : npc.name_en
    })) as NPC[];
  }, [rawNPCs, lang]);

  const bosses = useMemo(() => {
    return rawBosses.map(boss => ({
      ...boss,
      display_name: lang === 'es' ? (boss.name_es || boss.name_en) : boss.name_en,
      display_biome: lang === 'es' ? (boss.biome_es || boss.biome) : (boss.biome_en || boss.biome),
      display_time: lang === 'es' ? (boss.time_es || boss.time) : (boss.time_en || boss.time)
    })) as Boss[];
  }, [rawBosses, lang]);

  const eventBosses = useMemo(() => {
    return rawEventBosses.map(boss => ({
      ...boss,
      display_name: lang === 'es' ? (boss.name_es || boss.name_en) : boss.name_en,
      display_biome: lang === 'es' ? boss.biome_es : boss.biome_en
    })) as EventBoss[];
  }, [rawEventBosses, lang]);

  const mimics = useMemo(() => {
    return rawMimics.map(mimic => ({
      ...mimic,
      display_name: lang === 'es' ? (mimic.name_es || mimic.name_en) : mimic.name_en,
      display_biome: lang === 'es' ? mimic.biome_es : mimic.biome_en
    })) as Mimic[];
  }, [rawMimics, lang]);

  const resetAllSelections = () => {
    setSelectedItem(null);
    setSelectedEnemy(null);
    setSelectedNPC(null);
    setSelectedBoss(null);
    setSelectedEventBoss(null);
    setSelectedMimic(null);
  };

  const selectItem = (item: Item | null) => {
    if (item === null) {
      setNavigationHistory([]);
    } else if (selectedItem && item.id !== selectedItem.id) {
      setNavigationHistory(prev => [...prev, selectedItem]);
    }
    setSelectedItem(item);
    if (item) {
      setSelectedEnemy(null);
      setSelectedNPC(null);
      setSelectedBoss(null);
      setSelectedEventBoss(null);
      setSelectedMimic(null);
    }
    window.scrollTo(0, 0);
  };

  const selectEnemy = (enemy: Enemy | null) => {
    setSelectedEnemy(enemy);
    if (enemy) {
      setSelectedItem(null);
      setSelectedNPC(null);
      setSelectedBoss(null);
      setSelectedEventBoss(null);
      setSelectedMimic(null);
    }
    window.scrollTo(0, 0);
  };

  const selectNPC = (npc: NPC | null) => {
    setSelectedNPC(npc);
    if (npc) {
      setSelectedItem(null);
      setSelectedEnemy(null);
      setSelectedBoss(null);
      setSelectedEventBoss(null);
      setSelectedMimic(null);
    }
    window.scrollTo(0, 0);
  };

  const selectBoss = (boss: Boss | null) => {
    setSelectedBoss(boss);
    if (boss) {
      setSelectedItem(null);
      setSelectedEnemy(null);
      setSelectedNPC(null);
      setSelectedEventBoss(null);
      setSelectedMimic(null);
    }
    window.scrollTo(0, 0);
  };

  const selectEventBoss = (boss: EventBoss | null) => {
    setSelectedEventBoss(boss);
    if (boss) {
      setSelectedItem(null);
      setSelectedEnemy(null);
      setSelectedNPC(null);
      setSelectedBoss(null);
      setSelectedMimic(null);
    }
    window.scrollTo(0, 0);
  };

  const selectMimic = (mimic: Mimic | null) => {
    setSelectedMimic(mimic);
    if (mimic) {
      setSelectedItem(null);
      setSelectedEnemy(null);
      setSelectedNPC(null);
      setSelectedBoss(null);
      setSelectedEventBoss(null);
    }
    window.scrollTo(0, 0);
  };

  const goBackInHistory = () => {
    const newHistory = [...navigationHistory];
    const previousItem = newHistory.pop();
    setNavigationHistory(newHistory);
    setSelectedItem(previousItem || null);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    setCurrentPage(1);
    resetAllSelections();
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedBiome('All');
    setSelectedTime('All');
  }, [view]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedBiome, selectedTime]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(items.map(i => i.category))).sort();
    return ['All', ...cats];
  }, [items]);

  const enemyBiomes = useMemo(() => {
    const biomes = Array.from(new Set(enemies.map(e => e.biome_en))).filter(b => b && b.length > 0).sort();
    return ['All', ...biomes];
  }, [enemies]);

  const enemyTimes = useMemo(() => {
    const times = Array.from(new Set(enemies.map(e => e.time_en))).filter(t => t && t.length > 0).sort();
    return ['All', ...times];
  }, [enemies]);

  useEffect(() => {
    if (selectedItem) {
      const updated = items.find(i => i.id === selectedItem.id);
      if (updated) setSelectedItem(updated);
    }
    if (selectedEnemy) {
      const updated = enemies.find(e => e.id === selectedEnemy.id);
      if (updated) setSelectedEnemy(updated);
    }
    if (selectedNPC) {
      const updated = npcs.find(n => n.id === selectedNPC.id);
      if (updated) setSelectedNPC(updated);
    }
    if (selectedBoss) {
      const updated = bosses.find(b => b.id === selectedBoss.id);
      if (updated) setSelectedBoss(updated);
    }
    if (selectedEventBoss) {
      const updated = eventBosses.find(eb => eb.id === selectedEventBoss.id);
      if (updated) setSelectedEventBoss(updated);
    }
    if (selectedMimic) {
      const updated = mimics.find(m => m.id === selectedMimic.id);
      if (updated) setSelectedMimic(updated);
    }
  }, [lang, items, enemies, npcs, bosses, eventBosses, mimics]);

  const filteredResults = useMemo(() => {
    let result: (Item | Enemy | NPC | Boss | EventBoss | Mimic)[] = [];
    if (view === 'items') result = items;
    else if (view === 'enemies') result = enemies;
    else if (view === 'npcs') result = npcs;
    else if (view === 'bosses') result = bosses;
    else if (view === 'event_bosses') result = eventBosses;
    else if (view === 'mimics') result = mimics;
    
    if (view === 'items' && selectedCategory !== 'All') {
      result = (result as Item[]).filter(item => item.category === selectedCategory);
    }

    if (view === 'enemies') {
      if (selectedBiome !== 'All') {
        result = (result as Enemy[]).filter(enemy => enemy.biome_en === selectedBiome);
      }
      if (selectedTime !== 'All') {
        result = (result as Enemy[]).filter(enemy => enemy.time_en === selectedTime);
      }
    }

    if (searchTerm.length >= 2) {
      const normalize = (str: string) => 
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      
      const term = normalize(searchTerm);
      
      result = (result as any[]).filter(entity => 
        normalize(entity.name_en).includes(term) || 
        (entity.name_es && normalize(entity.name_es).includes(term))
      );
    } else if (searchTerm.length < 2 && selectedCategory === 'All' && selectedBiome === 'All' && selectedTime === 'All') {
      if (view === 'items' || view === 'enemies') return [];
    }

    return result;
  }, [searchTerm, selectedCategory, selectedBiome, selectedTime, items, enemies, npcs, bosses, eventBosses, mimics, view]);

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);
  
  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResults.slice(start, start + itemsPerPage);
  }, [filteredResults, currentPage]);

  const totalMaterials = useMemo(() => {
    return selectedItem ? calculateTotalMaterials(selectedItem, rawItems, lang) : {};
  }, [selectedItem, lang, rawItems]);

  const findItemByName = (name: string) => items.find(i => i.name_en === name) || null;
  const findEnemiesByDrop = (itemId: string) => enemies.filter(enemy => enemy.drops && enemy.drops.some(drop => drop.item_id === itemId));
  const findNPCsByItem = (itemId: string) => npcs.filter(npc => npc.items_sold && npc.items_sold.some(sale => sale.item_id === itemId));
  const findBossesByDrop = (itemId: string) => bosses.filter(boss => boss.drops && boss.drops.some(drop => drop.item_id === itemId));
  const findMimicsByDrop = (itemId: string) => mimics.filter(mimic => mimic.drops && mimic.drops.some(drop => drop.item_id === itemId));
  const findItemsUsingMaterial = (itemNameEn: string) => items.filter(item => item.recipes && item.recipes.some(r => r.name_en === itemNameEn));

  if (loading) return <div className="loading-screen">Loading Terraria Data...</div>;
  if (error) return <div className="error-screen">{error}</div>;

  return (
    <div className="app-container">
      <Header 
        lang={lang} 
        setLang={setLang} 
        view={view} 
        setView={setView} 
        resetSelections={resetAllSelections}
      />

      {!selectedItem && !selectedEnemy && !selectedNPC && !selectedBoss && !selectedEventBoss && !selectedMimic ? (
        <div className="search-section animate-fade">
          <SearchFilters 
            view={view}
            lang={lang}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
            selectedBiome={selectedBiome}
            setSelectedBiome={setSelectedBiome}
            enemyBiomes={enemyBiomes}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            enemyTimes={enemyTimes}
            clearFilters={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedBiome('All');
              setSelectedTime('All');
            }}
          />

          <ItemList 
            view={view}
            results={paginatedResults}
            lang={lang}
            onSelect={(entity) => {
              if (view === 'items') selectItem(entity);
              else if (view === 'enemies') selectEnemy(entity);
              else if (view === 'npcs') selectNPC(entity);
              else if (view === 'bosses') selectBoss(entity);
              else if (view === 'event_bosses') selectEventBoss(entity);
              else if (view === 'mimics') selectMimic(entity);
            }}
          />

          {filteredResults.length === 0 && (searchTerm.length >= 2 || selectedCategory !== 'All' || selectedBiome !== 'All' || selectedTime !== 'All') && (
            <div className="empty-results">
              {lang === 'es' ? 'No se encontraron resultados.' : 'No results found.'}
            </div>
          )}

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            lang={lang}
          />
        </div>
      ) : selectedItem ? (
        <ItemDetail 
          item={selectedItem}
          lang={lang}
          navigationHistory={navigationHistory}
          goBackInHistory={goBackInHistory}
          selectItem={selectItem}
          findItemByName={findItemByName}
          totalMaterials={totalMaterials}
          findEnemiesByDrop={findEnemiesByDrop}
          findBossesByDrop={findBossesByDrop}
          findMimicsByDrop={findMimicsByDrop}
          findItemsUsingMaterial={findItemsUsingMaterial}
          findNPCsByItem={findNPCsByItem}
          selectEnemy={selectEnemy}
          selectBoss={selectBoss}
          selectNPC={selectNPC}
          selectMimic={selectMimic}
          setNavigationHistory={setNavigationHistory}
        />
      ) : selectedEnemy ? (
        <EnemyDetail 
          enemy={selectedEnemy}
          lang={lang}
          onBack={() => selectEnemy(null)}
          items={items}
          setSelectedItem={selectItem}
        />
      ) : selectedNPC ? (
        <NPCDetail 
          npc={selectedNPC}
          lang={lang}
          onBack={() => selectNPC(null)}
          items={items}
          selectItem={selectItem}
        />
      ) : selectedBoss ? (
        <BossDetail 
          boss={selectedBoss}
          lang={lang}
          onBack={() => selectBoss(null)}
          items={items}
          selectItem={selectItem}
        />
      ) : selectedEventBoss ? (
        <EventBossDetail 
          boss={selectedEventBoss}
          lang={lang}
          onBack={() => selectEventBoss(null)}
          items={items}
          selectItem={selectItem}
        />
      ) : selectedMimic ? (
        <MimicDetail 
          mimic={selectedMimic}
          lang={lang}
          onBack={() => selectMimic(null)}
          items={items}
          selectItem={selectItem}
        />
      ) : null}
    </div>
  );
}

export default App;
