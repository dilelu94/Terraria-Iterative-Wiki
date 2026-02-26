const fs = require('fs');

const masterMap = {};
const masterRaw = fs.readFileSync('master_enemies.txt', 'utf8');
masterRaw.trim().split('\n').forEach(line => {
    const parts = line.split('\t');
    if (parts.length >= 3) {
        masterMap[parts[0].trim()] = {
            name: parts[1].trim(),
            img: parts[2].trim().split(' ')[0]
        };
    }
});

const syncFile = (path) => {
    if (!fs.existsSync(path)) return;
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    data.forEach(entity => {
        if (masterMap[entity.id]) {
            const master = masterMap[entity.id];
            entity.name_en = master.name;
            entity.image = 'https://terraria.wiki.gg/wiki/Special:FilePath/' + master.img.replace(/ /g, '_');
        }
    });
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

['enemies.json', 'bosses.json', 'event_bosses.json', 'npcs.json'].forEach(f => {
    syncFile('src/data/' + f);
    syncFile('public/data/' + f);
});

console.log('Synchronized Enemies, Bosses and NPCs with master list.');
