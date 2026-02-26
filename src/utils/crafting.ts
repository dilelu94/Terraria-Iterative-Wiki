import { Item } from '../types';

export const calculateTotalMaterials = (
  item: Item, 
  items: Item[],
  lang: 'es' | 'en',
  multiplier: number = 1, 
  depth: number = 0,
  seen: Set<string> = new Set()
): Record<string, { amount: number, image?: string }> => {
  const totals: Record<string, { amount: number, image?: string }> = {};
  
  // Prevent infinite loops or too deep trees
  if (depth > 20 || seen.has(item.name_en)) {
    totals[item.display_name] = { 
      amount: multiplier, 
      image: item.image_url 
    };
    return totals;
  }

  seen.add(item.name_en);

  // Filtrar recetas: No calcular totales para transmutaciones de Shimmer
  // ya que suelen ser "de-crafting" o transformaciones laterales.
  const validRecipes = item.recipes?.filter(r => !r.is_shimmer) || [];

  if (validRecipes.length === 0) {
    totals[item.display_name] = { 
      amount: multiplier, 
      image: item.image_url 
    };
    return totals;
  }

  const findItemByName = (name: string) => items.find(i => i.name_en === name) || null;

  validRecipes.forEach(ing => {
    const ingDetails = findItemByName(ing.name_en);
    if (ingDetails) {
      const localizedIngDetails = {
        ...ingDetails,
        display_name: lang === 'es' ? (ingDetails.name_es || ingDetails.name_en) : ingDetails.name_en
      };
      
      const subTotals = calculateTotalMaterials(localizedIngDetails, items, lang, ing.amount * multiplier, depth + 1, new Set(seen));
      for (const [name, data] of Object.entries(subTotals)) {
        if (!totals[name]) totals[name] = { amount: 0, image: data.image };
        totals[name].amount += data.amount;
      }
    } else {
      if (!totals[ing.name_en]) totals[ing.name_en] = { amount: 0 };
      totals[ing.name_en].amount += (ing.amount * multiplier);
    }
  });

  return totals;
};
