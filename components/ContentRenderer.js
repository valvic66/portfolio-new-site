import React from 'react';

export const ContentRenderer = ({ contentHtml }) => {
  return (
    <div
      className="content-renderer"
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
};
