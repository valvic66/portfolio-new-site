import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hamburger } from './Hamburger';
import { MediaIcons } from './MediaIcons';
import { NAVBAR_HEIGHT, MENU_ITEMS } from '../constants/navbar';
import { useScrollLock } from '../hooks/scrollLock';
import { MenuItem } from './MenuItem';
import { main } from '../constants/main';

export const Navbar = () => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isShadowVisible, setShadowVisibility] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > NAVBAR_HEIGHT) {
        setShadowVisibility(true);
      } else {
        setShadowVisibility(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isNavVisible) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isNavVisible]);

  const handleMenuToggle = (event) => {
    event.stopPropagation;
    setNavVisibility(!isNavVisible);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation;
    setNavVisibility(false);
  };

  return (
    <>
      <div
        className={
          isShadowVisible
            ? 'fixed z-10 w-full h-14 flex items-center bg-white'
            : 'fixed z-10 w-full h-14 flex shadow-md items-center bg-white'
        }
      >
        <div className="flex justify-between items-center w-full px-3 2xl:px-16">
          <div
            className={
              !isNavVisible ? 'pl-2 pt-0.5 cursor-pointer' : 'invisible'
            }
          >
            <Link href="/">
              <>
                <Image
                  src="/static/images/logo.png"
                  alt="logo image"
                  width="90"
                  height="20"
                />
              </>
            </Link>
          </div>
          <div className="hidden md:flex">
            {MENU_ITEMS.map((menuItem, key) => (
              <MenuItem
                key={key}
                path={menuItem.path}
                type={menuItem.type}
                label={menuItem.label}
                onClick={handleMenuClose}
                className="px-3 text-sm uppercase list-none"
              />
            ))}
          </div>
          <div className="md:hidden cursor-pointer">
            <Hamburger isNavVisible={isNavVisible} onClick={handleMenuToggle} />
          </div>
        </div>
      </div>

      <div
        className={
          isNavVisible
            ? 'fixed z-10 top-0 left-0 h-screen w-[80%] bg-gray-100 border-r border-gray-300 ease-in duration-200 p-4 overflow-scroll'
            : 'fixed top-0 left-[-100%] ease-in duration-75 p-4'
        }
      >
        <div className="flex justify-between items-center">
          <div className="ml-1 cursor-pointer">
            <Link href="/">
              <>
                <Image
                  src="/static/images/logo.png"
                  alt="logo image"
                  width="90"
                  height="20"
                  onClick={handleMenuClose}
                />
              </>
            </Link>
          </div>
        </div>
        <div className="border-b border-gray-300 my-2">
          <p className="w-[85%] md:w-[90%] py-2 text-sm">
            {"Let's build something amazing together"}
          </p>
        </div>
        <div className="py-4">
          <ul>
            {MENU_ITEMS.map((menuItem, key) => (
              <MenuItem
                key={key}
                path={menuItem.path}
                type={menuItem.type}
                label={menuItem.label}
                className="text-md py-3 hover:text-blue-600 uppercase list-none"
                onClick={handleMenuClose}
              />
            ))}
          </ul>
          <div className="absolute top-[80%] landscape:hidden">
            <p className="pb-3 text-xs uppercase text-gray-500">
              {main.MEDIA_MOTTO}
            </p>
            <div className="w-[200px]">
              <MediaIcons />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
