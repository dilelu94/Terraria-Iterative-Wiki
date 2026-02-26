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
    const pairs: { input: Item | string; output: Item; isUnique: boolean }[] = [];
    const seenPairs = new Set<string>();

    // Filtrar ítems que tienen receta de shimmer (el resultado)
    const shimmerItems = items.filter(item => item.recipes?.some(r => r.is_shimmer));

    shimmerItems.forEach(item => {
      const shimmerRecipe = item.recipes?.find(r => r.is_shimmer);
      if (!shimmerRecipe) return;

      const inputName = shimmerRecipe.name_en;
      const inputItem = items.find(i => i.name_en === inputName);
      
      // Clave única para evitar duplicados en la visualización
      const pairKey = \`\${inputName}->\${item.name_en}\`;

      if (!seenPairs.has(pairKey)) {
        const isUnique = item.station_ids?.length === 1 && item.station_ids.includes('shimmer') && !item.category.includes('Ore');
        
        // Filtrar por categoría si no es 'All'
        if (selectedCategory === 'All' || 
           (selectedCategory === 'Unique' && isUnique) || 
           (selectedCategory === 'Others' && !isUnique)) {
          pairs.push({
            input: inputItem || inputName,
            output: item,
            isUnique
          });
          seenPairs.add(pairKey);
        }
      }
    });

    // Ordenar por el nombre del objeto de ENTRADA
    return pairs.sort((a, b) => {
      const nameA = typeof a.input === 'string' ? a.input : a.input.display_name;
      const nameB = typeof b.input === 'string' ? b.input : b.input.display_name;
      return nameA.localeCompare(nameB);
    });
  }, [items, selectedCategory, lang]);

  const renderItemCard = (target: Item | string, typeLabel: string) => {
    if (typeof target === 'string') {
      return (
        <div className="shimmer-item-card disabled">
          <div className="item-icon-placeholder small">📦</div>
          <div className="item-info">
            <h4>{target}</h4>
            <span className="category-tag">{lang === 'es' ? 'Desconocido' : 'Unknown'}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="shimmer-item-card" onClick={() => onSelect(target)}>
        {target.image_url ? (
          <img src={target.image_url} alt={target.name_en} className="item-icon-small" />
        ) : (
          <div className="item-icon-placeholder small">✨</div>
        )}
        <div className="item-info">
          <h4>{target.display_name}</h4>
          <span className="category-tag">{typeLabel}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="shimmer-list">
      {shimmerPairs.map((pair, idx) => (
        <div key={idx} className="shimmer-row animate-fade">
          {/* 1. Objeto de Entrada (Izquierda) */}
          {renderItemCard(pair.input, lang === 'es' ? 'Material Original' : 'Original Material')}

          {/* 2. Flecha de Transmutación (Centro) */}
          <div className="shimmer-arrow-container">
            <span className="shimmer-sparkle">✨</span>
            <div className="shimmer-line"></div>
          </div>

          {/* 3. Objeto de Salida (Derecha) */}
          {renderItemCard(pair.output, pair.isUnique ? (lang === 'es' ? 'Resultado Único' : 'Unique Result') : (lang === 'es' ? 'Resultado' : 'Result'))}
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
