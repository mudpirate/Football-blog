import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 dark:text-white dark:bg-black py-12 text-gray-800">
      <h1 className="text-4xl font-bold dark:text-white text-center mb-6 text-black">
        About The Pitch
      </h1>

      <p className="text-lg  mb-6 leading-relaxed">
        <strong className="dark:text-white">The Pitch</strong> is your home
        ground for everything football. Whether you're a die-hard fan, a stats
        nerd, or a curious newcomer to the beautiful game, this blog is built
        for you. From legendary players and tactical deep-dives to match
        previews, transfers, and rising stars — we cover it all.
      </p>

      <p className="text-lg mb-6 leading-relaxed">
        Football is more than a sport — it's a global culture. At{" "}
        <strong>The Pitch</strong>, we bring you stories that celebrate the
        passion, emotion, and drama of the game. Our articles are written by
        fans, for fans — blending insightful analysis with a love for the sport
        that’s hard to miss.
      </p>

      <p className="text-lg mb-6 leading-relaxed">
        Whether it’s the magic of Messi, the dominance of Real Madrid, or the
        rise of the next Jude Bellingham — we’re here to break it down, share
        opinions, and spark conversations. Join our growing community and be
        part of the game.
      </p>

      <div className="bg-gray-200 dark:text-white dark:bg-black  p-6 rounded-xl shadow mt-10">
        <h2 className="text-2xl font-semibold dark:text-white dark:bg-black  text-black mb-4">
          Why “The Pitch”?
        </h2>
        <p className="text-base leading-relaxed dark:text-white dark:bg-black  text-gray-700">
          Every story begins on the pitch — where dreams are made, legends are
          born, and rivalries come alive. Our blog captures the essence of that
          magic and delivers it straight to your screen.
        </p>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600">
          ⚽ Built with passion. Written with love. Powered by football.
        </p>
      </div>
    </div>
  );
};

export default About;
