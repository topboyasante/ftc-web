"use client";
import { useGetEvents } from "@/api/get-events";
import { PostCard } from "../components/post-card";
import Meta from "../components/Meta";
import React from "react";

function EventsPage() {
  const { events } = useGetEvents({});
  return (
    <>
      <Meta title='Events - #FreeTheCitizens' description='Events page' />
      <div className='max-w-screen-xl mx-auto px-3 min-h-screen'>
        <div>
          <h1 className='text-lg font-bold tracking-tight lg:text-3xl text-aljazeera-red'>
            Events
          </h1>
          <p>View Events happening across the country</p>
        </div>
        <br />
        <div>
          {events && events.length <= 0 ? (
            <div className='flex justify-center items-center'>
              <p className='text-neutral-500'>No Events to display</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
              {events?.map((item, index) => {
                return <PostCard item={item} key={index} />;
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EventsPage;
