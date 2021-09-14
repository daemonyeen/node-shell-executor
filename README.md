# node-shell-executor 🔥🔥🔥

Are you want to create commands for your shell using Node.js instead of `bash` or `PowerShell`? This is package for you.

## Why?

- Automate everything you want without headache
- You can use JavaScript (instead of confusing shell languages)
- Your commands will work on every platform (Windows, Linux, MacOS not tested). Write once, use everywhere!
- You have the power of entire npm registry in your pocket
- Use `$` and `shell` utils to create your own scripts!
- It's fun!
  
## 1. Install `node-shell-executor`:

```
npm i -g node-shell-executor
```

## 2. Create some Node.js files in specific directory

By default, your commands directory is `~/.commands`, but your can specify your own path using `~/.nsecrc.json` file (yeah, you can use "~" in your path even if you are using Windows):

```
{
    "commandsDir": "~/.commands"
}
```

Your commands should have `*.js` extension, each `*.js` file would be compiled into the executable. Subdirectories not supported so keep all your commands on the root level:

```
~/.commands
    - command1.js
    - command2.js
    ...
```

You can install npm packages to your `.commands` directory and use it in your commands:

```
// in your terminal
npm install print-message

// command1.js
const printMessage = require('print-message');
 
printMessage(['Hello, node-shell-executor!']);
```

You can check your command list using:

```
npx nse list
```

## 3. Create scripts

You can write your own scripts like any other JavaScript scripts in your command's directory.
But if you want a convenient way to execute commands you can use `node-shell-executor` utils to do so:

```
const { $, shell } = require('node-shell-executor');

shell(async () => {
    await $`git --version`;
    await $`node -v`;
});
```

This example will execute `git --version` and `node -v` step by step!

## 4. Create executables for your commands (optionally)

```
npx nse update
```

This command will create executables for your `.js` files (`.bat` for Windows, `.sh` for Linux).

This way, if you add your commands directory to your environment variables (e.g. `$PATH` on Windows), you can run your commands directly from terminal without `npx nse` prefix:

```
// in your terminal
[command]
```
## 4. Run your command

```
npx nse run [command]
```

Enjoy!
