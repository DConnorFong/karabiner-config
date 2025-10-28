# @mxstbr's Karabiner Elements configuration

If you like TypeScript and want your Karabiner configuration maintainable & type-safe, you probably want to use the custom configuration DSL / generator I created in `rules.ts` and `utils.ts`!

> “This repo is incredible - thanks so much for putting it together! I always avoided Karabiner mostly because of its complicated configuration. **Your project makes it so much easier to work with and so much more powerful. I'm geeking out on how much faster I'm going to be now.**”
>
> — @jhanstra ([source](https://github.com/mxstbr/karabiner/pull/4))

## Installation

1. Install & start [Karabiner Elements](https://karabiner-elements.pqrs.org/)
2. Clone this repository
   1. Make sure you call the directory karabiner, else the symlinking is not going to work
   2. If you made this mistake, `mv karabiner-config karabiner`
3. Delete the default `~/.config/karabiner` folder
4. Create a symlink with `ln -s ~/workspace/karabiner ~/.config` (where `~/workspace/karabiner` is your local path to where you cloned the repository)
5. [Restart karabiner_console_user_server](https://karabiner-elements.pqrs.org/docs/manual/misc/configuration-file-path/) with `` launchctl kickstart -k gui/`id -u`/org.pqrs.karabiner.karabiner_console_user_server ``

## Development

```
yarn install
```

to install the dependencies. (one-time only)

```
yarn run build
```

builds the `karabiner.json` from the `rules.ts`.

```
yarn run watch
```

watches the TypeScript files and rebuilds whenever they change.

## Troubleshooting
Often just try to manually go over to Karabiner and restart from the UI if some interactions are behaving weirdly (and have previously worked with no changes to the configuration)

## License

Copyright (c) 2022 Maximilian Stoiber / 2024 Connor Fong (Amendments), licensed under the [MIT license](./LICENSE.md).
