const process = require('process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const update = require('./lib/commands/update');
const list = require('./lib/commands/list');
const run = require('./lib/commands/run');

const shell = require('./lib/shell');

yargs(hideBin(process.argv))
  .command(
    'update',
    'update your commands',
    () => {},
    () => {
      update();
    },
  )
  .command(
    'list',
    'list of your commands',
    () => {},
    () => {
      list();
    },
  )
  .command(
    'run [command]',
    'run specific command',
    yargs => {
      return yargs.positional('command', {
        describe: 'command to run',
      });
    },
    yargs => {
      if (!yargs.command) {
        console.log('Error: specify [command] to run');
        process.exit(1);
      }

      run(yargs.command);
    },
  ).argv;

module.exports = {
  ...shell,
};
