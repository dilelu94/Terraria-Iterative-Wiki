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
        // Usar import.meta.env.BASE_URL para que funcione en GitHub Pages
        const baseUrl = import.meta.env.BASE_URL;
        
        const [itemsRes, enemiesRes, npcsRes, bossesRes, eventBossesRes, mimicsRes, stationsRes] = await Promise.all([
          fetch(`${baseUrl}data/items.json`).then(res => res.json()),
          fetch(`${baseUrl}data/enemies.json`).then(res => res.json()),
          fetch(`${baseUrl}data/npcs.json`).then(res => res.json()),
          fetch(`${baseUrl}data/bosses.json`).then(res => res.json()),
          fetch(`${baseUrl}data/event_bosses.json`).then(res => res.json()),
          fetch(`${baseUrl}data/mimics.json`).then(res => res.json()),
          fetch(`${baseUrl}data/crafting_stations.json`).then(res => res.json())
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
        setError("Error al cargar los datos. Por favor, refresca la página.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { items, enemies, npcs, bosses, eventBosses, mimics, stations, loading, error };
};
