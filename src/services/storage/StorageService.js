const fs = require('fs');

class StorageService{
    constructor(folder){
        this._folder = folder;

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }
    }

    writeFile(file, meta){
        // Variabel filename menampung nilai dari nama berkas yang akan dituliskan
        const filename = +new Date() + meta.filename;
        // Variabel path dibuat untuk menampung path atau alamat lengkap dari berkas yang akan dituliskan.
        const path = `${this._folder}/${filename}`;

        const fileStream = fs.createWriteStream(path);

        return new Promise((resolve, reject) => {
            fileStream.on('error', (error) => reject(error));
            file.pipe(fileStream);
            file.on('end', () => resolve(filename));
        });
    }
}

module.exports = StorageService;