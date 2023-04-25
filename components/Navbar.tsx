import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { GoogleLogin, googleLogout } from '@react-oauth/google';

import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import { createOrGetUser } from '../utils';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };
  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <div className="relative hidden md:block left-32">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10  flex flex-row justify-center items-center"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="text-white p-3 md:text-md font-medium border-2 border-gray-300 focus:outline-none focus:border-2 focus:border-gray-400 w-[450px]  rounded-lg bg-gray-700  md:top-0"
            placeholder="搜索更多视频~"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 flex flex-row justify-center items-center border-gray-300 pl-4 text-lg h-full text-gray-400"
          >
            <BiSearch />
            搜索
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{' '}
                <span className="hidden md:block">上传 </span>
              </button>
            </Link>
            {user?.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    className="rounded-full cursor-pointer"
                    src="https://lh3.googleusercontent.com/a/AGNmyxbPpijCeiWaQ3j_ZTNQMfy7iVe5dzEnlS2xk3i2=s96-c"
                    alt="user"
                    width={40}
                    height={40}
                    loader={loaderProp}
                  />
                </div>
              </Link>
            )}
            <button
              type="button"
              className=" border-2 p-2 rounded-full cursor-pointer outline-none shadow-md"
              onClick={() => {
                googleLogout();
                removeUser();
              }}
            >
              <AiOutlineLogout color="red" fontSize={21} />
            </button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            // onSuccess={() => {}}
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
