import { CharacterCardProps } from '@/types/types'
import React from 'react'

const CharacterCard = ({ name, status, species, gender }: CharacterCardProps) => {
  return (
    <div className='bg-white text-black flex flex-col py-3 px-2 rounded-md items-center pointer-events-none'>
        <h2 className='text-xl font-bold'>{name}</h2>
        <div className='flex gap-3'>
            <p>{status}</p>
            <p>{species}</p>
            <p>{gender}</p>
        </div>
    </div>
  )
}

export default CharacterCard;