# nemui-gacha-js : ねむいガチャ.js

任意の言葉を入力すると、ランダムで肯定形・否定形を返す。

- ex. 「ねむい」 → 「ねむい」 or 「ねむくない」


## Demo

__[Enter This Website.](https://Neos21.github.io/nemui-gacha-js/)__

### Query String

- `q` : The words that executed on load
    - ex. <https://neos21.github.io/nemui-gacha-js/?q=ねむい>
- `force` : Force parsing into negative form
    - ex. <https://neos21.github.io/nemui-gacha-js/?q=ねむい&force=true>

### Maintenance for GitHub Pages

- Set `homepage` in `package.json`
- Use `gh-pages` : `$ npm run deploy` (`npm run build && gh-pages -d build`)
- In development, set `PUBLIC_URL` environment variable to override `homepage` value


## How To Use on CLI

```sh
# `git clone` this repository, then `cd` the directory.
$ npm install
$ npm run cli 'ねむい'
# --> ねむい or ねむくない

# To force parsing into negative form, Set `--force` as the first argument.
$ npm run cli -- --force 'ねむい'
# --> ねむくない
```


## Tech Stack

Based on [nemui-gacha](https://github.com/Neos21/nemui-gacha) made with Python and MeCab.

- Library : TypeScript, [kuromoji.js](https://github.com/takuyaa/kuromoji.js)
- Web App : React.js ([Create React App](https://github.com/facebook/create-react-app)) with TypeScript and SCSS
- CLI : TypeScript, [ts-node](https://github.com/TypeStrong/ts-node)


## Bugs And Feature Requests

If you have a bug or a feature request, [Please open a new issue.](https://github.com/Neos21/nemui-gacha-js/issues/new/choose)


## Links

- [Neo's World](https://neos21.net/)
