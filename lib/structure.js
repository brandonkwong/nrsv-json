const { generateId } = require('../utils/id');
const { sanitizeText, slugify } = require('../utils/string');

const { BOOK_PROPERTIES, CANON_PROPERTIES } = require('./constants');

function formatData (bibleData) {
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
    data.books[i] = book;

    for (let j = 0; j < book.chapters.length; ++j) {
      const chapter = formatChapter(book.chapters[j], book);
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
    const { name, abbreviation, chapters } = book;
    const data = {
      id: generateId(book.name),
      name,
      abbreviation,
      chapters
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
      name: book.name,
      abbreviation: book.abbreviation,
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

function structureSanity (bibleData) {
  const structureBible = (bible) => {
    const data = [
      ...bible.books
    ];

    return data;
  };

  const structureCanon = (canon) => {
    const data = {
      _id: generateId(canon.name),
      _type: 'canon',
      name: canon.name,
      slug: {
        _type: 'slug',
        current: slugify(canon.abbreviation)
      },
      books: []
    };

    return data;
  };

  const canons = CANON_PROPERTIES.map(canon => structureCanon(canon));

  const structureBook = (book) => {
    const data = {
      _id: generateId(book.name),
      _type: 'book',
      name: book.name,
      slug: {
        _type: 'slug',
        current: slugify(book.abbreviation)
      },
      chapters: book.chapters,
      canon: {
        _type: 'reference',
        _ref: canons.find(canon => canon.slug.current === slugify(book.canon))?._id
      }
    };

    return data;
  };

  const structureChapter = (chapter) => {
    const data = {
      _id: generateId(chapter.name),
      _type: 'chapter',
      ...chapter
    };

    return data;
  };

  const structureVerse = (verse) => {
    const data = {
      _id: generateId(verse.name),
      _type: 'verse',
      ...verse
    };

    return data;
  };

  const books = structureBible(bibleData);

  for (let i = 0; i < books.length; ++i) {
    const book = structureBook(books[i]);

    canons.find(canon => canon._id === book.canon._ref && canon.books.push({
      _type: 'reference',
      _ref: book._id
    }));

    books[i] = book;

    for (let j = 0; j < book.chapters.length; ++j) {
      const chapter = structureChapter(book.chapters[j]);
      books[i].chapters[j] = chapter;

      for (let k = 0; k < chapter.verses.length; ++k) {
        const verse = structureVerse(chapter.verses[k]);
        books[i].chapters[j].verses[k] = verse;
      }
    }
  }

  return [...canons, ...books];
}

module.exports = {
  formatData,
  structureData,
  structureMap,
  structureSanity
};
