var test = require('tape');
var nlp = require('../lib/nlp');

test('match-capture-group', function(t) {
  let m = nlp('John eats glue').replace('[john]', '$1 smith');
  t.equal(m.out('text'), 'John smith eats glue', 'capture-group-simple');

  m = nlp('John eats glue. john is fun.').replace('[john]', '$1 smith');
  t.equal(m.out('text'), 'John smith eats glue. john smith is fun.', 'capture-group-multiple');

  m = nlp('John Smith eats glue').replace('[#Person+]', 'dr. $1');
  t.equal(m.out('text'), 'dr. John Smith eats glue', 'capture-two');

  m = nlp('ralf eats the glue').replace('ralf [#Verb]', 'he $1');
  t.equal(m.out('text'), 'he eats the glue', 'simple subset');

  m = nlp('John eats the glue').replace('the [#Noun]', 'the cyber-$1');
  t.equal(m.out('text'), 'John eats the cyber-glue', 'capture-group as subset');

  t.end();
});