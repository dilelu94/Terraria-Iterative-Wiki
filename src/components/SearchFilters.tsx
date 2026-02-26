import React from 'react';
import { Language, ViewType } from '../types';
import { categoryTranslations, biomeTranslations, timeTranslations } from '../constants/translations';

interface SearchFiltersProps {
  view: ViewType;
  lang: Language;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  categories: string[];
  selectedBiome: string;
  setSelectedBiome: (biome: string) => void;
  enemyBiomes: string[];
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  enemyTimes: string[];
  clearFilters: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  view, lang, searchTerm, setSearchTerm,
  selectedCategory, setSelectedCategory, categories,
  selectedBiome, setSelectedBiome, enemyBiomes,
  selectedTime, setSelectedTime, enemyTimes,
  clearFilters
}) => {
  return (
    <div className="filter-controls">
      <input 
        type="text" 
        className="search-bar" 
        placeholder={lang === 'es' ? `Buscar ${view === 'items' ? 'ítems' : view === 'enemies' ? 'enemigos' : view === 'npcs' ? 'aldeanos' : 'jefes'}...` : `Search ${view}...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        autoFocus
      />
      
      {view === 'items' && (
        <select 
          className="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'All' 
                ? (lang === 'es' ? 'Todas las categorías' : 'All Categories') 
                : (lang === 'es' ? (categoryTranslations[cat] || cat) : cat)
              }
            </option>
          ))}
        </select>
      )}

      {view === 'enemies' && (
        <>
          <select 
            className="category-select"
            value={selectedBiome}
            onChange={(e) => setSelectedBiome(e.target.value)}
          >
            <option value="All">{lang === 'es' ? 'Todos los biomas' : 'All Biomes'}</option>
            {enemyBiomes.filter(b => b !== 'All').map(biome => (
              <option key={biome} value={biome}>
                {lang === 'es' ? (biomeTranslations[biome] || biome) : biome}
              </option>
            ))}
          </select>

          <select 
            className="category-select"
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
          >
            <option value="All">{lang === 'es' ? 'Cualquier tiempo' : 'Any Time'}</option>
            {enemyTimes.filter(t => t !== 'All').map(time => (
              <option key={time} value={time}>
                {lang === 'es' ? (timeTranslations[time] || time) : time}
              </option>
            ))}
          </select>
        </>
      )}

      {(searchTerm || selectedCategory !== 'All' || selectedBiome !== 'All' || selectedTime !== 'All') && (
        <button 
          className="clear-btn" 
          onClick={clearFilters}
        >
          {lang === 'es' ? 'Limpiar' : 'Clear'}
        </button>
      )}
    </div>
  );
};

export default SearchFilters;
