import { CardProps } from '@/types/types'
import React, { ReactNode } from 'react'

const Card: React.FC<CardProps> = ({ children, classname, title }) => {
  return (
    <div className={`${classname} bg-white text-black flex flex-col py-3 px-2 rounded-md items-center pointer-events-none relative`}>
        <h2>{title}</h2>
        {children}
    </div>
  )
}

export default Card;