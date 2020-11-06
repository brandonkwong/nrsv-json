const { generateId } = require('../utils/id');
const { sanitizeText } = require('../utils/string');

const { BOOKS } = require('./constants');

function structureBible(bible) {
  const data = {
    translation: bible.$.translation.toUpperCase(),
    books: bible.book,
  };

  return data;
}

function structureBook(book, index) {
  // TODO: Revisit abbreviations
  const { name, abbreviation } = BOOKS[index];
  const data = {
    id: generateId(name),
    name,
    abbreviation,
    chapters: book.chapter,
  };

  return data;
}

function structureChapter(chapter, book) {
  const number = Number(chapter.$.name);
  const name = `${book.name} ${number}`;
  const data = {
    id: generateId(name),
    name,
    number,
    verses: chapter.verse,
  };

  return data;
}

function structureVerse(verse, chapter) {
  const number = Number(verse.$.name);
  const name = `${chapter.name}:${number}`;
  const data = {
    id: generateId(name),
    name,
    number,
    text: sanitizeText(verse._),
  };

  return data;
}

function structureData(bible) {
  const data = structureBible(bible);

  for (let i = 0; i < data.books.length; ++i) {
    const book = structureBook(data.books[i], i);
    data.books[i] = book;

    for (let j = 0; j < book.chapters.length; ++j) {
      const chapter = structureChapter(book.chapters[j], book);
      data.books[i].chapters[j] = chapter;

      for (let k = 0; k < chapter.verses.length; ++k) {
        const verse = structureVerse(chapter.verses[k], chapter);
        data.books[i].chapters[j].verses[k] = verse;
      }
    }
  }

  return data;
}

module.exports = {
  structureData,
};
