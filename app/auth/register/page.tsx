'use client'

import Link from 'next/link';
import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import CustomInput from '@/components/CustomInput';

function Page(): ReactNode {
  const router = useRouter();
  const { status } = useSession();

  if(status === 'authenticated'){
    router.replace('/');
  }

  const [ formData, setFormData ] = useState({
    fullname: '',
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    password: ""
  });

  const resetFormData = () => {
    setFormData({
      username: '',
      fullname: '',
      password: '',
      email: ''
    });
  }

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Explanation of regex:
    // (?=.*[a-z])   - At least one lowercase letter
    // (?=.*[A-Z])   - At least one uppercase letter
    // (?=.*\d)      - At least one digit
    // (?=.*[@$!%*?&]) - At least one special character
    // {8,}          - Minimum 8 characters

    return regex.test(password);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e?.target;

    if(name === 'password'){
      if(value){
        if(validatePassword(value)){ 
          setErrors({...errors, password: ""});
        }
        else{
          setErrors({...errors, password: "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."})
        }
      }
      else{
        setErrors({...errors, password: ""});
      }
    }
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const registerUser = () => {
    if(validatePassword(formData.password)){
      setErrors({...errors, password: ""})
      fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({...formData})
      }).then((response) => {
          if(!response.ok){
            throw new Error("Network response was not ok");
          }

        return response.json();
      }).then(() => {
          resetFormData();

          router.push('/auth/signIn');
      }).catch(err => {
        console.log("Failed", err);
      })
    }

    setErrors({
      ...errors,
      password: "Password must include at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character."
    })
  }

  useEffect(()=>{
  })

  return (
    <div className='md:w-1/3 w-1/2 px-3 py-4 flex flex-col items-center justify-start md:gap-4 gap-1'>
      <div className='w-full px-3 py-2 flex flex-col items-start justify-start md:gap-2 gap-1'>
        {/* FORM HEADING */}
        <h3 className='md:text-4xl text-2xl font-bold'>Register</h3>
        <span 
          className='w-full'
        >
          Already have an account? &nbsp; <Link href={'/auth/signIn'} className='italic font-bold tracking-wide'>Sign In</Link>
        </span>
      </div>
      {/* FORM INPUT CONTAINER */}
      <div className='w-full md:px-3 md:py-2 px-2 py-1 flex flex-col items-start justify-start gap-1'>
        <CustomInput name='fullname' type='text' label='Full Name' value={formData.fullname} changeHandler={handleInputChange} required={true}/>
        <CustomInput name='username' type='text' label='User Name' value={formData.username} changeHandler={handleInputChange} required={true}/>
        <CustomInput name='email' type='email' label='Email' value={formData.email} changeHandler={handleInputChange} required={true}/>
        <CustomInput name='password' type='password' label='Password' value={formData.password} changeHandler={handleInputChange} required={true} error={errors.password}/>
      </div>
      {/* BUTTONS CONTAINER */}
      <div className='w-full md:px-3 md:py-2 px-2 py-1 flex flex-col items-center justify-start gap-6'>
        <div className='w-full flex items-center justify-center bg-black text-white border-2 border-solid border-white rounded-md cursor-pointer hover:bg-white hover:text-black hover:border-black transition-all duration-300 ease-in-out'>
            <div 
                className='w-full h-full py-1 flex items-center justify-center gap-2'
                onClick={registerUser}
            >
            <span>
              Register
            </span>
            <Mail/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page;