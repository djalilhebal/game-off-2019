const {describe} = require('riteway');
// const Gress = require('./index.js');

describe('extractArticle(str)', async (test) => {
  const str = 'https://en.wikipedia.org/wiki/Louis_Pasteur#Spontaneous_generation';
  test({
    given: 'wikipedia link',
    should: 'return article ',
    expected: 'Louis Pasteur',
    actual: Gress.extractArticle(str)
  })
})
