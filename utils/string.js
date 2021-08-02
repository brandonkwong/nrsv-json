function parseEmDash (text) {
  const regex = /-\s|\s-|(?<=^|["'])-|-(?=$|["'])/gm;
  const emDash = '\u2014';

  return text.replace(regex, emDash);
}

function sanitizeText (text) {
  return parseEmDash(text);
}

function slugify (string) {
  return string.replace(' ', '-').toLowerCase();
}

module.exports = {
  sanitizeText,
  slugify
};
