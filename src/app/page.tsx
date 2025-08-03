import GameSetting from "@/components/GameSetting";

function Home() {
  return (
    <main className="bg-blue-darker min-h-dvh p-6 flex flex-col gap-11 sm:gap-[4.6875rem] justify-center">
      <h1 className="text-700 sm:text-800 text-gray-lighter text-center">
        memory <span className="sr-only">game</span>
      </h1>
      <GameSetting />
    </main>
  );
}

export default Home;
