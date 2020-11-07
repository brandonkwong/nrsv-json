function parseEmDash (text) {
  const regex = /(?<=^|\s|"|')-|-(?=$|\s|"|')/gm;
  const emDash = '\u2014';

  return text.replace(regex, emDash);
}

function sanitizeText (text) {
  return parseEmDash(text);
}

module.exports = {
  sanitizeText
};
