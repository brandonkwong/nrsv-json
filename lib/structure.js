const { generateId } = require('../utils/id');
const { sanitizeText } = require('../utils/string');

const { BOOKS } = require('./constants');

function structureBible (bible) {
  const data = {
    translation: bible.$.translation.toUpperCase(),
    books: bible.book
  };

  return data;
}

function structureBook (book, index) {
  const { name, abbreviation } = BOOKS[index];
  const data = {
    id: generateId(name),
    name,
    abbreviation,
    chapters: book.chapter
  };

  return data;
}

function structureChapter (chapter, book) {
  const number = Number(chapter.$.name);
  const name = `${book.name} ${number}`;
  const data = {
    id: generateId(name),
    name,
    number,
    verses: chapter.verse
  };

  return data;
}

function structureVerse (verse, chapter) {
  const number = Number(verse.$.name);
  const name = `${chapter.name}:${number}`;
  const data = {
    id: generateId(name),
    name,
    number,
    text: sanitizeText(verse._)
  };

  return data;
}

function sampleData ({ books }) {
  const sampleChapters = (books) => {
    for (let i = 0; i < books.length; ++i) {
      const { chapters } = books[i];
      books[i].chapters = chapters.splice(0, 1);
    }
  };

  const sampleVerses = (books) => {
    for (let i = 0; i < books.length; ++i) {
      const { chapters } = books[i];
      for (let j = 0; j < chapters.length; ++j) {
        const { verses } = chapters[j];
        const sampleLength = Math.ceil(verses.length * 0.291);
        books[i].chapters[j].verses = verses.splice(0, sampleLength);
      }
    }
  };

  sampleChapters(books);
  sampleVerses(books);
}

function structureData (bible, options = {}) {
  const data = structureBible(bible);
  const { sample } = options;

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

  if (sample) sampleData(data);

  return data;
}

module.exports = {
  structureData
};
