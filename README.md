# nrsv.json

📖 Delivering the NRSV Bible translation to JSON format.

## Getting Started

Download [nrsv.json](nrsv.json) or fork this project to get started on sharing the gosepl. Just `yarn install` and run the following to build locally:

```
yarn build
```

### Build Options

When editing JSON [structure](src/lib/structure.js), the `--indent` option can be used to adjust spacing (default is `4`) for desired level of readability.

```
yarn build --indent 2
```

Alternatively, [nrsv-map.json](nrsv-map.json) may also be built for easier lookup purposes (i.e.: `nrsv.books.rom.chapters[14].verses[4].text`).
```
yarn build --map
```

[nrsv.json](nrsv.json) is stringified for distribution.

```
yarn build --dist
```
