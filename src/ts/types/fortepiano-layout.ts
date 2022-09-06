const FortepianoKeys = {
  Tab: 'D1',
  Digit1: 'D#1',
  KeyQ: 'E1',
  KeyW: 'F1',
  Digit3: 'F#1',
  KeyE: 'G1',
  Digit4: 'G#1',
  KeyR: 'A1',
  Digit5: 'A#1',
  KeyT: 'B1',
  KeyY: 'C2',
  Digit7: 'C#2',
  KeyU: 'D2',
  Digit8: 'D#2',
  KeyI: 'E2',
  KeyO: 'F2',
  Digit0: 'F#2',
  KeyP: 'G2',
  Minus: 'G#2',
  BracketLeft: 'A2',
  Equal: 'A#2',
  BracketRight: 'B2',
  ShiftLeft: 'C3',
  KeyA: 'C#3',
  KeyZ: 'D3',
  KeyS: 'D#3',
  KeyX: 'E3',
  KeyC: 'F3',
  KeyF: 'F#3',
  KeyV: 'G3',
  KeyG: 'G#3',
  KeyB: 'A3',
  KeyH: 'A#3',
  KeyN: 'B3',
  KeyM: 'C4',
  KeyK: 'C#4',
  Comma: 'D4',
  KeyL: 'D#4',
  Period: 'E4',
  Slash: 'F4',
  Quote: 'F#4',
  ShiftRight: 'G4',
  Enter: 'G#4',
  ArrowLeft: 'A4',
  ArrowUp: 'A#4',
  ArrowRight: 'B4',
} as Record<KeyboardEvent['code'], string>;

export default FortepianoKeys;
