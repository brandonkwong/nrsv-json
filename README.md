# nrsv.json

📖 Delivering the NRSV Bible translation to JSON format.

## Getting Started

Download [nrsv.json](nrsv.json) or fork this project to get started on sharing the gosepl. Just `yarn install` and run the following to build locally:

```
yarn build
```

### Build Args

When editing JSON [structure](src/lib/structure.js), the `--indent` arg can be used to adjust spacing (default is `4`) for desired readability.

```
yarn build --indent 2
```

[nrsv.json](nrsv.json) is stringified for distribution.

```
yarn build --dist
```
