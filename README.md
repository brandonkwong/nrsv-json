# nrsv.json

📖 Delivering the NRSV Bible translation to JSON format.

>The NRSV stands out among the many translations because it is "as literal as possible" in adhering to the ancient texts and only "as free as necessary" to make the meaning clear in graceful, understandable English. It draws on newly available sources that increase our understanding of many previously obscure biblical passages. These sources include new-found manuscripts, the Dead Sea Scrolls, other texts, inscriptions, and archaeological finds from the ancient Near East, and new understandings of Greek and Hebrew grammar.
>
>_— [New Revised Standard Version (NRSV) - Version Information - BibleGateway.com](https://www.biblegateway.com/versions/New-Revised-Standard-Version-NRSV-Bible/#vinfo)_

## Getting Started

Download a sample of [nrsv.json](dist/nrsv.json) or fork this project to get started on sharing the gosepl, in a lightweight data-interchange format. Just `yarn install` and run the following to build locally:

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

For distribution, [nrsv.json](dist/nrsv.json) is stringified with `0` spaces; containing a sample size of 499 verses, from the first chapter of each book.

```
yarn build --dist
```

## Usage

The NRSV Bible translation follows the common translation gratis use policy:

>Up to 500 verses of the RSV or NRSV may be quoted in any form (written, visual, electronic or audio) without charge and without obtaining written permission ...
>
>_— [New Revised Standard Version (NRSV) - Copyright Information - BibleGateway.com](https://www.biblegateway.com/versions/New-Revised-Standard-Version-NRSV-Bible/#copy)_

For further insight on Bible translation copyrights, read ["The issue with copyright translations."](https://christianity.stackexchange.com/a/16386) on Stack Exchange.

### Data
