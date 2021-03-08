import React from 'react';
import PropTypes from 'prop-types';

import { Col, Navbar, NavbarBrand, Button } from 'core-components';

import './HeaderIDE.css';

const HeaderIDE = (props) => {
  const {
    organisationName,
    currentProblem,
    totalProblems,
    time,
    ifSufficient,
  } = props;

  return (
    <Navbar
      className='bg-dark justify-content-around myClass'
      md={12}
      xl={12}
      lg={12}
    >
      <NavbarBrand className='mx-5 text-white font-weight-bold'>
        <h3 className='font-weight-bold'>{organisationName}</h3>
      </NavbarBrand>
      <Col className='mx-5 d-flex justify-content-end mr-5'>
        <h3 className='text-success align-middle mr-5 font-weight-bold'>
          OnCOT
        </h3>
      </Col>
      <Col className='mx-5 justify-content-end d-flex'>
        <div className='mx-5 justify-content-end d-flex'>
          <Button className='px-2 btn-circle'>{'<'}</Button>
          <h5 className='text-white align-middle mx-3'>
            Problem {currentProblem}/{totalProblems}
          </h5>
          <Button className='px-2 btn-circle'>{'>'}</Button>
        </div>
        <h2
          className={
            ifSufficient
              ? 'text-white align-middle font-weight-bold'
              : 'text-danger align-middle font-weight-bold'
          }
          id='timeLeft'
        >
          {time}
        </h2>
      </Col>
    </Navbar>
  );
};

HeaderIDE.propTypes = {
  organisationName: PropTypes.string.isRequired,
  currentProblem: PropTypes.number.isRequired,
  totalProblems: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  ifSufficient: PropTypes.bool.isRequired,
};

export default React.memo(HeaderIDE);
