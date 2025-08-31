import * as React from 'react';

type GameActions = {
  restart: () => void;
};

type ProviderProps = {
  value: GameActions;
  children: React.ReactNode;
};

const GameActionsContext = React.createContext<GameActions | undefined>(
  undefined
);

export function useGameActions() {
  const ctx = React.useContext(GameActionsContext);
  if (!ctx)
    throw new Error('useGameActions must be used within GameActionsProvider');
  return ctx;
}

export function GameActionsProvider({ value, children }: ProviderProps) {
  return (
    <GameActionsContext.Provider value={value}>
      {children}
    </GameActionsContext.Provider>
  );
}
