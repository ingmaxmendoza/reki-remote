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

  test('play-pause presses and releases AudioPlay', async () => {
    await mediaAction('play-pause');
    expect(keyboard.pressKey).toHaveBeenCalledWith(Key.AudioPlay);
    expect(keyboard.releaseKey).toHaveBeenCalledWith(Key.AudioPlay);
  });

  test('next presses AudioNext', async () => {
    await mediaAction('next');
    expect(keyboard.pressKey).toHaveBeenCalledWith(Key.AudioNext);
  });

  test('prev presses AudioPrev', async () => {
    await mediaAction('prev');
    expect(keyboard.pressKey).toHaveBeenCalledWith(Key.AudioPrev);
  });

  test('volume-up presses AudioVolUp', async () => {
    await mediaAction('volume-up');
    expect(keyboard.pressKey).toHaveBeenCalledWith(Key.AudioVolUp);
  });

  test('volume-down presses AudioVolDown', async () => {
    await mediaAction('volume-down');
    expect(keyboard.pressKey).toHaveBeenCalledWith(Key.AudioVolDown);
  });

  test('mute presses AudioMute', async () => {
    await mediaAction('mute');
    expect(keyboard.pressKey).toHaveBeenCalledWith(Key.AudioMute);
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
