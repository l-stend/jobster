import React from 'react';
import img from '../assets/images/not-found.svg';
import Wrapper from '../assets/wrappers/ErrorPage';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt='not-found' />
        <h3>Ooops, page not found</h3>
        <p>me sa che te tocca er bono della sora Lella</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
