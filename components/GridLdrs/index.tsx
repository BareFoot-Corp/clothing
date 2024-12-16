import { useEffect } from 'react';

export default function Index() {
  useEffect(() => {
    async function getLoader() {
      const { grid } = await import('ldrs');
      grid.register();
    }
    getLoader();
  }, [])
  return (
      <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-slate-200/50'>
          <l-grid color="black" size="80" speed="1"></l-grid>
      </div>
    )
}