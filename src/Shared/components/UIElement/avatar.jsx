import React from 'react';

import '../../../styles/shared/UIElement/avatar.css';

const Avatar = (props) => {
  const { image, alt, className, style } = props;

  return (
    <div className={`avatar ${className}`} style={style}>
      <img src={image} alt={alt} />
    </div>
  );
};

export default Avatar;
