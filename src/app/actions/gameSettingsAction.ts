'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { type GameSettings } from '@/lib/gameSettings';

export async function saveGameSettings(formData: FormData) {
  const theme = formData.get('theme') as 'numbers' | 'icons';
  const playersNum = Number(formData.get('playersNum')) as 1 | 2 | 3 | 4;
  const gridSize = formData.get('grid') as '4x4' | '6x6';

  if (
    !['numbers', 'icons'].includes(theme) ||
    ![1, 2, 3, 4].includes(playersNum) ||
    !['4x4', '6x6'].includes(gridSize)
  ) {
    throw new Error('Invalid game settings');
  }

  const settings: GameSettings = { theme, playersNum, gridSize };

  const cookieStore = await cookies();
  cookieStore.set('memory-game-settings', JSON.stringify(settings), {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    httpOnly: false,
  });

  redirect('/game');
}
