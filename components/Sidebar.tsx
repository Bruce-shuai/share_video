import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';
import Image from 'next/image';
import SuggestedAccounts from './SuggestedAccounts';
import Discover from './Discover';
import Footer from './Footer';
import useAuthStore from '../store/authStore';
const Sidebar: NextPage = () => {
  const { pathname } = useRouter();
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const activeLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-red-500 active:text-red-600 hover:text-red-600 rounded';

  const normalLink =
    'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded';

  return (
    <div className="h-full">
      {
        <div className="w-48 h-full flex flex-col justify-start mb-10  p-3 bg-slate-800">
          <div>
            <Link href="/">
              <div className={pathname === '/' ? activeLink : normalLink}>
                <p className="text-2xl">
                  <Image
                    src="/images/logo.webp"
                    alt="logo"
                    width={50}
                    height={50}
                  />
                </p>
                <span className=" text-3xl hidden xl:block text-white">
                  爱生活
                </span>
              </div>
            </Link>
          </div>

          <Discover />
          <SuggestedAccounts
            fetchAllUsers={fetchAllUsers}
            allUsers={allUsers}
          />
        </div>
      }
    </div>
  );
};

export default Sidebar;
