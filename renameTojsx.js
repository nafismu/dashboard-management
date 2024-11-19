const fs = require('fs');
const path = require('path');

const directory = './src'; // Ubah ke direktori tempat file JS Anda berada

function renameFilesInDir(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) throw err;

                if (stats.isDirectory()) {
                    renameFilesInDir(filePath); // Rekursif untuk folder
                } else if (path.extname(file) === '.js') {
                    const newFilePath = filePath.replace(/\.js$/, '.jsx');
                    fs.rename(filePath, newFilePath, (err) => {
                        if (err) throw err;
                        console.log(`Renamed: ${file} -> ${path.basename(newFilePath)}`);
                    });
                }
            });
        });
    });
}

renameFilesInDir(directory);
