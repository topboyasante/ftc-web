import Image from "next/image";
import { useState } from "react";

import clsx from "clsx";
import { Clock } from "lucide-react";
import { Roboto } from "next/font/google";

import { type Post, type TEvent } from "@/types";
import { getFormattedDate } from "@/utils/date";

import { LiveIndicator } from "@/components/live-indicator";
import { ProgressBarLink } from "@/components/progress-bar";

import ReactHtmlParser from "react-html-parser";

type PostOrEvent = Post | TEvent;

interface PostCardProps {
  item: PostOrEvent;
  content_length?: number;
}

const font = Roboto({ subsets: ["latin"], weight: "500" });

export function PostCard({ item, content_length }: PostCardProps) {
  const [isImageLoading, setImageLoading] = useState(true);

  const isEvent = (item: PostOrEvent): item is TEvent => {
    return "is_live" in item;
  };

  const linkHref = isEvent(item) ? `/events/${item.id}` : `/posts/${item.id}`;
  const imageSrc = isEvent(item)
    ? item.image.image
    : item.image ?? "/images/default.jpg";
  const imageAlt = isEvent(item)
    ? item.image.caption
    : item.title ?? "free the citizens";

  return (
    <div className='bg-white overflow-hidden flex flex-row lg:flex-col justify-between h-full w-full rounded-b-xl rounded-tl-xl rounded-tr-xl'>
      <div className='flex flex-row lg:flex-col'>
        <ProgressBarLink
          href={linkHref}
          className={clsx("relative h-36 lg:w-full w-[240px]", {
            "lg:h-[12.5rem]": content_length && content_length < 4,
            "lg:h-[10.5rem]": content_length && content_length > 4,
          })}
        >
          <Image
            className={clsx(
              "object-cover lg:rounded-t-xl rounded-tl-xl rounded-b-none h-full",
              { blur: isImageLoading },
              { "remove-blur": !isImageLoading }
            )}
            src={imageSrc}
            alt={imageAlt}
            quality={75}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 80vw'
            onLoad={() => setImageLoading(false)}
          />
        </ProgressBarLink>

        <div className='px-2.5 py-5 w-full'>
          {isEvent(item) && item.is_live && <LiveIndicator label='Live' />}

          <ProgressBarLink
            href={linkHref}
            className={`mt-2 text-base font-medium ${font.className} fleap-2 hover:underline hover:text-red-500 h-28`}
          >
            <h1 className='line-clamp-1'>{item.title}</h1>
          </ProgressBarLink>
          <div className='mt-2'>
            <ProgressBarLink
              href={linkHref}
              className='font-light text-gray-800 text-sm line-clamp-1 md:line-clamp-2'
            >
              {isEvent(item) ? (
                <div className='Html__Wrapper'>
                  {ReactHtmlParser(item.description)}
                </div>
              ) : (
                <div className='Html__Wrapper'>
                  {ReactHtmlParser(item.content)}
                </div>
              )}
            </ProgressBarLink>
          </div>
          <div className='flex justify-between items-center'>
            <ProgressBarLink
              href={linkHref}
              className='text-aljazeera-red text-sm lg:mt-3 mt-1.5 flex items-center gap-0.5'
            >
              <Clock className='!text-sm' height={16} />{" "}
              {getFormattedDate(item.created_at)}
            </ProgressBarLink>
          </div>
        </div>
      </div>
    </div>
  );
}
