# ABC Spelling Fun - Kids English Spelling Mini Program

A gamified WeChat Mini Program for kindergarten kids (5-6 years old) to learn English vocabulary through 4 fun game modes.

## Tech Stack

- **Taro 4** + **React 18** + **TypeScript**
- SCSS for styling with CSS animations
- WeChat Mini Program target (can also build for H5)

## Game Modes

1. **Learn (看图认词)** - Browse picture cards with pronunciation
2. **Spell (拼一拼)** - Tap letter bubbles to spell words
3. **Listen (听一听)** - Hear pronunciation and pick the correct picture
4. **Memory (翻翻看)** - Flip cards to match pictures with words

## Getting Started

```bash
# Install dependencies
npm install --legacy-peer-deps

# Development (WeChat Mini Program)
npm run dev:weapp

# Development (H5 web)
npm run dev:h5

# Production build
npm run build:weapp
```

After `dev:weapp`, open the `dist/` folder in **WeChat Developer Tools** to preview.

## Project Structure

```
src/
  pages/          - 7 pages (home, learn, spell, listen, memory, rewards, wordbank)
  components/     - Reusable components (LetterBubble, FlipCard, WordCard, etc.)
  hooks/          - React hooks (useAudio, useWordList, useProgress, useGameState)
  utils/          - Storage wrapper, spaced repetition algorithm
  data/           - words.json (85 words across 7 categories)
  static/         - Images and audio assets
```

## Adding Audio & Images

Place pronunciation MP3 files in `src/static/audio/words/` (e.g., `cat.mp3`).
Place sound effects in `src/static/audio/sfx/` (ding.mp3, pop.mp3, cheer.mp3, wrong.mp3).
Place word images in `src/static/images/<category>/` (e.g., `animals/cat.png`).

Currently using emoji placeholders - replace with real cartoon images for production.
