import React from 'react'

 const VideoTitle = ({title,overview}) => {
  return (
    <div className =" w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='py-6 text-lg w-1/4'>{overview}</p>
      <div>
        <button className='px-16 bg-white text-black p-4 text-xl hover:bg-opacity-80 rounded-lg '>▶Play</button>
        <button className=' mx-3 px-16 bg-gray-500 text-white p-4 text-xl hover:bg-opacity-80 rounded-lg ' >ℹMore Info</button>

      </div>
    </div>
  )
}
export default VideoTitle;
