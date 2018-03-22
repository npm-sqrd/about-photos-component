import React from 'react';
import './styles.css';

const Banner = ({ banner }) => {
  return (
    <div>
      <img className="bannerImg" src={banner[0]} />
      <img className="bannerImg" src={banner[1]} />
      <img className="bannerImg" src={banner[2]} />
      <img className="bannerImg" src={banner[3]} />
    </div>
  );
};

export default Banner;
