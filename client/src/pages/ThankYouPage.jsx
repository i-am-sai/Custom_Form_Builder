import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
export const ThankYouPage = () => {
    const navigate = useNavigate()
    return (
        <div className="mt-10 border-2 flex items-center justify-center w-[450px] p-4 rounded-md m-auto bg-green-100">
            <div className="text-center">

                <h1 className=" text-3xl font-bold mb-4">Thank you for choosing us !</h1>

                <div>
                    <Player//"C:\Users\swaro\Downloads\animation_lkxle4em.json"
                        src='https://lottie.host/652259fb-862e-4994-99cf-ce896095d26b/XyfnUKsKlo.json'
                        className="player"
                        loop
                        autoplay
                        style={{ height: '300px', width: '300px' }}
                    />
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold mt-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Close
                </button>
            </div>

        </div>



    );
};

