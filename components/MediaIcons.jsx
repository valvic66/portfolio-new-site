import Link from 'next/link';
import React from 'react';
import { FaGithub, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import { MediaIcon } from './MediaIcon';

export const MediaIcons = () => {
  const renderLink = (href, children) => {
    return (
      <Link href={href} passHref={true}>
        <a target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      </Link>
    );
  };

  return (
    <div className="flex items-center justify-between w-full">
      <MediaIcon>
        {renderLink(
          'https://www.linkedin.com/in/valentin-micu-973902148',
          <FaLinkedinIn />
        )}
      </MediaIcon>
      <MediaIcon>
        {renderLink('https://github.com/valvic66', <FaGithub />)}
      </MediaIcon>
      <MediaIcon>
        {renderLink('mailto: valvic6@gmail.com', <FaGoogle />)}
      </MediaIcon>
    </div>
  );
};
