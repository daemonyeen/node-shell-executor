const path = require('path');
const { glob } = require('glob');
const { exec } = require('pkg');
const { exit } = require('process');

module.exports = () => {
    const commandsDir = require('./../commands-dir');

    glob('*.js', {
        cwd: commandsDir,
        ignore: 'node_modules'
    }, (err, files) => {
        if (err) {
            console.log('Error: check your ~/.nserc.json for correct commands directory path');
            process.exit(1);
        }

        files.forEach(filename => {
            exec([
                path.resolve(commandsDir, filename),
                '--target', 'host',
                '--output', path.join(commandsDir, `${filename.replace('.js', '')}.exe`)
            ]).catch(pkgError => {
                console.log(`Error: could not create executable for ${filename}`);
                console.log(pkgError.message);
                exit(1);
            })
        });
    });
}
