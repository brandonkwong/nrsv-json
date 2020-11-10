# nrsv.xml

The data used to build [nrsv.json](../dist/nrsv.json) originates from [dborza/bible-tools](https://github.com/dborza/bible-tools), which includes a set of "Tools for processing the sacred text," and several Bible translations in XML format. The [`nrsv.xml`](https://github.com/brandonkwong/nrsv-xml) used and referenced within this repository, is a slightly modified version of [nrsv.xml](https://github.com/dborza/bible-tools/blob/master/bible-translations/nrsv.xml) from the original repository of translations. However, the `nrsv.xml` _here_ is a sampled version in order to adhere to translation copyright policies.

## Em Dash

Within the verses of `nrsv.xml`, there contains various syntactic representations of an em dash ("—"); some of these include placing a hyphen ("-") prefixed or suffixed to a word, quotation mark, or at the beginning or ending of a verse. For examples:

- `<verse name="19">These two things have befallen you -who will grieve with you?- devastation and destruction, famine and sword- who will comfort you?</verse>` (Isaiah 51:19)

- `<verse name="13">But just as we have the same spirit of faith that is in accordance with scripture-"I believed, and so I spoke" -we also believe, and so we speak,</verse>` (2 Corinthians 4:13)

- `<verse name="2">-although it was not Jesus himself but his disciples who baptized-</verse>` (John 4:2)

### Util for parseEmDash()

When building the JSON data structure, each verse has its text parsed for em dashes (see: [parseEmDash()](../utils/string.js#L1-L6)). The regex, `(\s-|-\s)|(?<=^|"|')-|-(?=$|"|')`, matches the following patterns and replaces it with an em dash:

- Hyphen with an adjacent empty space.
- Hyphen at the beginning or end of text.
- Hyphen before or after quotation mark.

However, this still leaves a handful of hyphens (2,550 to be precise) after parsing for em dashes with the above regex pattern. That is because the remaining hyphens are "compound hyphens" that require a more careful, literary review.

### Compound Hyphens

A compound hyphen can be found between two words or characters. There are three different ways a compound hyphen appears in the text. The first two occurrences remain as hyphens, while the third should be converted into an em dash:

1. In the formation of a compound word, such as "well-being."
2. Within a proper noun (i.e.: "Abel-mizraim").
3. Between words or characters to represent an em dash.

Various dictionary APIs were considered to assist in determining whether certain hyphens are intended to form an actual compound word. However, initial research concluded that it would be too cumbersome and costly. Thus, a little "self-mechanical turk" was required.

#### Self-Mechanical Turk

After looking through the 2,373 results of compound hyphens (using the `\w-\w` regex pattern within Atom's ⌘F), 25% were subsequently parsed as em dashes by adding an adjacent space to the hyphen.
