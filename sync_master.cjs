const fs = require('fs');

const getWikiName = (name) => {
    if (name === "Volcano") return "Volcano"; 
    return name.replace(/ /g, '_');
};

const syncData = (filePath, masterData) => {
    if (!fs.existsSync(filePath)) return 0;
    const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    let fixedCount = 0;

    items.forEach(item => {
        if (masterData[item.id]) {
            const trueName = masterData[item.id];
            const encoded = getWikiName(trueName);
            const expectedWiki = `https://terraria.wiki.gg/wiki/${encoded}`;
            const expectedImg = `https://terraria.wiki.gg/wiki/Special:FilePath/${encoded}.png`;

            if (item.category === 'Armor' || item.name_en.includes('Helmet') || item.name_en.includes('Breastplate') || item.name_en.includes('Greaves')) {
                item.is_armor = true;
            }

            if (item.name_en !== trueName || item.wiki_url !== expectedWiki || item.image_url !== expectedImg) {
                item.name_en = trueName;
                item.wiki_url = expectedWiki;
                item.image_url = expectedImg;
                fixedCount++;
            }
        }
    });

    fs.writeFileSync(filePath, JSON.stringify(items, null, 2));
    return fixedCount;
};

const masterMap = {};
const masterRaw = fs.readFileSync('master_full.txt', 'utf8');
masterRaw.split('\n').forEach(line => {
    const parts = line.split('\t');
    if (parts.length >= 2) {
        masterMap[parts[0].trim()] = parts[1].trim();
    }
});

const srcCount = syncData('src/data/items.json', masterMap);
const pubCount = syncData('public/data/items.json', masterMap);

console.log(`Sync complete. Fixed ${srcCount} items in src and ${pubCount} items in public.`);
