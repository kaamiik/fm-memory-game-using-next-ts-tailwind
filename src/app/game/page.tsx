import React from 'react';
import { redirect } from 'next/navigation';
import { getGameSettingsFromCookies } from '@/lib/gameSettings';
import GameStart from '@/components/GameStart';

export default async function GamePage() {
  const settings = await getGameSettingsFromCookies();

  if (!settings) {
    redirect('/');
  }

  await new Promise((r) => setTimeout(r, 750));

  return (
    <GameStart
      theme={settings.theme}
      playersNum={settings.playersNum}
      gridSize={settings.gridSize}
    />
  );
}
