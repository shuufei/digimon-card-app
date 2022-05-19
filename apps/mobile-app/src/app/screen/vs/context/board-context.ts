import { createContext } from 'react';

export const BoardContext = createContext<{ side: 'myself' | 'opponent' }>({
  side: 'myself',
});
