jest.mock('@nut-tree-fork/nut-js', () => ({
  keyboard: {
    pressKey: jest.fn().mockResolvedValue(undefined),
    releaseKey: jest.fn().mockResolvedValue(undefined),
    type: jest.fn().mockResolvedValue(undefined),
  },
  Key: {
    AudioPlay: 'AudioPlay',
    AudioNext: 'AudioNext',
    AudioPrev: 'AudioPrev',
    AudioVolUp: 'AudioVolUp',
    AudioVolDown: 'AudioVolDown',
    AudioMute: 'AudioMute',
  },
}));

const { keyboard, Key } = require('@nut-tree-fork/nut-js');
const { mediaAction, typeText } = require('../lib/input');

describe('mediaAction', () => {
  beforeEach(() => jest.clearAllMocks());

  test.each([
    ['play-pause', 'AudioPlay'],
    ['next', 'AudioNext'],
    ['prev', 'AudioPrev'],
    ['volume-up', 'AudioVolUp'],
    ['volume-down', 'AudioVolDown'],
    ['mute', 'AudioMute'],
  ])('%s presses and releases %s', async (action, keyName) => {
    await mediaAction(action);
    expect(keyboard.pressKey).toHaveBeenCalledWith(Key[keyName]);
    expect(keyboard.releaseKey).toHaveBeenCalledWith(Key[keyName]);
  });

  test('unknown action throws', async () => {
    await expect(mediaAction('bogus')).rejects.toThrow('Unknown media action: bogus');
  });
});

describe('typeText', () => {
  beforeEach(() => jest.clearAllMocks());

  test('types the given string', async () => {
    await typeText('hello world');
    expect(keyboard.type).toHaveBeenCalledWith('hello world');
  });
});
