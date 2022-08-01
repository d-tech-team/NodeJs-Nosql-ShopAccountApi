import fs from "fs";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const removeFile = (dir) => {
    const filePath = path.join(__dirname, '../uploads/' + dir);
    fs.unlinkSync(filePath);
}