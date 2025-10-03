"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CalendarDaysIcon, EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/24/outline";


export default function BlogPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="grid grid-cols-2 gap-4 w-full max-w-5xl">
        {/* Card text */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5 flex flex-col justify-center h-full"
        >
          <h3 className="text-gray-900 dark:text-white text-xl font-medium tracking-tight">
            Nguyen Thi Ly
          </h3>
          <h5 className="text-gray-900 dark:text-white text-sm font-medium tracking-tight mt-2 ms-3"> Fullstack Development</h5>
    <div className="space-y-3 mt-3 ms-3">
      <p className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
        <CalendarDaysIcon className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
        16-05-2001
      </p>
            <p className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
        <PhoneIcon className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
        0346018465
      </p>
      <p className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
        <EnvelopeIcon className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
        nguyenly1605nguque@gmail.com
      </p>
      <p className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
        <MapPinIcon className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
        51 Bình Giã, Phường Tân Bình, TP Hồ Chí Minh
      </p>
    </div>

        </motion.div>

        {/* Card ảnh */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative rounded-lg overflow-hidden ring shadow-xl ring-gray-900/5 aspect-square"
        >
          <Image
            src="/image/profile.jpeg"
            alt="Nguyen Thi Ly"
            fill
            className="object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
}
