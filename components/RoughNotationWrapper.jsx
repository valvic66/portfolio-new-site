import React from 'react';
import { RoughNotation } from 'react-rough-notation';

export const RoughNotationWrapper = ({ color, children, type, iterations }) => {
  const textLength = children.props.children.length;
  const duration = Math.floor(50 * textLength);

  return (
    <RoughNotation
      type={type}
      multiline={true}
      iterations={iterations ?? 1}
      animationDuration={duration}
      animationDelay={300}
      color={color}
    >
      {children}
    </RoughNotation>
  );
};
