import assert from 'assert';
import { KIND, STRAIGHT } from '../src/enums';
import Yatzy from '../src/Yatzy';

const yatzy = new Yatzy()

describe('Chance', () => {
  it('scores sum of all dice', () => {
    assert.strictEqual(yatzy.chance(2, 3, 4, 5, 1), 15);
    assert.strictEqual(yatzy.chance(3, 3, 4, 5, 1), 16);
  });
});

describe('Yatzy', () => {
  it('scores 50', () => {
    assert.strictEqual(yatzy.yatzy(4, 4, 4, 4, 4), 50);
    assert.strictEqual(yatzy.yatzy(6, 6, 6, 6, 6), 50);
    assert.strictEqual(yatzy.yatzy(6, 6, 6, 6, 3), 0);
  });
});

describe('Ones', () => {
  it('score the sum of 1s', () => {
    assert.strictEqual(yatzy.scores(1, 1, 2, 3, 4, 5), 1);
    assert.strictEqual(yatzy.scores(1, 1, 2, 1, 4, 5), 2);
    assert.strictEqual(yatzy.scores(1, 6, 2, 2, 4, 5), 0);
    assert.strictEqual(yatzy.scores(1, 1, 2, 1, 1, 1), 4);
  });
});

describe('Twos', () => {
  it('score the sum of 2s', () => {
    assert.strictEqual(yatzy.scores(2, 1, 2, 3, 2, 6), 4);
    assert.strictEqual(yatzy.scores(2, 2, 2, 2, 2, 2), 10);
  });
});

describe('Threes', () => {
  it('score the sum of 3s', () => {
    assert.strictEqual(yatzy.scores(3, 1, 2, 3, 2, 3), 6);
    assert.strictEqual(yatzy.scores(3, 2, 3, 3, 3, 3), 12);
  });
});

describe('Fours', () => {
  it('score the sum of 4s', () => {
    assert.strictEqual(yatzy.scores(4, 4, 4, 4, 5, 5), 12);
    assert.strictEqual(yatzy.scores(4, 4, 4, 5, 5, 5), 8);
    assert.strictEqual(yatzy.scores(4, 4, 5, 5, 5, 5), 4);
  });
});

describe('Fives', () => {
  it('score the sum of fives', () => {
    assert.strictEqual(yatzy.scores(5, 4, 4, 4, 5, 5), 10);
    assert.strictEqual(yatzy.scores(5, 4, 4, 5, 5, 5), 15);
    assert.strictEqual(yatzy.scores(5, 4, 5, 5, 5, 5), 20);
  });
});

describe('Sixes', () => {
  it('score the sum of sixes', () => {
    assert.strictEqual(yatzy.scores(6, 4, 4, 4, 5, 5), 0);
    assert.strictEqual(yatzy.scores(6, 4, 4, 6, 5, 5), 6);
    assert.strictEqual(yatzy.scores(6, 6, 5, 6, 6, 5), 18);
  });
});

describe('One pair', () => {
  it('scores the sum of the highest pair', () => {
    assert.strictEqual(yatzy.scorePair(1, 3, 4, 3, 5, 6), 6);
    assert.strictEqual(yatzy.scorePair(1, 5, 3, 3, 3, 5), 10);
    assert.strictEqual(yatzy.scorePair(1, 5, 3, 6, 6, 5), 12);
  });
});

describe('Two pair', () => {
  it('scores the sum of the two pairs', () => {
    assert.strictEqual(yatzy.scorePair(2, 3, 3, 5, 4, 5), 16);
    assert.strictEqual(yatzy.scorePair(2, 3, 3, 5, 5, 5), 16);
  });
});

describe('Three of a kind', () => {
  it('scores the sum of the three of the kind', () => {
    assert.strictEqual(yatzy.scoreKind(KIND.THREE, 3, 3, 3, 4, 5), 9);
    assert.strictEqual(yatzy.scoreKind(KIND.THREE, 5, 3, 5, 4, 5), 15);
    assert.strictEqual(yatzy.scoreKind(KIND.THREE, 3, 3, 3, 3, 5), 9);
  });
});

describe('Four of a kind', () => {
  it('scores the sum of the four of the kind', () => {
    assert.strictEqual(yatzy.scoreKind(KIND.FOUR, 3, 3, 3, 3, 5), 12);
    assert.strictEqual(yatzy.scoreKind(KIND.FOUR, 5, 5, 5, 4, 5), 20);
  });
});

describe('Small straight', () => {
  it('scores 15', () => {
    assert.strictEqual(yatzy.scoreStraight(STRAIGHT.SMALL, 1, 2, 3, 4, 5), 15);
    assert.strictEqual(yatzy.scoreStraight(STRAIGHT.SMALL, 2, 3, 4, 5, 1), 15);
    assert.strictEqual(yatzy.scoreStraight(STRAIGHT.SMALL, 1, 2, 2, 4, 5), 0);
  });
});

describe('Large straight', () => {
  it('scores 20', () => {
    assert.strictEqual(yatzy.scoreStraight(STRAIGHT.LARGE, 6, 2, 3, 4, 5), 20);
    assert.strictEqual(yatzy.scoreStraight(STRAIGHT.LARGE, 2, 3, 4, 5, 6), 20);
    assert.strictEqual(yatzy.scoreStraight(STRAIGHT.LARGE, 1, 2, 2, 4, 5), 0);
  });
});

describe('Full house', () => {
  it('scores the sum of the full house', () => {
    assert.strictEqual(yatzy.fullHouse(6, 2, 2, 2, 6), 18);
    assert.strictEqual(yatzy.fullHouse(2, 3, 4, 5, 6), 0);
  });
});
