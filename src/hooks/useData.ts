import { useState, useEffect } from 'react';
import { Item, Enemy, NPC, Boss, EventBoss, Mimic, CraftingStation } from '../types';

export const useData = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [npcs, setNPCs] = useState<NPC[]>([]);
  const [bosses, setBosses] = useState<Boss[]>([]);
  const [eventBosses, setEventBosses] = useState<EventBoss[]>([]);
  const [mimics, setMimics] = useState<Mimic[]>([]);
  const [stations, setStations] = useState<CraftingStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [itemsRes, enemiesRes, npcsRes, bossesRes, eventBossesRes, mimicsRes, stationsRes] = await Promise.all([
          fetch('./data/items.json').then(res => res.json()),
          fetch('./data/enemies.json').then(res => res.json()),
          fetch('./data/npcs.json').then(res => res.json()),
          fetch('./data/bosses.json').then(res => res.json()),
          fetch('./data/event_bosses.json').then(res => res.json()),
          fetch('./data/mimics.json').then(res => res.json()),
          fetch('./data/crafting_stations.json').then(res => res.json())
        ]);

        setItems(itemsRes);
        setEnemies(enemiesRes);
        setNPCs(npcsRes);
        setBosses(bossesRes);
        setEventBosses(eventBossesRes);
        setMimics(mimicsRes);
        setStations(stationsRes);
        setLoading(false);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please refresh.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { items, enemies, npcs, bosses, eventBosses, mimics, stations, loading, error };
};
