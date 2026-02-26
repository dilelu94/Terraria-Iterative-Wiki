import React from 'react';
import { Item, Language, Enemy, Boss, NPC, Mimic, CraftingStation } from '../../types';
import ShareButton from '../ShareButton';

interface ItemDetailProps {
  item: Item;
  lang: Language;
  navigationHistory: Item[];
  goBackInHistory: () => void;
  selectItem: (item: Item | null) => void;
  findItemByName: (name: string) => Item | null;
  totalMaterials: Record<string, { amount: number, image?: string }>;
  findEnemiesByDrop: (itemId: string) => Enemy[];
  findBossesByDrop: (itemId: string) => Boss[];
  findMimicsByDrop: (itemId: string) => Mimic[];
  findItemsUsingMaterial: (itemNameEn: string) => Item[];
  findNPCsByItem: (itemId: string) => NPC[];
  stations: CraftingStation[];
  selectEnemy: (enemy: Enemy | null) => void;
  selectBoss: (boss: Boss | null) => void;
  selectNPC: (npc: NPC | null) => void;
  selectMimic: (mimic: Mimic | null) => void;
  setNavigationHistory: (history: Item[] | ((prev: Item[]) => Item[])) => void;
}

const ItemDetail: React.FC<ItemDetailProps> = ({
  item, lang, navigationHistory, goBackInHistory, selectItem,
  findItemByName, totalMaterials, findEnemiesByDrop, findBossesByDrop, findMimicsByDrop, findItemsUsingMaterial,
  findNPCsByItem, stations, selectEnemy, selectBoss, selectNPC, selectMimic, setNavigationHistory
}) => {
  const enemiesByDrop = findEnemiesByDrop(item.id);
  const bossesByDrop = findBossesByDrop(item.id);
  const mimicsByDrop = findMimicsByDrop(item.id);
  const itemsUsingMaterial = findItemsUsingMaterial(item.name_en);
  const npcsByItem = findNPCsByItem(item.id);
  
  const hasDrops = enemiesByDrop.length > 0 || bossesByDrop.length > 0 || mimicsByDrop.length > 0;
  const hasChestOrigin = !!item.origin_info;

  const normalRecipes = item.recipes?.filter(r => !r.is_shimmer) || [];
  const shimmerRecipes = item.recipes?.filter(r => r.is_shimmer) || [];

  // Filtrar estaciones según la regla: No mostrar "A mano" si no hay recetas o si hay otras fuentes
  const itemStations = item.station_ids 
    ? stations.filter(s => {
        if (s.id === 'hand') {
          // Si no hay recetas propias, no tiene sentido decir "A mano"
          if (normalRecipes.length === 0) return false;
          
          const otherStations = item.station_ids!.filter(id => id !== 'hand');
          const hasOtherSources = hasDrops || hasChestOrigin || npcsByItem.length > 0;
          return otherStations.length === 0 && !hasOtherSources;
        }
        return item.station_ids!.includes(s.id);
      })
    : [];

  return (
    <div className="crafting-view animate-slide">
      <div className="navigation-actions">
        <button className="back-btn" onClick={() => selectItem(null)}>
          {lang === 'es' ? '← Volver a buscar' : '← Back to search'}
        </button>
        {navigationHistory.length > 0 && (
          <button className="back-btn secondary" onClick={goBackInHistory}>
            {lang === 'es' ? '← Volver atrás' : '← Go back'}
          </button>
        )}
      </div>

      {navigationHistory.length > 0 && (
        <div className="breadcrumbs">
          <span className="breadcrumb-item" onClick={() => selectItem(null)}>
            {lang === 'es' ? 'Búsqueda' : 'Search'}
          </span>
          {navigationHistory.map((hItem, idx) => (
            <React.Fragment key={hItem.id}>
              <span className="breadcrumb-separator">/</span>
              <span 
                className="breadcrumb-item" 
                onClick={() => {
                  const newHistory = navigationHistory.slice(0, idx);
                  setNavigationHistory(newHistory);
                  selectItem(hItem);
                }}
              >
                {hItem.display_name}
              </span>
            </React.Fragment>
          ))}
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-item active">{item.display_name}</span>
        </div>
      )}
      
      <div className="item-hero">
        <div className="hero-content">
          {item.image_url ? (
            <img src={item.image_url} alt={item.name_en} className="item-icon-large" />
          ) : (
            <div className="item-icon-placeholder large">📦</div>
          )}
          <div className="hero-text">
            <div className="detail-header-row">
              <h2>{item.display_name}</h2>
              <ShareButton lang={lang} />
            </div>
            <p className="hero-subtitle">{lang === 'es' ? item.name_en : (item.name_es || "Terraria Material")}</p>
            
            {item.is_armor && (
              <div className="enemy-stats-row hero-stats">
                <div className="stat-pill" title={lang === 'es' ? 'Defensa de esta pieza' : 'Piece Defense'}>
                  🛡️ {item.piece_defense || '?'}
                </div>
                {item.total_defense && (
                  <div className="stat-pill" title={lang === 'es' ? 'Defensa total del set' : 'Total Set Defense'}>
                    🛡️✨ {item.total_defense} (Set)
                  </div>
                )}
                {item.armor_class && (
                  <div className="stat-pill">
                    ⚔️ {item.armor_class}
                  </div>
                )}
              </div>
            )}

            <a href={item.wiki_url} target="_blank" rel="noreferrer" className="wiki-chip" style={{ marginTop: '1rem' }}>
              {lang === 'es' ? 'Wiki Oficial ↗' : 'Official Wiki ↗'}
            </a>
          </div>
        </div>
      </div>

      <div className="crafting-grid">
        {/* 0. Información de Obtención (Unificada: Drops, Cofres y Crafteo) */}
        {(item.origin_info || itemStations.length > 0) && (
          <div className="recipe-box origin-box" style={{ gridColumn: '1 / -1' }}>
            <h3>{lang === 'es' ? '¿Cómo se consigue?' : 'How to get?'}</h3>
            <div className="origin-info-highlight-v2" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              {item.origin_info && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: itemStations.length > 0 ? '10px' : '0' }}>
                  <span className="origin-icon">📍</span>
                  <p>{item.origin_info}</p>
                </div>
              )}
              {itemStations.map(s => (
                <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="origin-icon">🔨</span>
                  <p>
                    <span style={{ color: '#ffd700', fontWeight: 'bold' }}>
                      {lang === 'es' ? '(Crafteo) ' : '(Crafting) '}
                    </span>
                    {s.display_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 1. Ingredientes Directos */}
        {normalRecipes.length > 0 && (
          <div className="recipe-box">
            <h3>{lang === 'es' ? 'Ingredientes Directos' : 'Direct Ingredients'}</h3>
            <div className="ingredients-list">
              {normalRecipes.map((ing, idx) => {
                const details = findItemByName(ing.name_en);
                return (
                  <div key={idx} className="ing-item" onClick={() => details && selectItem(details)}>
                    <span className="ing-count">{ing.amount}x</span>
                    {details?.image_url ? (
                      <img src={details.image_url} alt={ing.name_en} className="ing-icon" />
                    ) : (
                      <div className="item-icon-placeholder tiny">📦</div>
                    )}
                    <span className="ing-name">{details?.display_name || ing.name_en}</span>
                    {details?.recipes && <span className="can-craft">⮑</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Transmutación del Fulgor */}
        {shimmerRecipes.length > 0 && (
          <div className="recipe-box shimmer-recipe-box">
            <h3>{lang === 'es' ? 'Transmutación del Fulgor' : 'Shimmer Transmutation'}</h3>
            <div className="ingredients-list">
              {shimmerRecipes.map((ing, idx) => {
                const details = findItemByName(ing.name_en);
                return (
                  <div key={idx} className="ing-item" onClick={() => details && selectItem(details)}>
                    <span className="ing-count shimmer-count">✨</span>
                    {details?.image_url ? (
                      <img src={details.image_url} alt={ing.name_en} className="ing-icon" />
                    ) : (
                      <div className="item-icon-placeholder tiny">📦</div>
                    )}
                    <span className="ing-name">{details?.display_name || ing.name_en}</span>
                    <span className="can-craft">↗</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Material Base / Drops */}
        {normalRecipes.length === 0 && shimmerRecipes.length === 0 && (
          <div className="recipe-box">
            <div className="base-material-info">
              <p className="base-material">
                {lang === 'es' ? 'Este es un material base. No tiene receta de fabricación.' : 'This is a base material. It has no crafting recipe.'}
              </p>
              
              {hasDrops && (
                <div className="dropped-by">
                  <h4>{lang === 'es' ? 'Soltado por:' : 'Dropped by:'}</h4>
                  <div className="ingredients-list">
                    {enemiesByDrop.map(enemy => (
                      <div key={enemy.id} className="ing-item" onClick={() => selectEnemy(enemy)}>
                        {enemy.image ? (
                          <img src={enemy.image} alt={enemy.name_en} className="ing-icon" />
                        ) : (
                          <div className="item-icon-placeholder tiny">💀</div>
                        )}
                        <span className="ing-name">{enemy.display_name}</span>
                        <span className="can-craft">↗</span>
                      </div>
                    ))}
                    {bossesByDrop.map(boss => (
                      <div key={boss.id} className="ing-item" onClick={() => selectBoss(boss)}>
                        {boss.image ? (
                          <img src={boss.image} alt={boss.name_en} className="ing-icon" />
                        ) : (
                          <div className="item-icon-placeholder tiny">👑</div>
                        )}
                        <span className="ing-name">{boss.display_name}</span>
                        <span className="can-craft">↗</span>
                      </div>
                    ))}
                    {mimicsByDrop.map(mimic => (
                      <div key={mimic.id} className="ing-item" onClick={() => selectMimic(mimic)}>
                        {mimic.image ? (
                          <img src={mimic.image} alt={mimic.name_en} className="ing-icon" />
                        ) : (
                          <div className="item-icon-placeholder tiny">📦</div>
                        )}
                        <span className="ing-name">{mimic.display_name}</span>
                        <span className="can-craft">↗</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {npcsByItem.length > 0 && (
                <div className="dropped-by">
                  <h4>{lang === 'es' ? 'Vendido por:' : 'Sold by:'}</h4>
                  <div className="ingredients-list">
                    {npcsByItem.map(npc => (
                      <div key={npc.id} className="ing-item" onClick={() => selectNPC(npc)}>
                        {npc.image ? (
                          <img src={npc.image} alt={npc.name_en} className="ing-icon" />
                        ) : (
                          <div className="item-icon-placeholder tiny">👤</div>
                        )}
                        <span className="ing-name">{npc.display_name}</span>
                        <span className="can-craft">↗</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="recipe-box">
          <h3>{lang === 'es' ? 'Se usa para fabricar:' : 'Used to craft:'}</h3>
          {itemsUsingMaterial.length > 0 ? (
            <div className="ingredients-list">
              {itemsUsingMaterial.map((targetItem, idx) => (
                <div key={idx} className="ing-item" onClick={() => selectItem(targetItem)}>
                  {targetItem.image_url ? (
                    <img src={targetItem.image_url} alt={targetItem.name_en} className="ing-icon" />
                  ) : (
                    <div className="item-icon-placeholder tiny">📦</div>
                  )}
                  <span className="ing-name">{targetItem.display_name}</span>
                  <span className="can-craft">↗</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="base-material" style={{ opacity: 0.6 }}>
              {lang === 'es' ? 'No se usa en ninguna receta conocida.' : 'Not used in any known recipes.'}
            </p>
          )}
        </div>

        {Object.keys(totalMaterials).length > 0 && normalRecipes.length > 0 && (
          <div className="raw-materials-box" style={{ gridColumn: '1 / -1' }}>
            <h3>{lang === 'es' ? 'Lista de Compras (Total Base)' : 'Shopping List (Total Base)'}</h3>
            <div className="ingredients-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem' }}>
              {Object.entries(totalMaterials).map(([name, data], idx) => (
                <div key={idx} className="ing-item no-hover">
                  <span className="ing-count total">{data.amount}x</span>
                  {data.image && <img src={data.image} alt={name} className="ing-icon" />}
                  <span className="ing-name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {item.is_armor && (
          <div className="recipe-box armor-info-box" style={{ gridColumn: '1 / -1' }}>
            <h3>{lang === 'es' ? 'Información de Armadura' : 'Armor Information'}</h3>
            <div className="info-list">
              {item.armor_set_es && (
                <div className="info-item">
                  <strong>{lang === 'es' ? 'Set:' : 'Set:'}</strong> {lang === 'es' ? item.armor_set_es : item.armor_set_en}
                </div>
              )}
              {item.piece_effects && (
                <div className="info-item">
                  <strong>{lang === 'es' ? 'Efectos de pieza:' : 'Piece Effects:'}</strong> 
                  <span className="effect-text">{item.piece_effects}</span>
                </div>
              )}
              {item.set_stats && (
                <div className="info-item">
                  <strong>{lang === 'es' ? 'Mejora de Stats (Set):' : 'Set Stats Bonus:'}</strong> 
                  <span className="effect-text">{item.set_stats}</span>
                </div>
              )}
              {item.set_bonus && (
                <div className="info-item highlight-bonus">
                  <strong>{lang === 'es' ? 'Bonus de Set Completo:' : 'Full Set Bonus:'}</strong> 
                  <p className="bonus-text">{item.set_bonus}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
