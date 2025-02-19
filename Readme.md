# NotePlan Plugins

This is the initial repository for [NotePlan app](https://noteplan.co/) plugins, available from release v3.0.22 (Mac & iOS).

The plugins work through [Command Bar Plugins](https://help.noteplan.co/article/65-commandbar-plugins)
for example:
![](https://d33v4339jhl8k0.cloudfront.net/docs/assets/6081f7f4c9133261f23f4b41/images/608c5886f8c0ef2d98df845c/file-fLVrMGjoZr.png)

If you are a user and have plugin ideas, [submit them here](https://feedback.noteplan.co/plugins-scripting) or ask in the [NotePlan Discord community](https://discord.gg/D4268MT)'s `#plugin-ideas` channel.

If you are a developer and want to contribute and build your plugins, see the [plugin writing documentation](https://help.noteplan.co/article/67-create-command-bar-plugins) and discuss this with other developers on [Discord](https://discord.gg/D4268MT) `#plugin-dev` channel.  Your might want to consult this [good modern JavaScript tutorial](https://javascript.info/).

# Contributing

## Development Guide

### Set Up

1.  Make sure you have a recent version of `node` and `npm` installed. `brew install node` should do the trick.
2.  Run `npm install` from the root of your local GitHub repository for `noteplan/plugins`. This will install all the dependencies.
3.  Run `npm run autowatch` from the same root. The first time you run the script it will ask you for the full path to you Plugins folder and if you provide it, it will automatically copy the final js file and the plugin.json file in there automatically.

This includes setting up [eslint](https://eslint.org/) (for checking code conventions), [flow](https://flow.org/) (for type checking), [babel](https://babeljs.io/) (a JS compiler), and [rollup](https://rollupjs.org/guide/en/) (for bundling multiple source files into a single release).  Each have their own configuration files in the root; they can be overridden if needed by placing a more specific config file in the respective plugin's folders.

### Commands

These are the most common commands you will use while developing:

- **`npm run autowatch` and your multi-file JS plugins will be compiled for you, and optionally be copied to your running NotePlan instance for testing**.  In most cases you shouldn't then need to run the following individual commands, but they're listed for completeness.
- `npm run build`: Will build all the plugins into single files (where needed)
- `npm run watch`: Will watch *all* files for changes and automatically compile them into single javascript files (where needed)
- `npm run typecheck`: Will typecheck all the javascript files with `Flow`. Only files with a `// @flow` comment are checked.
- `npm run fix`: Will lint and autoformat
- `npm run test`: Will lint and typecheck all Javascript files and report, but not fix anything

You may find these commands useful too:

- `npm run build:nmn.sweep`: Will build the `nmn.sweep` plugin to a single file
- `npm run build:nmn.Templates`: Will build the `nmn.Templates` plugin to a single file
- `npm run watch:nmn.sweep`: Will build the `nmn.sweep` plugin to a single file and automatically repeat when a file changes.
- `npm run watch:nmn.Templates`: Will build the `nmn.Templates` plugin to a single file and automatically repeat when a file changes.
- `npm run lint`: Will run ESlint on the entire repo
- `npm run lint-fix`: Will run ESlint on the entire repo and fix whatever it can automatically fix
- `npm run format`: Will autoformat all Javascript files.

## Editor Setup

### Visual Studio Code (recommended)

1. Install extensions for the following tools:
   1. `flow` "Flow Language Support" by flowtype
   2. `eslint` "ESLint" by Dirk Baeumer
   3. `prettier` "Prettier - Code formatter" by Prettier
2. Update Settings:
3. Set `prettier` to be the default formatter for js files.
   - You can open the Command Bar using `CMD+SHIFT+P` and then search for `Format Document`.
   - When you do this, you may get asked for a formatter of choice. Choose "Prettier"
   - If it asks you if this should be your default for all JS files, choose Yes.
4. Restart the editor to ensure the plug-ins are working.
   - You should see type errors when you make those
   - You should see lint errors when you format code wrong
   - You should see your code get autoformatted when you save
5. Make sure to open this folder directly in VSCode and not the entire repo as the ESLint plug-in can be annoying about that

### Sublime Text 3 and 4

1. Install the following extensions using Package Control
   1. `SublimeLinter` This allows various linters to work
   2. `SublimeLinter-eslint`
   3. `SublimeLinter-flow`
   4. `jsPrettier`
   5. `Babel` Syntax definitions for ES6 Javascript and React JSX extensions
2. Configure your packages:
   1. Open a `.js` file
   2. From the View menu, select Syntax → Open all with current extension as… → Babel → JavaScript (Babel)
   3. Open the package settings for `jsPrettier` and add `"auto_format_on_save": true,`

## Working with multiple files

Noteplan plugins need to be packaged as a single Javascript file, but that's not always a nice way to work.
So we use tools to package up multiple files into one.

After making any changes, you can simply run `npm run build`.

Even better, you can run `npm run watch` and it will automatically watch the source files for changes and continuously
compile the final plugin file.

If you don't have an editor set up to lint on the fly for you, run `npm run test` and it will give a list of problems
to fix.

## Read the basic of how to use Flow typing in `Flow_Guide.md`