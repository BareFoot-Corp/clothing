'use client'

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page(){
    const { userId } = useParams();
    const [ userData, setUserData ] = useState<{
        fullname: string;
        username: string;
        id: string;
        email: string;
    } | null>(null);
    const [ timer, setTimer ] = useState(5);
    const router = useRouter();
    
    fetch(`/api/user?userId=${userId}`)
        .then(res => res.json())
        .then(res => setUserData(res))
        .catch(err => console.log(err));

    useEffect(() => {
        if(timer === 0){
            router.push('/auth/signIn');
            return;
        }

        setInterval(() => {
            setTimer(timer - 1);
        }, 1000);
    }, [router, timer])

    return(
        <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
            <span>Welcome { userData ? userData.username : '____'}</span>
            <span>Redirecting In ... { timer }</span>
        </div>
    )
}