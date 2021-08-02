const CANON_PROPERTIES = [
  {
    name: 'Old Testament',
    abbreviation: 'OT'
  },
  {
    name: 'New Testament',
    abbreviation: 'NT'
  }
];

const BOOK_PROPERTIES = [
  {
    name: 'Genesis',
    abbreviation: 'Gen',
    canon: 'OT'
  },
  {
    name: 'Exodus',
    abbreviation: 'Exod',
    canon: 'OT'
  },
  {
    name: 'Leviticus',
    abbreviation: 'Lev',
    canon: 'OT'
  },
  {
    name: 'Numbers',
    abbreviation: 'Num',
    canon: 'OT'
  },
  {
    name: 'Deuteronomy',
    abbreviation: 'Deut',
    canon: 'OT'
  },
  {
    name: 'Joshua',
    abbreviation: 'Josh',
    canon: 'OT'
  },
  {
    name: 'Judges',
    abbreviation: 'Judg',
    canon: 'OT'
  },
  {
    name: 'Ruth',
    abbreviation: 'Ruth',
    canon: 'OT'
  },
  {
    name: '1 Samuel',
    abbreviation: '1 Sam',
    canon: 'OT'
  },
  {
    name: '2 Samuel',
    abbreviation: '2 Sam',
    canon: 'OT'
  },
  {
    name: '1 Kings',
    abbreviation: '1 Kgs',
    canon: 'OT'
  },
  {
    name: '2 Kings',
    abbreviation: '2 Kgs',
    canon: 'OT'
  },
  {
    name: '1 Chronicles',
    abbreviation: '1 Chr',
    canon: 'OT'
  },
  {
    name: '2 Chronicles',
    abbreviation: '2 Chr',
    canon: 'OT'
  },
  {
    name: 'Ezra',
    abbreviation: 'Ezra',
    canon: 'OT'
  },
  {
    name: 'Nehemiah',
    abbreviation: 'Neh',
    canon: 'OT'
  },
  {
    name: 'Esther',
    abbreviation: 'Esth',
    canon: 'OT'
  },
  {
    name: 'Job',
    abbreviation: 'Job',
    canon: 'OT'
  },
  {
    name: 'Psalms',
    abbreviation: 'Ps',
    canon: 'OT'
  },
  {
    name: 'Proverbs',
    abbreviation: 'Prov',
    canon: 'OT'
  },
  {
    name: 'Ecclesiastes',
    abbreviation: 'Eccl',
    canon: 'OT'
  },
  {
    name: 'Song of Solomon',
    abbreviation: 'Song',
    canon: 'OT'
  },
  {
    name: 'Isaiah',
    abbreviation: 'Isa',
    canon: 'OT'
  },
  {
    name: 'Jeremiah',
    abbreviation: 'Jer',
    canon: 'OT'
  },
  {
    name: 'Lamentations',
    abbreviation: 'Lam',
    canon: 'OT'
  },
  {
    name: 'Ezekiel',
    abbreviation: 'Ezek',
    canon: 'OT'
  },
  {
    name: 'Daniel',
    abbreviation: 'Dan',
    canon: 'OT'
  },
  {
    name: 'Hosea',
    abbreviation: 'Hos',
    canon: 'OT'
  },
  {
    name: 'Joel',
    abbreviation: 'Joel',
    canon: 'OT'
  },
  {
    name: 'Amos',
    abbreviation: 'Amos',
    canon: 'OT'
  },
  {
    name: 'Obadiah',
    abbreviation: 'Obad',
    canon: 'OT'
  },
  {
    name: 'Jonah',
    abbreviation: 'Jonah',
    canon: 'OT'
  },
  {
    name: 'Micah',
    abbreviation: 'Mic',
    canon: 'OT'
  },
  {
    name: 'Nahum',
    abbreviation: 'Nah',
    canon: 'OT'
  },
  {
    name: 'Habakkuk',
    abbreviation: 'Hab',
    canon: 'OT'
  },
  {
    name: 'Zephaniah',
    abbreviation: 'Zeph',
    canon: 'OT'
  },
  {
    name: 'Haggai',
    abbreviation: 'Hag',
    canon: 'OT'
  },
  {
    name: 'Zechariah',
    abbreviation: 'Zech',
    canon: 'OT'
  },
  {
    name: 'Malachi',
    abbreviation: 'Mal',
    canon: 'OT'
  },
  {
    name: 'Matthew',
    abbreviation: 'Matt',
    canon: 'NT'
  },
  {
    name: 'Mark',
    abbreviation: 'Mark',
    canon: 'NT'
  },
  {
    name: 'Luke',
    abbreviation: 'Luke',
    canon: 'NT'
  },
  {
    name: 'John',
    abbreviation: 'John',
    canon: 'NT'
  },
  {
    name: 'Acts of the Apostles',
    abbreviation: 'Acts',
    canon: 'NT'
  },
  {
    name: 'Romans',
    abbreviation: 'Rom',
    canon: 'NT'
  },
  {
    name: '1 Corinthians',
    abbreviation: '1 Cor',
    canon: 'NT'
  },
  {
    name: '2 Corinthians',
    abbreviation: '2 Cor',
    canon: 'NT'
  },
  {
    name: 'Galatians',
    abbreviation: 'Gal',
    canon: 'NT'
  },
  {
    name: 'Ephesians',
    abbreviation: 'Eph',
    canon: 'NT'
  },
  {
    name: 'Philippians',
    abbreviation: 'Phil',
    canon: 'NT'
  },
  {
    name: 'Colossians',
    abbreviation: 'Col',
    canon: 'NT'
  },
  {
    name: '1 Thessalonians',
    abbreviation: '1 Thess',
    canon: 'NT'
  },
  {
    name: '2 Thessalonians',
    abbreviation: '2 Thess',
    canon: 'NT'
  },
  {
    name: '1 Timothy',
    abbreviation: '1 Tim',
    canon: 'NT'
  },
  {
    name: '2 Timothy',
    abbreviation: '2 Tim',
    canon: 'NT'
  },
  {
    name: 'Titus',
    abbreviation: 'Titus',
    canon: 'NT'
  },
  {
    name: 'Philemon',
    abbreviation: 'Philm',
    canon: 'NT'
  },
  {
    name: 'Hebrews',
    abbreviation: 'Heb',
    canon: 'NT'
  },
  {
    name: 'James',
    abbreviation: 'Jas',
    canon: 'NT'
  },
  {
    name: '1 Peter',
    abbreviation: '1 Pet',
    canon: 'NT'
  },
  {
    name: '2 Peter',
    abbreviation: '2 Pet',
    canon: 'NT'
  },
  {
    name: '1 John',
    abbreviation: '1 John',
    canon: 'NT'
  },
  {
    name: '2 John',
    abbreviation: '2 John',
    canon: 'NT'
  },
  {
    name: '3 John',
    abbreviation: '3 John',
    canon: 'NT'
  },
  {
    name: 'Jude',
    abbreviation: 'Jude',
    canon: 'NT'
  },
  {
    name: 'Revelation',
    abbreviation: 'Rev',
    canon: 'NT'
  }
];

module.exports = {
  BOOK_PROPERTIES,
  CANON_PROPERTIES
};
