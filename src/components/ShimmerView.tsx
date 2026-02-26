import React, { useMemo } from 'react';
import { Item, Language } from '../types';

interface ShimmerViewProps {
  items: Item[];
  lang: Language;
  onSelect: (item: Item) => void;
  selectedCategory: string;
}

const ShimmerView: React.FC<ShimmerViewProps> = ({ items, lang, onSelect, selectedCategory }) => {
  const shimmerPairs = useMemo(() => {
    const pairs: { a: Item; b: Item | string; isUnique: boolean }[] = [];
    const seenPairs = new Set<string>();

    // Filtrar ítems que tienen receta de shimmer
    const shimmerItems = items.filter(item => item.recipes?.some(r => r.is_shimmer));

    shimmerItems.forEach(item => {
      const shimmerRecipe = item.recipes?.find(r => r.is_shimmer);
      if (!shimmerRecipe) return;

      const inputName = shimmerRecipe.name_en;
      const inputItem = items.find(i => i.name_en === inputName);
      
      // Crear una clave única para el par (ordenada alfabéticamente para detectar reversibles)
      const pairKey = [item.name_en, inputName].sort().join('<->');

      if (!seenPairs.has(pairKey)) {
        const isUnique = item.station_ids?.length === 1 && !item.category.includes('Ore');
        
        // Filtrar por categoría si no es 'All'
        if (selectedCategory === 'All' || 
           (selectedCategory === 'Unique' && isUnique) || 
           (selectedCategory === 'Others' && !isUnique)) {
          pairs.push({
            a: item,
            b: inputItem || inputName, // Puede ser el objeto Item o solo el nombre si no existe
            isUnique
          });
          seenPairs.add(pairKey);
        }
      }
    });

    // Ordenar alfabéticamente por el nombre que se muestra a la izquierda
    return pairs.sort((a, b) => a.a.display_name.localeCompare(b.a.display_name));
  }, [items, selectedCategory, lang]);

  return (
    <div className="shimmer-list">
      {shimmerPairs.map((pair, idx) => (
        <div key={idx} className="shimmer-row animate-fade">
          {/* Objeto A (Resultado) */}
          <div className="shimmer-item-card" onClick={() => onSelect(pair.a)}>
            {pair.a.image_url ? (
              <img src={pair.a.image_url} alt={pair.a.name_en} className="item-icon-small" />
            ) : (
              <div className="item-icon-placeholder small">✨</div>
            )}
            <div className="item-info">
              <h4>{pair.a.display_name}</h4>
              <span className="category-tag">{pair.isUnique ? (lang === 'es' ? 'Único' : 'Unique') : (lang === 'es' ? 'Transmutación' : 'Transmutation')}</span>
            </div>
          </div>

          {/* Flecha / Icono de Fulgor */}
          <div className="shimmer-arrow-container">
            <span className="shimmer-sparkle">✨</span>
            <div className="shimmer-line"></div>
          </div>

          {/* Objeto B (Ingrediente) */}
          {typeof pair.b === 'string' ? (
            <div className="shimmer-item-card disabled">
              <div className="item-icon-placeholder small">📦</div>
              <div className="item-info">
                <h4>{pair.b}</h4>
                <span className="category-tag opacity-5">{lang === 'es' ? 'Desconocido' : 'Unknown'}</span>
              </div>
            </div>
          ) : (
            <div className="shimmer-item-card" onClick={() => onSelect(pair.b as Item)}>
              {pair.b.image_url ? (
                <img src={pair.b.image_url} alt={pair.b.name_en} className="item-icon-small" />
              ) : (
                <div className="item-icon-placeholder small">📦</div>
              )}
              <div className="item-info">
                <h4>{pair.b.display_name}</h4>
                <span className="category-tag">{lang === 'es' ? 'Material' : 'Material'}</span>
              </div>
            </div>
          )}
        </div>
      ))}
      
      {shimmerPairs.length === 0 && (
        <div className="empty-results">
          {lang === 'es' ? 'No se encontraron transmutaciones.' : 'No transmutations found.'}
        </div>
      )}
    </div>
  );
};

export default ShimmerView;
