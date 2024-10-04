"use client"
import React from "react";
import Image from "next/image";
import { AlertTriangle, Droplet } from "lucide-react";
import { FaCapsules } from "react-icons/fa";

export default function AboutUs() {
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
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="relative h-[650px] bg-gray-900">
        <Image
          src="/images/about-us.jpeg"
          alt="Galamsey site in Ghana"
          layout="fill"
          objectFit="cover"
          className="opacity-50 object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center">
            Free The Citizens
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              About Us
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Free The Citizens is a grassroots initiative dedicated to raising
              awareness about the devastating effects of galamsey (illegal
              mining) on Ghana&apos;s water bodies and environment. Our mission
              is to educate, advocate, and mobilize citizens to take action
              against this pressing issue.
            </p>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <AlertTriangle className="mr-2 text-yellow-500" />
                The Galamsey Crisis
              </h3>
              <p className="text-gray-700">
                Galamsey operations are destroying Ghana&apos;s water bodies,
                making them unsafe for drinking and other essential uses. This
                illegal mining activity poses a severe threat to public health,
                agriculture, and the overall ecosystem.
              </p>
            </div>
          </div>
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <Droplet className="mr-2 text-blue-500" />
                Impact on Water Resources
              </h3>
              <p className="text-gray-700">
                The pollution caused by galamsey has rendered many water bodies
                in Ghana unusable. Rivers and streams that once provided clean
                water for communities are now contaminated with harmful
                chemicals and sediment.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                <FaCapsules className="mr-2 text-red-500" />
                Pharmaceutical Industry Concerns
              </h3>
              <p className="text-gray-700">
                The Pharmaceutical Society of Ghana (PSG) has raised alarms that
                the country may soon need to import water to produce local
                pharmaceutical medicines. This highlights the far-reaching
                consequences of galamsey on various sectors of the economy.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-aljazeera-red rounded-lg shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Join Our Cause</h2>
          <p className="text-lg mb-6">
            Together, we can make a difference. Join us in our fight against
            galamsey and help protect Ghana&apos;s precious water resources for
            future generations.
          </p>
          <button
            onClick={handleTweet}
            className="bg-white text-aljazeera-red font-semibold py-2 px-4 rounded-lg hover:bg-red-100 transition duration-300"
          >
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
}
