import Link from 'next/link';
import React from 'react';

export const MenuItem = ({ path, label, type, onClick, className, active }) => {
  let finalPath;

  switch (type) {
    case 'no_page':
      finalPath = path === '' ? `/` : `/#${path}`;
      break;
    case 'page':
      finalPath = `/${path}`;
      break;
    default:
      break;
  }

  if (!path) {
    return (
      <li onClick={onClick} className={className}>
        {label}
      </li>
    );
  }

  return active ? (
    <Link href={finalPath} scroll={false}>
      <li onClick={onClick} className={className}>
        {label}
      </li>
    </Link>
  ) : null;
};
