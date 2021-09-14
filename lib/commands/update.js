const { glob } = require('glob');
const process = require('process');
const fs = require('fs');
const path = require('path');
const os = require('os');

module.exports = () => {
  const commandsDir = require('./../commands-dir');
  const isWindows = process.platform === 'win32';
  const ext = isWindows ? '.bat' : '.sh';

  glob(
    '*.js',
    {
      cwd: commandsDir,
      ignore: 'node_modules',
    },
    (err, files) => {
      if (err) {
        console.log('Error: check your ~/.nserc.json for correct commands directory path');
        process.exit(1);
      }

      files.forEach(filename => {
        const commandPath = path.join(commandsDir, filename);
        const commandExecutablePath = path.join(commandsDir, filename.replace('.js', ext));
        const template = isWindows
          ? `node ${commandPath}`
          : `#!/bin/bash${os.EOL}node ${commandPath}`;

        fs.writeFileSync(commandExecutablePath, template);
        fs.chmodSync(commandExecutablePath, 0o755);
      });
    },
  );
};
