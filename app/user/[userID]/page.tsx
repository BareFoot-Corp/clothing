import React from 'react';

import { auth } from '@/lib/auth';
import { getUserById } from '@/lib/db';

import { tUser } from '@/lib/type';

async function Page() {

  const session = await auth();

  if(!session){
    return <div> No Data </div>
  }
  const user: tUser | null = await getUserById(session.user?.id);

  return (
    <div className='w-[90%] h-1/2 px-4 py-3 border-[1px] border-solid border-slate-300 rounded-2xl flex flex-col items-center justify-center '>
      <table className='w-10/12 h-11/12 flex items-center justify-start'>
        <tbody className='w-11/12 h-full flex flex-col items-center justify-start'>
          <tr className='w-full py-2 my-1 flex items-center justify-between border-b border-b-solid border-b-black/25'>
            <td className='text-xl'>USERNAME</td>
            <td className='text-xl'>{ user?.username }</td>
          </tr>
          <tr className='w-full py-2 my-1 flex items-center justify-between border-b border-b-solid border-b-black/25'>
            <td className='text-xl'>FULL NAME</td>
            <td className='text-xl'>{ user?.fullname ? user.fullname : "?" }</td>
          </tr>
          <tr className='w-full py-2 my-1 flex items-center justify-between border-b border-b-solid border-b-black/25'>
            <td className='text-xl'>EMAIL</td>
            <td className='text-xl'>{ user?.email }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Page;