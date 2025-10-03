"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  CalendarDaysIcon,
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

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
          <div className="ms-8">
          <h6 className="text-gray-900 dark:text-white text-5xl font-medium tracking-tight">
            Nguyen Thi Ly
          </h6>
          <h6 className="text-gray-900 mt-5 dark:text-white text-2xl font-medium tracking-tight ms-7">
            {" "}
            Fullstack Development
          </h6>
          <div className="space-y-3 mt-3 ms-10">
            <p className="flex items-center text-gray-600 dark:text-gray-400 text-lg">
              <CalendarDaysIcon className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
              16-05-2001
            </p>
            <p className="flex items-center text-gray-600 dark:text-gray-400 text-lg">
              <PhoneIcon className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
              0346018465
            </p>
            <p className="flex items-center text-gray-600 dark:text-gray-400 text-lg">
              <EnvelopeIcon className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
              nguyenly1605nguque@gmail.com
            </p>
            <p className="flex items-center text-gray-600 dark:text-gray-400 text-lg">
              <MapPinIcon className="w-5 h-5 mr-2 text-indigo-500 flex-shrink-0" />
              51 Bình Giã, Phường Tân Bình, TP Hồ Chí Minh
            </p>

            <p className="text-gray-600 dark:text-gray-400 text-md mt-2">
              Tôi là một lập trình viên Fullstack đam mê tạo ra các ứng dụng web
              hiệu quả và thân thiện với người dùng. Với kỹ năng vững chắc trong
              cả phát triển frontend và backend, tôi luôn tìm cách học hỏi và
              áp dụng các công nghệ mới để nâng cao chất lượng sản phẩm.</p>
          </div>
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
