const { generateId } = require('../utils/id');
const { sanitizeText } = require('../utils/string');

const { BOOK_PROPERTIES } = require('./constants');

function formatData (bibleData, options = {}) {
  const { sample } = options;

  const formatBible = (bible) => {
    const data = {
      translation: bible.$.translation,
      books: bible.book
    };

    return data;
  };

  const formatBook = (book, index) => {
    const data = {
      ...BOOK_PROPERTIES[index],
      chapters: book.chapter
    };

    return data;
  };

  const formatChapter = (chapter, book) => {
    const number = Number(chapter.$.name);
    const name = `${book.name} ${number}`;
    const data = {
      name,
      number,
      verses: chapter.verse
    };

    return data;
  };

  const formatVerse = (verse, chapter) => {
    const number = Number(verse.$.name);
    const name = `${chapter.name}:${number}`;
    const data = {
      name,
      number,
      text: sanitizeText(verse._)
    };

    return data;
  };

  const data = formatBible(bibleData);

  for (let i = 0; i < data.books.length; ++i) {
    const book = formatBook(data.books[i], i);

    if (sample) book.chapters = book.chapters.splice(0, 1);

    data.books[i] = book;

    for (let j = 0; j < book.chapters.length; ++j) {
      const chapter = formatChapter(book.chapters[j], book);

      if (sample) {
        const { verses } = chapter;
        const sampleLength = Math.ceil(verses.length * 0.291);
        chapter.verses = verses.splice(0, sampleLength);
      }

      data.books[i].chapters[j] = chapter;

      for (let k = 0; k < chapter.verses.length; ++k) {
        const verse = formatVerse(chapter.verses[k], chapter);
        data.books[i].chapters[j].verses[k] = verse;
      }
    }
  }

  return data;
}

function structureData (bibleData) {
  const structureBible = (bible) => {
    const data = {
      ...bible
    };

    return data;
  };

  const structureBook = (book) => {
    const data = {
      id: generateId(book.name),
      ...book
    };

    return data;
  };

  const structureChapter = (chapter) => {
    const data = {
      id: generateId(chapter.name),
      ...chapter
    };

    return data;
  };

  const structureVerse = (verse) => {
    const data = {
      id: generateId(verse.name),
      ...verse
    };

    return data;
  };

  const data = structureBible(bibleData);

  for (let i = 0; i < data.books.length; ++i) {
    const book = structureBook(data.books[i]);
    data.books[i] = book;

    for (let j = 0; j < book.chapters.length; ++j) {
      const chapter = structureChapter(book.chapters[j]);
      data.books[i].chapters[j] = chapter;

      for (let k = 0; k < chapter.verses.length; ++k) {
        const verse = structureVerse(chapter.verses[k]);
        data.books[i].chapters[j].verses[k] = verse;
      }
    }
  }

  return data;
}

function structureMap (bibleData) {
  const structureBible = (bible) => {
    const { translation } = bible;
    const map = {
      translation,
      books: {}
    };

    return map;
  };

  const structureBook = (book) => {
    const map = {
      ...book,
      chapters: {}
    };

    return map;
  };

  const structureChapter = (chapter) => {
    const { name, number: key } = chapter;
    const map = {
      name,
      verses: {}
    };

    return [map, key];
  };

  const structureVerse = (verse) => {
    const { name, text, number: key } = verse;
    const map = {
      name,
      text
    };

    return [map, key];
  };

  const map = structureBible(bibleData);

  for (let i = 0; i < bibleData.books.length; ++i) {
    const bookData = bibleData.books[i];
    const book = structureBook(bookData);
    const bookKey = book.abbreviation.replace(' ', '_').toLowerCase();
    map.books[bookKey] = book;

    for (let j = 0; j < bookData.chapters.length; ++j) {
      const chapterData = bookData.chapters[j];
      const [chapter, chapterKey] = structureChapter(chapterData);
      map.books[bookKey].chapters[chapterKey] = chapter;

      for (let k = 0; k < chapterData.verses.length; ++k) {
        const verseData = chapterData.verses[k];
        const [verse, verseKey] = structureVerse(verseData);
        map.books[bookKey].chapters[chapterKey].verses[verseKey] = verse;
      }
    }
  }

  return map;
}

module.exports = {
  formatData,
  structureData,
  structureMap
};
