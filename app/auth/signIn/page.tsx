'use client'

import Link from 'next/link';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { Mail } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { grid } from "ldrs"; // Loader Library

import CustomInput from '@/components/CustomInput';
import GridLdrs from '@/components/GridLdrs';

grid.register();

function Page(): ReactNode {
  const router = useRouter();
  const { status } = useSession();

  if(status && status === 'authenticated'){
    router.replace('/');
  }
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const response = await signIn('credentials', { ...formData, redirect: true, callbackUrl: "/" });
      if(!response){
        console.log("User could not be logged in")
      }

      setIsLoading(false)
    }
    catch(error){
      console.warn("Error:", error);
      setIsLoading(false);
    }
  }

  return (
    <div className='w-1/2 md:w-1/3 px-3 py-4 flex flex-col items-center justify-start md:gap-4 gap-1'>
      {
        isLoading && <GridLdrs />
      }
      {/* FORM HEADER */}
      <div className='w-full px-2 md:px-3 py-0 md:py-2 flex flex-col items-start justify-start md:gap-2 gap-1'>
        <h3 className='md:text-4xl text-2xl font-bold'>Sign In</h3>
        <span 
          className='w-full'
        >
          Don&apos;t have an account? &nbsp; <Link href={'/auth/register'} className='italic font-bold tracking-wide'>Register Now</Link>
        </span>
      </div>
      {/* FORM INPUT CONTAINER */}
      <div className='w-full px-2 md:px-3 py-0 md:py-2 flex flex-col items-start justify-start gap-1'>
        <CustomInput name='email' type='email' label='Email' value={formData.email} changeHandler={handleInputChange}/>
        <CustomInput name='password' type='password' label='Password' value={formData.password} changeHandler={handleInputChange}/>
        <Link href={'/'}>Forgot Password?</Link>
      </div>
      {/* BUTTONS CONTAINER */}
      <div className='w-full px-2 md:px-3 py-0 md:py-2 flex flex-col items-center justify-start md:gap-6 gap-3'>
        <div className='w-full py-1 flex items-center justify-center bg-black text-white border-2 border-solid border-white rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out'>
          <button className='w-full flex items-center justify-center gap-2' type='submit' onClick={handleLogin}>
            <span>
              Log In
            </span>
            <Mail/>
          </button>
        </div>
        {/* Middle Text */}
        <div className='w-full flex items-center justify-start'>
          Or sign in with one of the other accounts:
        </div>
        <div className='w-full flex flex-col items-center justify-center gap-2 text-lg'>
          <div className='w-full py-2 border-2 border-solid border-black rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-100'>
            <Image 
              width={0} 
              height={0} 
              src={'/assets/svg/logo/logo-google.svg'} 
              alt='google'
              className='w-6 h-6'
            />
          </div>
          <div className='w-full py-2 border-2 border-solid border-black rounded-md flex items-center justify-center cursor-pointer hover:bg-slate-100'>
            <Image 
              width={0}
              height={0}
              src={'/assets/svg/logo/logo-facebook.svg'}
              alt='facebook'
              className='w-6 h-6'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;