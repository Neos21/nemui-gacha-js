# nemu-gacha-js : ねむいガチャ.js

__[Enter This Website.](https://Neos21.github.io/nemui-gacha-js/)__


## Query String

- `q` : The words that executed on load
    - ex. <https://neos21.github.io/nemui-gacha-js/?q=ねむい>
- `force` : Force parse negative
    - ex. <https://neos21.github.io/nemui-gacha-js/?q=ねむい&force=true>


## Maintenance for GitHub Pages

- Set `homepage` in `package.json`
- Use `gh-pages` : `$ npm run deploy` (`npm run build && gh-pages -d build`)
- In development, set `PUBLIC_URL` environment variable to override `homepage` value


## How To Use on CLI

```sh
# `git clone` this repository, then `cd` the repository directory.
$ npm install
$ npm run cli 'ねむい'
# --> ねむい or ねむくない

# Force parse negative
$ npm run cli -- --force 'ねむい'
# --> ねむくない
```


## Author

[Neo](http://neo.s21.xrea.com/)


## Links

- [Neo's World](http://neo.s21.xrea.com/)
- [Corredor](https://neos21.hatenablog.com/)
- [Murga](https://neos21.hatenablog.jp/)
- [El Mylar](https://neos21.hateblo.jp/)
- [Neo's GitHub Pages](https://neos21.github.io/)
- [GitHub - Neos21](https://github.com/Neos21/)
