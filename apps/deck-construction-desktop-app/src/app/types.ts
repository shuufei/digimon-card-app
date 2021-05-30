
export const COLOR = {
  red: 'red',
  blue: 'blue',
  green: 'green',
  yellow: 'yellow',
  black: 'black',
  purple: 'purple',
  white: 'white',
} as const;

export type Color = keyof typeof COLOR;
