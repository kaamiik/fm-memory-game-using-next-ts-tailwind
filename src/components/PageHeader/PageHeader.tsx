import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import GameButton from '../GameButton';
import GameDialog from '../GameDialog';
import { useGameActions } from '@/context/GameActionsContext';

function PageHeader() {
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const { restart } = useGameActions();

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  function handleRestart() {
    restart();
    closeDialog();
  }

  return (
    <header className="p-6 sm:p-10 lg:p-[4.25rem] xl:px-0">
      <div className="mx-auto flex max-w-[69.375rem] flex-wrap items-center justify-between">
        <Link
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 focus-visible:outline-dotted"
          href="/"
        >
          <Image
            alt=""
            src="/assets/logo.svg"
            width={92}
            height={30}
            className="h-auto sm:w-[153px]"
          />
          <p className="sr-only">MEMORY GAME SITE</p>
        </Link>
        {/* Mobile button */}
        <GameButton
          type="button"
          className="bg-yellow text-400 text-gray-lighter hover:bg-yellow-light focus-visible:bg-yellow-light px-[1.125rem] py-2.5 sm:hidden"
          onClick={openDialog}
        >
          Menu
        </GameButton>
        {/* Tablet & Desktop buttons */}
        <div className="hidden items-center gap-4 sm:flex">
          <GameButton
            type="reset"
            className="bg-yellow text-500 text-gray-lighter hover:bg-yellow-light focus-visible:bg-yellow-light px-7 py-3.5"
            onClick={handleRestart}
          >
            Restart
          </GameButton>
          <GameButton
            href="/"
            replace
            className="bg-blue-lighter text-500 text-blue-dark hover:bg-blue-medium hover:text-gray-lighter focus-visible:bg-blue-medium focus-visible:text-gray-lighter px-6 py-3.5"
          >
            New Game
          </GameButton>
        </div>
      </div>
      <GameDialog ref={dialogRef} onRestart={handleRestart} />
    </header>
  );
}

export default PageHeader;
