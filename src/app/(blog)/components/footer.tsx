"use client";
import Link from "next/link";
import React from "react";
import { SiGithub } from "react-icons/si";

function Footer() {
  const hashtag = `
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow
  #FreeTheCitizens #StopGalamseyNow`;

  const handleTweet = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      hashtag
    )}`;
    window.open(twitterUrl, "_blank");
  };

  return (
    <div className=' max-w-screen-xl mx-auto px-3'>
      <div className='bg-white rounded-md px-5 py-10'>
        <h1 className='text-lg font-bold tracking-tight lg:text-xl text-aljazeera-red'>
          Do not Keep Mute !
        </h1>
        <p>
          Speak Up Against Government Misdeeds It is our civic duty to hold the
          government accountable. Stand up and speak out against the injustices
          and wrongdoings within leadership.
        </p>
        <br />
        <button
          onClick={handleTweet}
          className='bg-aljazeera-red text-white font-bold py-2 px-4 rounded hover:bg-red-700 text-sm'
        >
          Tweet with Hashtag
        </button>
      </div>
      <br />
      <footer className='w-full h-full'>
        <div className='flex flex-col w-full h-full items-center justify-between gap-5 border-t pt-8 sm:flex-row border-neutral-500'>
          <p className='text-sm'>
            <Link
              href='https://github.com/ftc-org'
              className=' text-aljazeera-red underline hover:text-aljazeera-red'
              target='_blank'
            >
              #FreeTheCitizens
            </Link>{" "}
          </p>
          <div className='flex gap-4'>
            <Link href={`https://github.com/topboyasante/ftc-web`}>
              <SiGithub />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
