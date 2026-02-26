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
        // En Vite, para archivos en 'public', la ruta debe empezar con / para que use el BASE_URL automáticamente
        const fetchJson = async (file: string) => {
            const response = await fetch(`./data/${file}`);
            if (!response.ok) throw new Error(`Failed to load ${file}`);
            return response.json();
        };

        const [itemsRes, enemiesRes, npcsRes, bossesRes, eventBossesRes, mimicsRes, stationsRes] = await Promise.all([
          fetchJson('items.json'),
          fetchJson('enemies.json'),
          fetchJson('npcs.json'),
          fetchJson('bosses.json'),
          fetchJson('event_bosses.json'),
          fetchJson('mimics.json'),
          fetchJson('crafting_stations.json')
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
        setError("Error al cargar los datos. Por favor, revisa la consola del navegador.");
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { items, enemies, npcs, bosses, eventBosses, mimics, stations, loading, error };
};
