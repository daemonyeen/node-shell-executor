# node-shell-executor

Are you want to create commands for your shell using Node.js instead of `bash` or `PowerShell`? This is package for you.

## Why?

- Automate everything you want without headache
- You can use JavaScript (instead of confusing shell languages)
- Your commands will work on every platform (Windows, Linux, MacOS). Write once, use everywhere!
- You have the power of entire npm registry in your pocket
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

## 3. Update your commands list

```
npx nse update
```

This command will create executables for your `.js` files. You can check your command list using:

```
npx nse list
```

## 4. Run your commands

```
npx nse run [command]
```

Or you can add your commands directory to your environment variables (e.g. `$PATH`) to run your commands directly from terminal:

```
// in your terminal
[command]
```

Enjoy!