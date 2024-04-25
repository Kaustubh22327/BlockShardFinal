import React from 'react'
import blockimage from "./../components/—Pngtree—network bitcoin technology blockchain big_4034259.png";
import Navbar from './Navbar/Navbar';

const Application = () => {
    return (
        
        <div className='mt-[3rem] flex flex-col '>
            <div className='flex flex-col gap-[0.2rem] px-[4rem] '>

                <h3 className='text-bold text-[1.4rem] underline-offset-4'>Our Applications</h3>
                <div className='h-[0.2rem] w-[5rem] bg-[#2874fc]' />
            </div>
            <div className='flex justify-around '>
                <div className='flex flex-col w-[35rem] mt-[1rem] gap-[1rem] px-auto'>
                    <h1 className='text-[#2874fc] madimi-one-regular text-[1.3rem]'>Blockshard</h1>
                    <h1 className='anton-regular text-[2.2rem]'>Secure File Management And Private Communication</h1>
                    <h3 className='yantramanav-regular text-[1.1rem]'>The Blockshard web app is designed for both professional and personal use, ensuring your sensitive documents are stored securely. It streamlines file sharing and offers a unique file request feature, and private chat.</h3>
                    <h4 className='text-[1.1rem] text-gray-500 '>It guarantees not only the safety of your data but also the confidentiality of your communications.</h4>
                    <div className='bg-[#2874fc] hover:bg-[#2876fcf1] w-[12rem] flex justify-center cursor-pointer py-[1rem] text-[0.9rem] text-white font-bold'>Learn More
                        

                    </div>
                </div>
                <div>
                    <img src={blockimage} className='w-[30rem]' alt="" />
                </div>

            </div>
        </div>
    )
}

export default Application