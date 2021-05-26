const { glob } = require('glob');
const process = require('process');
const path = require('path');
const { spawn } = require('child_process');
const stringSimilarity = require("string-similarity");

module.exports = (command) => {
    const commandsDir = require('./../commands-dir');

    glob('*.exe', {
        cwd: commandsDir,
        ignore: 'node_modules'
    }, (err, files) => {
        if (err) {
            console.log('Error: check your ~/.nserc.json for correct commands directory path');
            process.exit(1);
        }

        if (!files.includes(`${command}.exe`)) {
            const bestMatch = stringSimilarity.findBestMatch(
                command,
                files.map(filename => filename.replace('.exe', ''))
            );

            console.log(`Error: could not find command "${command}"${bestMatch ? `, did you mean "${bestMatch}?"` : ''}`)
            process.exit(1);
        }

        const exec = spawn(path.join(commandsDir, `${command}.exe`), {
            shell: true,
            stdio: 'inherit'
        });
        
        exec.on('close', (code) => {
            process.exit(code);
        });
    });
}