import React from "react";
import Typed from "react-typed";
import { Player } from '@lottiefiles/react-lottie-player';

export const Home = () => {
    return (
        <div className='bg-blue-500 w-full min-h-screen pt-[50px]'>
            <Player
                src='https://lottie.host/c2220e3c-f4d5-44b1-aabf-586997503c50/ciSTnIwdvU.json'
                className="player "
                loop
                autoplay
                style={{ height: '300px', width: '300px' }}
            />
            <div className='max-w-[1240px] my-[20px] font-bold mx-auto text-center'>
                <div className='text-xl md:text-3xl mb-4'>
                    Create with us
                </div>
                <h2 className='text-white text-[30px] md:text-[60px]'>
                    Build with us
                </h2>
                <div className='text-[20px] md:text-[40px] text-white'>
                    Let's Revolutionize
                    <Typed
                        className='pl-2'
                        strings={['Form Customization', 'Form Building', 'Form Sharing']}
                        typeSpeed={100}
                        loop={true}
                        backSpeed={50}
                    />
                </div>
            </div>
        </div>
    )
};
