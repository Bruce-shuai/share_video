import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../utils/constants';

const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    ' hover:bg-primary  text-white px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer ';
  const topicStyle =
    'hover:bg-primary text-white xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer ';

  return (
    <div className="  py-6">
      <div className="flex flex-col gap-3 flex-wrap text-white w-40">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.category}`} key={item.name}>
            <div
              className={`${
                topic === item.name ? activeTopicStyle : topicStyle
              } hover:text-gray-800 text-white`}
            >
              <span className="font-bold  text-2xl xl:text-md ">
                {item.icon}
              </span>
              <span className={`font-medium  text-md  block capitalize`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
