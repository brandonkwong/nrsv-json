const { sanitizeText } = require('../utils/string');

const { BOOKS } = require('./constants');

function structureBible (bible) {
  const data = {
    translation: bible.$.translation.toUpperCase(),
    books: {}
  };

  return data;
}

function structureBook (book, index) {
  const { name, abbreviation } = BOOKS[index];
  const data = {
    name,
    abbreviation,
    chapters: {}
  };

  return data;
}

function structureChapter (chapter, book) {
  const number = chapter.$.name;
  const name = `${book.name} ${number}`;
  const data = {
    name,
    verses: {}
  };

  return [data, number];
}

function structureVerse (verse, chapter) {
  const number = verse.$.name;
  const name = `${chapter.name}:${number}`;
  const data = {
    name,
    text: sanitizeText(verse._)
  };

  return [data, number];
}

function structureMap (bible) {
  const data = structureBible(bible);
  const bibleBooks = bible.book;

  for (let i = 0; i < bibleBooks.length; ++i) {
    const book = structureBook(bibleBooks[i], i);
    const bookKey = book.abbreviation.replace(' ', '_').toLowerCase();
    const bookChapters = bibleBooks[i].chapter;
    data.books[bookKey] = book;

    for (let j = 0; j < bookChapters.length; ++j) {
      const [chapter, chapterKey] = structureChapter(bookChapters[j], book);
      const chapterVerses = bookChapters[j].verse;
      data.books[bookKey].chapters[chapterKey] = chapter;

      for (let k = 0; k < chapterVerses.length; ++k) {
        const [verse, verseKey] = structureVerse(chapterVerses[k], chapter);
        data.books[bookKey].chapters[chapterKey].verses[verseKey] = verse;
      }
    }
  }

  return data;
}

module.exports = {
  structureMap
};
