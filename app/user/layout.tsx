import { ReactNode } from 'react'
interface iUserProps {
  children?: ReactNode;
}

function Layout({ children }: iUserProps): ReactNode {
  return (
    <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center text-black'>
        { children }
    </div>
  )
}

export default Layout;