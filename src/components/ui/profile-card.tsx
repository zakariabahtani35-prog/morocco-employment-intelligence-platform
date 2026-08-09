import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Twitter, Youtube, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProfileCardProps {
  name?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
  youtubeUrl?: string;
  linkedinUrl?: string;
  className?: string;
}

export function ProfileCard(props: ProfileCardProps) {
  const {
    name = "Karim El Amrani",
    title = "Lead Data Architect, Simplon Morocco",
    description = "Karim El Amrani is a Lead Data Architect specializing in automated ETL pipelines, cloud data warehousing, and AI analytics for labor market intelligence across Morocco's 12 economic regions.",
    imageUrl = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    githubUrl = "#",
    twitterUrl = "#",
    youtubeUrl = "#",
    linkedinUrl = "#",
    className,
  } = props;

  const socialIcons = [
    { icon: Github, url: githubUrl, label: "GitHub" },
    { icon: Twitter, url: twitterUrl, label: "Twitter" },
    { icon: Youtube, url: youtubeUrl, label: "YouTube" },
    { icon: Linkedin, url: linkedinUrl, label: "LinkedIn" },
  ];

  return (
    <div className={cn("w-full max-w-5xl mx-auto px-4", className)}>
      {/* Desktop */}
      <div className='hidden md:flex relative items-center'>
        {/* Square Image */}
        <div className='w-[470px] h-[470px] rounded-3xl overflow-hidden bg-gray-200 dark:bg-gray-700 flex-shrink-0 flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700'>
          <Image
            src={imageUrl}
            alt={name}
            width={470}
            height={470}
            className='w-full h-full object-cover'
            draggable={false}
            priority
          />
        </div>
        {/* Overlapping Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 ml-[-80px] z-10 max-w-xl flex-1 border border-gray-100 dark:border-gray-700'
        >
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-[#3B388E] dark:text-white mb-2 font-space'>
              {name}
            </h2>

            <p className='text-sm font-semibold text-[#E6004D] dark:text-rose-400'>
              {title}
            </p>
          </div>

          <p className='text-gray-700 dark:text-gray-300 text-base leading-relaxed mb-8 font-sans-body'>
            {description}
          </p>

          <div className='flex space-x-4'>
            {socialIcons.map(({ icon: Icon, url, label }) => (
              <Link
                key={label}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='w-12 h-12 bg-[#3B388E] dark:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#E6004D] dark:hover:bg-[#E6004D] hover:scale-105 shadow-md'
                aria-label={label}
              >
                <Icon className='w-5 h-5 text-white' />
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className='md:hidden max-w-sm mx-auto text-center bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700'
      >
        {/* Square Mobile Image */}
        <div className='w-full aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden mb-6 flex items-center justify-center shadow-md'>
          <Image
            src={imageUrl}
            alt={name}
            width={400}
            height={400}
            className='w-full h-full object-cover'
            draggable={false}
            priority
          />
        </div>

        <div className='px-2'>
          <h2 className='text-xl font-bold text-[#3B388E] dark:text-white mb-2 font-space'>
            {name}
          </h2>

          <p className='text-sm font-semibold text-[#E6004D] dark:text-rose-400 mb-4'>
            {title}
          </p>

          <p className='text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-6 font-sans-body'>
            {description}
          </p>

          <div className='flex justify-center space-x-4'>
            {socialIcons.map(({ icon: Icon, url, label }) => (
              <Link
                key={label}
                href={url}
                target='_blank'
                rel='noopener noreferrer'
                className='w-12 h-12 bg-[#3B388E] dark:bg-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[#E6004D] dark:hover:bg-[#E6004D] hover:scale-105 shadow-md'
                aria-label={label}
              >
                <Icon className='w-5 h-5 text-white' />
              </Link>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
