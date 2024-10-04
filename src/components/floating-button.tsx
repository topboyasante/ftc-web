"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2 } from "lucide-react";
import { BsTwitterX, BsWhatsapp, BsFacebook } from "react-icons/bs";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
} from "next-share";
import { useMediaQuery } from "usehooks-ts";

export function FloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const matches = useMediaQuery("(min-width:600px)");

  const shareLink = "https://www.freethecitizens.org/";

  const SHARE_LINKS_DATA = [
    // {
    //   icon: (
    //     <button onClick={handleShare} className='md:hidden block'>
    //       <Share2 className='!text-2xl' />
    //     </button>
    //   ),
    //   type: "share",
    // },

    {
      icon: (
        <WhatsappShareButton url={shareLink}>
          <BsWhatsapp className='!text-2xl' />
        </WhatsappShareButton>
      ),
      type: "whatsapp",
    },
    {
      icon: (
        <TwitterShareButton url={shareLink}>
          <BsTwitterX />
        </TwitterShareButton>
      ),
      type: "twitter",
    },
    {
      icon: (
        <FacebookShareButton url={shareLink}>
          <BsFacebook className='!text-2xl' />
        </FacebookShareButton>
      ),
      type: "facebook",
    },
  ];

  // function handleShare() {
  //   if (!shareLink) return;

  //   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  //   try {
  //     if (isMobile && navigator?.share) {
  //       navigator.share({
  //         url: shareLink,
  //       });
  //     } else {
  //       alert("Link copied!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='fixed bottom-8 right-8' ref={buttonRef}>
      <motion.button
        className='bg-aljazeera-red text-white rounded-full p-4 shadow-lg'
        onClick={toggleMenu}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 className='h-6 w-6' />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='absolute bottom-16 right-0 bg-white rounded-full p-2 shadow-lg'
            variants={menuVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            <motion.div className='flex flex-col items-center space-y-4'>
              {SHARE_LINKS_DATA.map((social, index) =>
                social.type === "twitter" ? (
                  <motion.a
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={social.type}
                    className='bg-primary text-primary-foreground rounded-full p-3'
                    rel='noreferrer'
                    target='_blank'
                    href={`https://${
                      matches ? "" : "mobile."
                    }twitter.com/intent/tweet?text="#FreeTheCitizens#StopGalamseyNow"&url=${shareLink}`}
                  >
                    <BsTwitterX className='h-5 w-5 fill-black' />
                  </motion.a>
                ) : (
                  <motion.div
                    role='button'
                    key={index}
                    className='bg-primary text-primary-foreground rounded-full p-3'
                    variants={itemVariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
