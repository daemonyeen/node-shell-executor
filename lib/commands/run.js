const { glob } = require('glob');
const process = require('process');
const path = require('path');
const { spawn } = require('child_process');
const stringSimilarity = require("string-similarity");

module.exports = (command) => {
    const commandsDir = require('./../commands-dir');

    glob('*.js', {
        cwd: commandsDir,
        ignore: 'node_modules'
    }, (err, files) => {
        if (err) {
            console.log('Error: check your ~/.nserc.json for correct commands directory path');
            process.exit(1);
        }

        if (!files.includes(`${command}.js`)) {
            const matches = stringSimilarity.findBestMatch(
                command,
                files.map(filename => filename.replace('.js', ''))
            );

            console.log(`Error: could not find command "${command}"${
                matches && matches.bestMatch && matches.bestMatch.target ?
                    `, did you mean "${matches.bestMatch.target}?"` :
                    ''
            }`)
            process.exit(1);
        }

        const exec = spawn(`node ${path.join(commandsDir, `${command}.js`)}`, {
            shell: true,
            stdio: 'inherit'
        });
        
        exec.on('close', (code) => {
            process.exit(code);
        });
    });
}
