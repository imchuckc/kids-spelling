// Emoji mapping for word IDs.
// Based on Cambridge YLE Starters/Movers + PEP vocabulary.
const EMOJI_MAP: Record<string, string> = {
  // Animals
  cat: '🐱', dog: '🐶', fish: '🐟', bird: '🐦', duck: '🦆',
  pig: '🐷', cow: '🐮', hen: '🐔', frog: '🐸', bear: '🐻',
  bee: '🐝', goat: '🐐', monkey: '🐵', rabbit: '🐰', horse: '🐴',
  sheep: '🐑', snake: '🐍', mouse: '🐭', donkey: '🫏', lizard: '🦎',
  tiger: '🐯', zebra: '🦓', spider: '🕷️', hippo: '🦛',
  giraffe: '🦒', elephant: '🐘', crocodile: '🐊', jellyfish: '🪼',
  monster: '👾', panda: '🐼', squirrel: '🐿️',
  ant: '🐜', lamb: '🐑', turtle: '🐢', kitten: '🐱', puppy: '🐶',
  bat: '🦇', whale: '🐋', shark: '🦈', parrot: '🦜', penguin: '🐧',
  kangaroo: '🦘', dolphin: '🐬', camel: '🐫', butterfly: '🦋',

  // Food & Drink
  apple: '🍎', banana: '🍌', orange: '🍊', grape: '🍇', pear: '🍐',
  mango: '🥭', lemon: '🍋', lime: '🍋', kiwi: '🥝', coconut: '🥥',
  pineapple: '🍍', watermelon: '🍉', tomato: '🍅', potato: '🥔',
  carrot: '🥕', onion: '🧅', pea: '🟢', bean: '🫘',
  nut: '🥜', corn: '🌽', plum: '🫐',
  egg: '🥚', bread: '🍞', cake: '🎂', pie: '🥧', rice: '🍚',
  meat: '🥩', chicken: '🍗', sausage: '🌭', burger: '🍔', chips: '🍟',
  chocolate: '🍫', candy: '🍬', noodles: '🍜', soup: '🍲', beef: '🥩',
  milk: '🥛', water: '💧', juice: '🧃', tea: '🍵', coffee: '☕',
  ice_cream: '🍦', pizza: '🍕', sandwich: '🥪', salad: '🥗',
  cheese: '🧀', cookie: '🍪', pasta: '🍝',

  // Body
  head: '😊', face: '😃', eye: '👁️', ear: '👂', nose: '👃',
  mouth: '👄', hair: '💇', hand: '🤚', arm: '💪', leg: '🦵',
  foot: '🦶', finger: '☝️', body: '🧍', tail: '🐕',
  shoulder: '🤷', neck: '🦒', teeth: '🦷', beard: '🧔',

  // Colors
  red: '🔴', blue: '🔵', green: '🟢', yellow: '🟡', pink: '🩷',
  black: '⚫', white: '⚪', brown: '🟤', purple: '🟣', gray: '⬜',

  // Numbers
  one: '1️⃣', two: '2️⃣', three: '3️⃣', four: '4️⃣', five: '5️⃣',
  six: '6️⃣', seven: '7️⃣', eight: '8️⃣', nine: '9️⃣', ten: '🔟',

  // Family & People
  mom: '👩', dad: '👨', baby: '👶', boy: '👦', girl: '👧',
  brother: '👦', sister: '👧', grandma: '👵', grandpa: '👴',
  friend: '🧑‍🤝‍🧑', teacher: '👩‍🏫', kid: '🧒', cousin: '👫',
  uncle: '👨‍🦱', aunt: '👩‍🦱', doctor: '👨‍⚕️', nurse: '👩‍⚕️',
  farmer: '👨‍🌾', driver: '🚗',

  // School
  book: '📚', pen: '✏️', pencil: '✏️', ruler: '📏', eraser: '🧽',
  crayon: '🖍️', bag: '🎒', desk: '🪑', chair: '💺', board: '📋',
  clock: '🕐', paper: '📄', page: '📃', school: '🏫', lesson: '📖',
  computer: '💻', tablet: '📱', bookcase: '📚',
  light: '💡', fan: '🌀', notebook: '📓', library: '📚',

  // Clothes
  hat: '🧢', shirt: '👕', shoe: '👟', sock: '🧦', dress: '👗',
  skirt: '👗', jacket: '🧥', jeans: '👖', shorts: '🩳', boots: '👢',
  glasses: '👓', pants: '👖', scarf: '🧣', glove: '🧤',
  coat: '🧥', sweater: '🧶', pocket: '👖',

  // Home & Places
  house: '🏠', door: '🚪', window: '🪟', wall: '🧱', floor: '🏠',
  room: '🛋️', bedroom: '🛏️', bathroom: '🚿', kitchen: '🍳', garden: '🌻',
  park: '🏞️', shop: '🏪', street: '🛣️', beach: '🏖️', zoo: '🦁',
  hall: '🏛️', farm: '🌾', city: '🏙️', forest: '🌲', lake: '🏞️',
  river: '🏞️', mountain: '⛰️', hill: '🏔️', bridge: '🌉', village: '🏘️',
  hospital: '🏥', cinema: '🎬', circus: '🎪',

  // Things & Transport
  car: '🚗', bus: '🚌', bike: '🚲', boat: '⛵', plane: '✈️',
  train: '🚂', truck: '🚛', ship: '🚢', helicopter: '🚁',
  ball: '⚽', doll: '🧸', kite: '🪁', toy: '🧸', robot: '🤖',
  phone: '📱', camera: '📷', radio: '📻',
  bed: '🛏️', table: '🪑', lamp: '💡', sofa: '🛋️', mirror: '🪞',
  cup: '🥤', box: '📦', key: '🔑', mat: '🧹', rug: '🧶',
  watch: '⌚', poster: '🖼️', photo: '📸', picture: '🖼️',
  balloon: '🎈', guitar: '🎸', piano: '🎹', song: '🎵', story: '📖',
  handbag: '👜', umbrella: '☂️', fridge: '🧊',
  bottle: '🍼', blanket: '🛏️', basket: '🧺', present: '🎁', bicycle: '🚲',
  map: '🗺️', net: '🥅', lemonade: '🍋',

  // Nature & Weather
  sun: '☀️', moon: '🌙', star: '⭐', tree: '🌳', flower: '🌸',
  sand: '🏖️', sea: '🌊', shell: '🐚',
  rain: '🌧️', snow: '❄️', cloud: '☁️', wind: '💨', rainbow: '🌈',
  island: '🏝️', plant: '🌱',

  // Sports
  football: '⚽', basketball: '🏀', baseball: '⚾', tennis: '🎾',
  hockey: '🏑', game: '🎮', sport: '🏅',
};

export function getEmojiForWord(id: string): string {
  return EMOJI_MAP[id] || '';
}

export function hasEmoji(id: string): boolean {
  return !!EMOJI_MAP[id];
}
