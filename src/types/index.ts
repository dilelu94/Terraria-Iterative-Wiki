export interface RecipeIngredient {
  name_en: string;
  amount: number;
}

export interface Item {
  id: string;
  category: string;
  name_en: string;
  name_es: string;
  display_name: string;
  wiki_url: string;
  image_url?: string;
  recipes?: RecipeIngredient[];
  // Armor fields
  is_armor?: boolean;
  armor_set_en?: string;
  armor_set_es?: string;
  total_defense?: string;
  piece_defense?: string;
  piece_effects?: string;
  set_stats?: string;
  set_bonus?: string;
  armor_class?: string;
}

export interface Enemy {
  id: string;
  name_es: string;
  name_en: string;
  display_name: string;
  image: string | null;
  health: string;
  damage: string;
  defense: string;
  biome_es: string;
  biome_en: string;
  time_es: string;
  time_en: string;
  display_biome: string;
  display_time: string;
  drops: { item_name: string; item_id: string | null; chance: string }[];
}

export interface NPC {
  id: string;
  name_en: string;
  name_es: string;
  display_name: string;
  image: string;
  wiki_url: string;
  items_sold: { item_name: string; item_id: string | null }[];
}

export interface Boss {
  id: string;
  name_en: string;
  name_es: string;
  display_name: string;
  biome: string;
  biome_en: string;
  biome_es: string;
  display_biome: string;
  time: string;
  time_en: string;
  time_es: string;
  display_time: string;
  health: string;
  defense: string;
  damage: string;
  drops: { item_name: string; item_id: string | null }[];
  image: string;
  wiki_url: string;
}

export interface EventBoss {
  id: string;
  name_en: string;
  name_es: string;
  display_name: string;
  biome_en: string;
  biome_es: string;
  display_biome: string;
  health: string;
  defense: string;
  damage: string;
  drops: string[];
  image: string;
}

export interface Mimic {
  id: string;
  name_en: string;
  name_es: string;
  display_name: string;
  biome_en: string;
  biome_es: string;
  display_biome: string;
  summon_key: string;
  key_item_id: string | null;
  health: string;
  defense: string;
  damage: string;
  drops: { item_name: string; item_id: string | null }[];
  image: string;
  wiki_url: string;
}

export type ViewType = 'items' | 'enemies' | 'npcs' | 'bosses' | 'event_bosses' | 'mimics';
export type Language = 'es' | 'en';
