import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Menu, Transition } from "@headlessui/react";
import { MdOutlineCreate } from "react-icons/md"; // Import the icon you want to use
import { MdOutlinePreview } from "react-icons/md"; // Import the icon you want to use
import { MdHome } from "react-icons/md"; // Import the icon you want to use

export const Navbar = ({ onOptionSelect }) => {
    const [toggle, setToggle] = useState(false);

    // Function to handle form configuration updates
    const handleOptionClick = (option) => {
        setToggle(false);
        onOptionSelect(option === 'forms' ? 'Forms' : null);
    };

    return (
        <div className='bg-blue-500 p-4'>
            <div className='max-w-[1240px] py-[10px] items-center flex justify-between border-black mx-auto'>
                <div className='text-3xl font-bold '>
                    FormEasy
                </div>
                {
                    toggle ?
                        <AiOutlineClose onClick={() => setToggle(!toggle)} className='text-white text-2xl md:hidden block' />
                        :
                        <AiOutlineMenu onClick={() => setToggle(!toggle)} className='text-white text-2xl md:hidden block' />
                }

                <ul className='hidden md:flex text-white k gap-5'>
                    <li className='p-3 cursor-pointer  hover:bg-gray-800 ' onClick={() => handleOptionClick('contacts')}>
                        <NavLink to="/">
                            <MdHome className="inline-block mr-2 text-white  group-hover:text-black text-xl" /> {MdHome}
                            Home
                        </NavLink>
                    </li>
                    <li className='p-3 cursor-pointer hover:bg-gray-800' onClick={() => handleOptionClick('forms')}>
                        <NavLink to="/forms" >
                            <MdOutlineCreate className="inline-block mr-2 text-white text-xl" /> {MdOutlineCreate}
                            Create
                        </NavLink>
                    </li>
                    <li className='p-3 cursor-pointer hover:bg-gray-800' onClick={() => handleOptionClick('settings')}>
                        <NavLink to="/preview" >
                            <MdOutlinePreview className="inline-block mr-2 text-white text-xl" /> {MdOutlinePreview}
                            Preview
                        </NavLink>
                    </li>


                    {/* Profile dropdown */}
                    <Menu as="li" className="relative ml-3">
                        <div>
                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1691020239~exp=1691020839~hmac=17de29170203e5dbf1500f070e2e00e946e35fa841132cc56c1a88e5f616b6fd"
                                    alt=""
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Your Profile
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Settings
                                        </a>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <a
                                            href="#"
                                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Sign out
                                        </a>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>

                </ul>

                {/* Responsive menu */}
                <ul className={`duration-300 md:hidden w-full h-screen text-white fixed bg-black top-[87px] 
            ${toggle ? 'left-[0]' : 'left-[-100%]'}
          `}>
                    <li className='p-3 cursor-pointer hover:bg-gray-800' onClick={() => handleOptionClick('forms')}>
                        <NavLink to="/" >
                            Home
                        </NavLink>
                    </li>
                    <li className='p-3 cursor-pointer hover:bg-gray-800' onClick={() => handleOptionClick('settings')}>
                        <NavLink to="/forms" >
                            Create
                        </NavLink>
                    </li>
                    <li className='p-3 cursor-pointer hover:bg-gray-800' onClick={() => handleOptionClick('contacts')}>
                        <NavLink to="/preview">
                            Preview
                        </NavLink>
                    </li>

                    {/* Profile dropdown */}
                    <Menu as="li" className="relative ml-3">
                        <div>
                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1691020239~exp=1691020839~hmac=17de29170203e5dbf1500f070e2e00e946e35fa841132cc56c1a88e5f616b6fd"
                                    alt=""
                                />
                            </Menu.Button>
                        </div>
                        <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => console.log('Your Profile clicked')}
                                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Your Profile
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => console.log('Settings clicked')}
                                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Settings
                                        </button>
                                    )}
                                </Menu.Item>
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={() => console.log('Sign out clicked')}
                                            className={`block px-4 py-2 text-sm text-gray-700 ${active ? 'bg-gray-100' : ''}`}
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>


                </ul>

            </div>
        </div>
    );
};
