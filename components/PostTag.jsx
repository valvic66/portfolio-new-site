import React from 'react';
import { Chip } from '@mui/material';

export const PostTag = ({ tags }) => {
  return (
    <section className="flex">
      {tags?.map((tag, key) => (
        <Chip
          key={key}
          style={{ marginRight: 10 }}
          color={'default'}
          variant="outlined"
          label={`#${tag}`}
          onClick={() => {}}
        />
      ))}
    </section>
  );
};
