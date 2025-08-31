import { cookies } from 'next/headers';
import Cookies from 'js-cookie';

export type GameTheme = 'numbers' | 'icons';
export type PlayersNum = 1 | 2 | 3 | 4;
export type GridSize = '4x4' | '6x6';

export type GameSettings = {
  theme: GameTheme;
  playersNum: PlayersNum;
  gridSize: GridSize;
};

export const DEFAULT_SETTINGS: GameSettings = {
  theme: 'numbers',
  playersNum: 1,
  gridSize: '4x4',
};

const COOKIE_NAME = 'memory-game-settings';
const COOKIE_OPTIONS = {
  expires: 30,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict' as const,
};

function isValidSettings(settings: unknown): settings is GameSettings {
  return (
    typeof settings === 'object' &&
    settings !== null &&
    typeof (settings as Record<string, unknown>).theme === 'string' &&
    ['numbers', 'icons'].includes(
      (settings as Record<string, unknown>).theme as string
    ) &&
    typeof (settings as Record<string, unknown>).playersNum === 'number' &&
    [1, 2, 3, 4].includes(
      (settings as Record<string, unknown>).playersNum as number
    ) &&
    typeof (settings as Record<string, unknown>).gridSize === 'string' &&
    ['4x4', '6x6'].includes(
      (settings as Record<string, unknown>).gridSize as string
    )
  );
}

export async function getGameSettingsFromCookies(): Promise<GameSettings> {
  const cookieStore = await cookies();
  const settingsCookie = cookieStore.get(COOKIE_NAME);

  if (settingsCookie?.value) {
    try {
      const parsed = JSON.parse(settingsCookie.value);
      if (isValidSettings(parsed)) {
        return parsed;
      }
    } catch {
      console.warn('Failed to parse game settings cookie:', Error);
    }
  }

  return DEFAULT_SETTINGS;
}

export function getGameSettingsFromClient(): GameSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;

  const settingsCookie = Cookies.get(COOKIE_NAME);
  if (settingsCookie) {
    try {
      const parsed = JSON.parse(settingsCookie);
      if (isValidSettings(parsed)) {
        return parsed;
      }
    } catch {
      console.warn('Failed to parse game settings cookie:', Error);
    }
  }

  return DEFAULT_SETTINGS;
}

export function saveGameSettingsToClient(settings: GameSettings): void {
  if (typeof window === 'undefined') return;

  Cookies.set(COOKIE_NAME, JSON.stringify(settings), COOKIE_OPTIONS);
}
