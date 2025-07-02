
const fs = require('fs');
const path = require("path")
class Utils {

    async ListFilesInPath(folderPath) {
        try {
            const files = fs.readdirSync(folderPath);
            const modelFiles = files.filter(file => {
                const fullPath = path.join(folderPath, file);
                return fs.statSync(fullPath).isFile(); // only include regular files
            });
            return modelFiles;
        } catch (err) {
            console.error('Error reading models directory:', err);
            return [];
        }

    }
}
module.exports = Utils