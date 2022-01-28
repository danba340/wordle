export const createResultString = (answer: string, guesses: string[]) => {
  return `${guesses.length}/6}${guesses
    .map((guess) => {
      return guess
        .toLowerCase()
        .split('')
        .map((letter, index) => {
          const isCorrect = letter === answer[index];
          if (isCorrect) return '🟩';
          const isMisplaced = answer.includes(letter);
          if (isMisplaced) return '🟨';
          return '⬛️';
        });
    })
    .join('\n')}`;
};
