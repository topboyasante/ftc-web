"use client";
import React, { useEffect, useState } from "react";

import { LiveUpdateCard } from "./live-update-card";
import { PostCard } from "./post-card";

import { useGetPosts } from "@/api";
import { useGetEvents } from "@/api/get-events";
import { ImageMasonryLayout } from "@/components/masonry-layout";
import { ProgressBarLink } from "@/components/progress-bar";
import { mediaItems, PATRIOTS } from "@/mocks/gallery";
import { ChevronRight } from "lucide-react";
import { LatestContent } from "./latest-content";
import { MediaItem } from "@/types/media";
import { shuffleArray } from "@/utils/functions";

function Landing() {
  const { events, isSuccess } = useGetEvents({ isLive: false });
  const { posts } = useGetPosts();

  const [shuffledImages, setShuffledImages] = useState<MediaItem[]>(
    PATRIOTS.slice(0, 6)
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newShuffledImages = shuffleArray([...PATRIOTS, ...mediaItems]);
      setShuffledImages(newShuffledImages);
    }, 4500);

    return () => clearInterval(intervalId);
  }, []);

  const trendingLinks = [
    {
      tag: "FreeTheCitizens",
    },
    {
      tag: "StopGalamsey",
    },
    {
      tag: "StopGalamseyNow",
    },
  ];

  const handleTweet = (hashtag: string) => {
    const twitterUrl = `https://x.com/search?q=${encodeURIComponent(
      `#${hashtag}`
    )}&src=typed_query&f=top`;
    window.open(twitterUrl, "_blank", "noopener,noreferrer");
  };

  const showLiveEvents = events && events.filter((event) => event.is_live);

  return (
    <>
      <div>
        <h1 className='text-lg font-bold tracking-tight lg:text-3xl text-aljazeera-red'>
          #FreeTheCitizens
        </h1>
        <p>
          Empowering Voices, Amplifying Justice. Stay Informed with
          #FreetheCitizens.
        </p>
      </div>
      <div className='mt-5 flex items-center gap-3 w-full overflow-x-scroll'>
        {trendingLinks.map((link, index) => {
          return (
            <button
              key={index}
              onClick={() => handleTweet(link.tag)}
              className='rounded-md px-2 py-1 bg-aljazeera-red text-white hover:text-aljazeera-red hover:bg-white ease duration-200 w-fit grid place-items-center'
            >
              #{link.tag}
            </button>
          );
        })}
      </div>
      <div className='flex lg:flex-row flex-col gap-10'>
        <div className='mt-10 lg:w-6/12 w-full'>
          <LiveUpdateCard />
        </div>

        <div className='lg:w-5/12'>
          {isSuccess && showLiveEvents?.length === 0 ? null : (
            <ul className='mt-10 flex-1 grid md:grid-cols-2 grid-cols-1 h-fit gap-7'>
              {showLiveEvents?.slice(0, 4)?.map((event, index) => (
                <PostCard item={event} key={index} />
              ))}
            </ul>
          )}

          <ul className='mt-4 md:block hidden'>
            <div className='flex items-center justify-between'>
              <h1 className='my-2 text-lg'>Media</h1>
              <ProgressBarLink
                href='/gallery'
                className='my-2 text-lg flex items-center gap-1'
              >
                <span> See All </span>
                <ChevronRight />
              </ProgressBarLink>
            </div>
            <ImageMasonryLayout mediaItems={shuffledImages.slice(0, 6)} />
          </ul>
        </div>
      </div>

      {posts && posts?.length === 0 ? null : (
        <div>
          <LatestContent type='Posts' />
        </div>
      )}

      {events && events.length === 0 ? null : (
        <div className='py-10'>
          <LatestContent type='Events' />
        </div>
      )}
    </>
  );
}

export default Landing;
