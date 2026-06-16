const { keyboard, Key } = require('@nut-tree-fork/nut-js');

const ACTION_KEYS = {
  'play-pause': Key.AudioPlay,
  next: Key.AudioNext,
  prev: Key.AudioPrev,
  'volume-up': Key.AudioVolUp,
  'volume-down': Key.AudioVolDown,
  mute: Key.AudioMute,
};

async function mediaAction(action) {
  const key = ACTION_KEYS[action];
  if (!key) {
    throw new Error(`Unknown media action: ${action}`);
  }
  await keyboard.pressKey(key);
  await keyboard.releaseKey(key);
}

async function typeText(text) {
  await keyboard.type(text);
}

module.exports = { mediaAction, typeText };
