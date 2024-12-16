/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { ReactNode, useContext, useEffect } from 'react';
import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { BookUser, CirclePower, CircleUser, CreditCard, Eye, ScrollText } from 'lucide-react';
import { UserPageSettingsContext } from '@/providers/UserSettings/UserSettings.Context';
import { signOut } from 'next-auth/react';

interface iUserPageProps {
  children?: ReactNode
}

function Layout({ children }: iUserPageProps ): ReactNode {
  const { userID } = useParams();
  const pathname = usePathname();
  const { pageSettings, setPageSettings } = useContext(UserPageSettingsContext);

  useEffect(()=>{
    switch(pathname){
      case `/user/${userID}/account`:
        setPageSettings({currentMenu: "account"});
        break;
      case `/user/${userID}/orders`:
        setPageSettings({currentMenu: "orders"});
        break;
      case `/user/${userID}/payments`:
        setPageSettings({currentMenu: "payments"});
        break;
      case `/user/${userID}/addresses`:
        setPageSettings({currentMenu: "addresses"});
        break;
      default:
        setPageSettings({currentMenu: "overview"});
        break;
    }
  }, [pathname, userID])

  return (
    <div className='w-[95%] h-[98%] flex items-center justify-start shadow-lg rounded-3xl'>
      {/* Left Section */}
        <div className='md:w-full md:max-w-40 w-16 md:h-[95%] h-[50%] py-3 border-r-[1px] border-solid border-slate-300 flex flex-col items-center justify-center'>
          <div className='px-2 py-4 flex flex-col items-center justify-between gap-4'>
            <Link 
              className={`md:w-full p-2 rounded-xl flex items-center justify-start gap-4 border-solid border-2 hover:border-black  ${pageSettings.currentMenu === 'overview' ? "bg-black text-white border-black" : "bg-white text-black border-white"}`}
              href={`/user/${userID}/`}
            >
              <Eye/>
              <p className='md:inline-block hidden'>Overview</p>
            </Link>
            <Link 
              className={`md:w-full p-2 rounded-xl flex items-center justify-start gap-4 border-solid border-2 hover:border-black  ${pageSettings.currentMenu === 'account' ? "bg-black text-white border-black" : "bg-white text-black border-white"}`}
              href={`/user/${userID}/account`}
            >
              <CircleUser/>
              <p className='md:inline-block hidden'>Account</p>
            </Link>
            <Link 
              className={`md:w-full p-2 rounded-xl flex items-center justify-start gap-4 border-solid border-2 hover:border-black  ${pageSettings.currentMenu === 'orders' ? "bg-black text-white border-black" : "bg-white text-black border-white"}`}
              href={`/user/${userID}/orders`}
            >
              <ScrollText/>
              <p className='md:inline-block hidden'>Orders</p>
            </Link>
            <Link 
              className={`md:w-full p-2 rounded-xl flex items-center justify-start gap-4 border-solid border-2 hover:border-black  ${pageSettings.currentMenu === 'payments' ? "bg-black text-white border-black" : "bg-white text-black border-white"}`}
              href={`/user/${userID}/payments`}
            >
              <CreditCard/>
              <p className='md:inline-block hidden'>Payments</p>
            </Link>
            <Link 
              className={`md:w-full p-2 rounded-xl flex items-center justify-start gap-4 border-solid border-2 hover:border-black  ${pageSettings.currentMenu === 'addresses' ? "bg-black text-white border-black" : "bg-white text-black border-white"}`}
              href={`/user/${userID}/addresses`}
            >
              <BookUser/>
              <p className='md:inline-block hidden'>Addresses</p>
            </Link>
          </div>

          <div 
            className='w-3/4 py-3 mt-auto rounded-xl border-4 border-solid border-white flex items-center justify-center gap-2 cursor-pointer text-red-600 hover:bg-red-600 hover:text-white hover:border-red-600 active:border-red-600 active:text-red-600 active:bg-transparent'
            onClick={() => signOut()}
          >
            <CirclePower />
            <span className='font-bold'>LOGOUT</span>
          </div>
        </div>
      {/* Right Section */}
      <div className='w-full h-[98%] flex flex-col items-center justify-center'>
        { children }
      </div>
    </div>
  )
}

export default Layout;