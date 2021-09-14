const { glob } = require('glob');
const process = require('process');

module.exports = () => {
  const commandsDir = require('./../commands-dir');

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

      files
        .map(filename => `npx nse run ${filename.replace('.js', '')}`)
        .forEach(command => console.log(command));
    },
  );
};
