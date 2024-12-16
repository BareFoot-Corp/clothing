import { ReactNode } from 'react'
import CarouselComponent from "@/components/Carousel";

function Page(): ReactNode {
  const sections = [
    "Section 1",
    "Section 2",
    "Section 3",
    "Section 4",
  ];
  return (
    <section className='absolute -z-1 top-0 left-0 bottom-0 right-0 flex items-center justify-center'>
      <CarouselComponent items={sections}/>
    </section>
  )
}

export default Page