"use client";
import { useGetPosts } from "@/api";
import { useGetEvents } from "@/api/get-events";
import { ProgressBarLink } from "@/components/progress-bar";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { PostCard } from "./post-card";

export function LatestContent({ type }: { type: "Events" | "Posts" }) {
  const { events } = useGetEvents({ isLive: true });
  const { posts } = useGetPosts();

  const content = type === "Events" ? events : posts;

  const contentLength = content?.length;

  return (
    <div>
      <div className='flex items-center justify-between my-8'>
        <h1 className='text-aljazeera-red text-xl font-medium'>
          Latest {type}
        </h1>
        {content
          ? content.length > 4 && (
              <div className='text-aljazeera-red text-xl font-medium flex items-center gap-1'>
                <ProgressBarLink href={`/${type.toLowerCase()}`}>
                  <span>View more</span>
                </ProgressBarLink>{" "}
                <ChevronRight />
              </div>
            )
          : null}
      </div>
      <ul
        className={clsx("grid grid-cols-1 md:grid-cols-2 gap-6", {
          "lg:grid-cols-3": contentLength && contentLength < 4,
          "lg:grid-cols-4": contentLength && contentLength >= 4,
        })}
      >
        {content?.slice(0, 4)?.map((item, index) => (
          <li key={index} className='list-none'>
            <PostCard key={index} item={item} content_length={contentLength} />
          </li>
        ))}
      </ul>
    </div>
  );
}
