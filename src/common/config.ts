import fs from 'fs';

const config = fs.readFileSync(__dirname + '/../../config.json', 'utf8');

export default JSON.parse(config);
