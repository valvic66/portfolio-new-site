import React, { useEffect, useState } from 'react';
// import Image from 'next/image';
import { Hamburger } from './Hamburger';
import { MediaIcons } from './MediaIcons';
import {
  NAVBAR_HEIGHT,
  MENU_ITEMS,
  AUTH_MENU_ITEMS,
} from '../constants/navbar';
import { MenuItem } from './MenuItem';
import { main } from '../constants/main';
import { IS_AUTH_ENABLED } from '../constants/env';
import Router from 'next/router';
import { useLocalStorage, useLockBodyScroll } from 'react-use';
import useAuth from '../store/auth';
import { APP_ROUTES } from '../constants/routes';

export const Navbar = ({ authenticated }) => {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isShadowVisible, setShadowVisibility] = useState(false);
  const clearToken = useAuth((state) => state.clearToken);
  const clearUser = useAuth((state) => state.clearUser);
  const [token, setToken, removeToken] = useLocalStorage('token', '');
  const [user, setUser, removeUser] = useLocalStorage('user', {});

  useLockBodyScroll(isNavVisible);

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

  const handleMenuToggle = (event) => {
    event.stopPropagation;
    setNavVisibility(!isNavVisible);
  };

  const handleMenuClose = (event) => {
    event.stopPropagation;
    setNavVisibility(false);

    const menuText = event?.target?.outerText;
    switch (menuText) {
      case 'SIGNOUT':
        removeToken();
        removeUser();
        clearToken();
        clearUser();
        Router.push(APP_ROUTES.SIGN_IN);
        break;
      case 'HOME':
        Router.push(APP_ROUTES.HOME);
        break;
      default:
        break;
    }
  };

  // to be moved in a reusable component that maps all the menu items
  const dynamicAuthItems =
    authenticated &&
    AUTH_MENU_ITEMS.filter(
      (authItem) => !['Signin', 'Signup'].includes(authItem.label)
    );

  return (
    <>
      <div
        className={
          isShadowVisible
            ? 'fixed z-10 w-full flex bg-white h-14 px-4'
            : 'fixed z-10 w-full flex shadow-md bg-white h-14 px-4'
        }
      >
        <div className="flex justify-between items-center w-full 2xl:px-16">
          <div
            className={
              !isNavVisible ? 'cursor-pointer' : 'invisible'
            }
          >
            <img
              src="/static/images/logo.png"
              alt="logo image"
              width="50"
              onClick={() => Router.push('/')}
            />
          </div>
          <div className="hidden md:flex">
            {MENU_ITEMS.map((menuItem, key) => (
              <MenuItem
                key={key}
                active={menuItem.active}
                path={menuItem.path}
                type={menuItem.type}
                label={menuItem.label}
                onClick={handleMenuClose}
                className="text-sm uppercase list-none px-2"
              />
            ))}
            {IS_AUTH_ENABLED && (
              <>
                {dynamicAuthItems.map((menuItem, key) => (
                  <MenuItem
                    key={key}
                    active={menuItem.active}
                    path={menuItem.path}
                    type={menuItem.type}
                    label={menuItem.label}
                    onClick={handleMenuClose}
                    className="text-sm uppercase list-none"
                  />
                ))}
              </>
            )}
          </div>
          <div className="md:hidden cursor-pointer">
            <Hamburger isNavVisible={isNavVisible} onClick={handleMenuToggle} />
          </div>
        </div>
      </div>

      <div
        className={
          isNavVisible
            ? 'fixed z-10 top-0 left-0 h-screen w-[80%] bg-gray-100 border-r border-gray-300 ease-in duration-200 overflow-scroll px-4'
            : 'fixed top-0 left-[-100%] ease-in duration-75 px-4'
        }
      >
        <div className="flex justify-between items-center h-14">
          <div className="cursor-pointer">
            <img
              src="/static/images/logo.png"
              alt="logo image"
              width="50"
              onClick={handleMenuClose}
            />
          </div>
        </div>
        <div className="border-b border-gray-300 my-2">
          <p className="w-[85%] md:w-[90%] text-sm">
            {"Let's build something amazing together"}
          </p>
        </div>
        <div className="py-4">
          <ul>
            {MENU_ITEMS?.map((menuItem, key) => (
              <MenuItem
                key={key}
                active={menuItem.active}
                path={menuItem.path}
                type={menuItem.type}
                label={menuItem.label}
                className="text-md py-3 hover:text-blue-600 uppercase list-none"
                onClick={handleMenuClose}
              />
            ))}
            {IS_AUTH_ENABLED && (
              <>
                {dynamicAuthItems.map((menuItem, key) => (
                  <MenuItem
                    key={key}
                    active={menuItem.active}
                    path={menuItem.path}
                    type={menuItem.type}
                    label={menuItem.label}
                    onClick={handleMenuClose}
                    className="text-md py-3 hover:text-blue-600 uppercase list-none"
                  />
                ))}
              </>
            )}
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
