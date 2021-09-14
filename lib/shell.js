const { exit } = require('process');
const { spawn } = require('child_process');

function restore(com, args) {
  return com.map((str, i) => `${str}${args[i] || ''}`).join('');
}

function $(com, ...args) {
  return new Promise(res => {
    try {
      const lintProcess = spawn(restore(com, args), {
        shell: true,
        stdio: 'inherit',
      });

      lintProcess.on('close', function (code) {
        res(code);
      });
    } catch (err) {
      exit(1);
    }
  });
}

async function shell(script) {
  await script();
}

module.exports = { $, shell };
