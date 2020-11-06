# nrsv.json

📖 Delivering the NRSV Bible translation to JSON format.

## Getting Started

Download [nrsv.json](dist/nrsv.json) or fork this project to get started on sharing the gosepl, in a lightweight data-interchange format. Just `yarn install` and run the following to build locally:

```
yarn build
```

### Build Options

An `--indent` option can be used to adjust spacing (default is `4`) for desired level of readability. This is particularly useful while editing the JSON [structure](lib/structure.js).

```
yarn build --indent 2
```

Alternatively, [nrsv-map.json](dist/nrsv-map.json) may also be built for easier lookup purposes. For example, `books.rom.chapters[14].verses[4].text` would return, _"Who are you to pass judgment on servants of another? It is before their own lord that they stand or fall. And they will be upheld, for the Lord is able to make them stand."_

```
yarn build --map
```

For distribution, [nrsv.json](dist/nrsv.json) is stringified with `0` spaces.

```
yarn build --dist
```
