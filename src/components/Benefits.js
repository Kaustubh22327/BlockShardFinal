import React from 'react'
const Benefits = () => {
    return (
        <div className='mt-[2rem] flex flex-col'>
            <div className='flex flex-col gap-[0.2rem] px-[4rem] '>

                <h3 className='text-bold text-[1.4rem] underline-offset-4'>Our Benefits</h3>
                <div className='h-[0.2rem] w-[5rem] bg-[#2874fc]' />
            </div>
            <div className='flex mx-auto gap-[4rem]'>
                <div className='flex flex-col shadow-xl px-6 py-6 hover:text-white hover:bg-[#2874fc] ease-in-out duration-300 rounded-xl'>
                    <div className='flex flex-col gap-[0.2rem] items-center'>

                        <img src="/protection.png" className='w-[4rem]' alt="" />
                        <div className='flex items-center'>

                            <h3 className='text-bold text-[1.3rem]'>Privacy</h3>
                        </div>
                    </div>
                    <h3 className='w-[12rem] yantramanav-regular'>Any data stored or shared through SecureShare cannot be accessed by anyone but the sole owner.</h3>
                </div>
                <div className='flex flex-col shadow-xl px-6 py-6 hover:text-white hover:bg-[#2874fc] ease-in-out duration-300 rounded-xl'>
                    <div className='flex flex-col gap-[0.2rem] items-center'>

                        <img src="/currency.png" className='w-[4rem]' alt="" />
                        <div className='flex items-center'>

                            <h3 className='text-bold text-[1.3rem]'>Decentralised</h3>
                        </div>
                    </div>
                    <h3 className='w-[12rem] yantramanav-regular'>SecureShare enables users to transfer and store client-side encrypted data on a decentralized network.</h3>
                </div>
                <div className='flex flex-col shadow-xl px-6 py-6 hover:text-white hover:bg-[#2874fc] ease-in-out duration-300 rounded-xl'>
                    <div className='flex flex-col gap-[0.2rem] items-center'>

                        <img src="/data-encryption.png" className='w-[4rem]' alt="" />
                        <div className='flex items-center'>

                            <h3 className='text-bold text-[1.3rem]'>Encryption</h3>
                        </div>
                    </div>
                    <h3 className='w-[12rem] yantramanav-regular'>Protect your sensitive data within the cloud using combinations of various encryption methods.</h3>
                </div>
                <div className='flex flex-col shadow-xl px-6 py-6 hover:text-white hover:bg-[#2874fc] ease-in-out duration-300 rounded-xl'>
                    <div className='flex flex-col gap-[0.2rem] items-center'>

                        <img src="/speed.png" className='w-[4rem]' alt="" />
                        <div className='flex items-center'>

                            <h3 className='text-bold text-[1.3rem]'>Latency</h3>
                        </div>
                    </div>
                    <h3 className='w-[12rem] yantramanav-regular'>Our hybrid blockchain platform has access latency figures parallel to conventional cloud storage solutions.</h3>
                </div>
                
            </div>
        </div>
    )
}

export default Benefits