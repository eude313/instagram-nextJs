import React from 'react'
import {ScrollShadow} from "@nextui-org/react";

export default function ReelsLayout({ children }) {
  return (
    <ScrollShadow hideScrollBar className='w-full h-screen'>
        {children}
    </ScrollShadow> 
  )
}
