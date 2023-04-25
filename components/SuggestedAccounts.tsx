import React, { useEffect } from 'react';
import Image from 'next/image';
import { NextPage } from 'next';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { IUser } from '../types';

interface IProps {
  fetchAllUsers: () => void;
  allUsers: IUser[];
}

const SuggestedAccounts: NextPage<IProps> = ({ fetchAllUsers, allUsers }) => {
  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const users = allUsers
    .sort(() => 0.5 - Math.random())
    .slice(0, allUsers.length);
  const loaderProp = ({ src }: { src: string }) => {
    return src;
  };
  return (
    <div className=" border-gray-200 pb-4">
      <p className="text-white font-bold m-3 mt-4  flex items-center gap-1">
        <AiOutlineUserAdd className="text-xl" />
        推荐
      </p>
      <div>
        {users?.slice(0, 6).map((user: IUser) => (
          <Link href={`/profile/${user._id}`} key={user._id}>
            <div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded-md">
              <div className="w-8 h-8">
                <Image
                  width={34}
                  height={34}
                  className="rounded-full"
                  src={user?.image}
                  alt="user-profile"
                  layout="responsive"
                  loader={loaderProp}
                />
              </div>

              <div className="block">
                <p className="flex gap-1 items-center text-md font-bold text-white lowercase">
                  {user.userName.replace(/\s+/g, '')}{' '}
                  <GoVerified className="text-blue-400" />
                </p>
                <p className="capitalize text-gray-400 text-xs">
                  {user.userName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SuggestedAccounts;
