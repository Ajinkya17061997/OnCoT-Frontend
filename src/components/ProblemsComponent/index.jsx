import React from 'react';
import PropTypes from 'prop-types';

import { Container } from 'core-components';

import './problemStyle.css';

const ProblemComponent = ({ isError, errorMessage, title, description }) => {
  if (isError) {
    return (
      <Container fluid className='problemBody'>
        <h4 className='text-center text-white font-weight-bold mb-3'>
          Problem Statement
        </h4>
        <div className='py-2'>
          <h6 className='text-white scrollable font-weight-light'>
            {errorMessage}
          </h6>
        </div>
      </Container>
    );
  }
  return (
    <Container fluid className='problemBody'>
      <h4 className='text-center text-white font-weight-bold mb-3'>
        Problem Statement - {title}
      </h4>
      <div className='py-2'>
        <h6 className='text-white scrollable font-weight-light'>
          {description}
        </h6>
      </div>
    </Container>
  );
};

ProblemComponent.propTypes = {
  isError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default React.memo(ProblemComponent);