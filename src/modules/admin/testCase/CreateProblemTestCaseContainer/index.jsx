import React, { useReducer, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import TestCaseComponent from 'modules/admin/testCase/TestCaseComponent';
import { reducer } from 'modules/admin/testCase/CreateProblemTestCaseContainer/reducer';
import { createTestCaseRequestAction } from 'redux/admin/testCase/action';

const TestCaseContainer = () => {
  const dispatch = useDispatch();
  const { isTestCaseLoading, reqCount } = useSelector((state) => state.testReducer);
  const { message, isSuccess, problem_id } = useSelector((state) => state.createProblemReducer);
  const initialUserState = {
    input: '',
    output: '',
    marks: 0,
    id: 0,
    testCases: [],
    isTestCaseEdit: false,
  };
  const [userState, setUserState] = useReducer(reducer, initialUserState);

  const handleInputChange = useCallback(
    (event) => {
      const input = event.target.value;
      setUserState({
        type: 'input',
        payload: input,
      });
    },
    [userState.input],
  );

  const handleOutputChange = useCallback(
    (event) => {
      const output = event.target.value;
      setUserState({
        type: 'output',
        payload: output,
      });
    },
    [userState.output],
  );

  const handleMarksChange = useCallback(
    (event) => {
      const marks = event.target.value;
      setUserState({
        type: 'marks',
        payload: marks,
      });
    },
    [userState.marks],
  );

  const handleOnAdd = useCallback(
    (event) => {
      event.preventDefault();
      let { id } = userState;
      id += 1;
      setUserState({
        type: 'id',
        payload: id,
      });
      const { input, output, marks } = userState;
      const data = {
        input,
        output,
        marks,
        problem_id,
        id,
      };
      setUserState({
        type: 'addTestCase',
        payload: data,
      });
    }, [userState.input, userState.marks, userState.output, userState.testCases],
  );

  const handleOnTestCaseEdit = useCallback(
    (tempId) => {
      let testCase = {};
      const { testCases } = userState;
      for (let i = 0; i < testCases.length; i += 1) {
        if (testCases[i].id === tempId) {
          testCase = testCases[i];
          const { input, output, marks, id } = testCase;
          setUserState({
            type: 'editTestCase',
            payload: { input, output, marks, id },
          });
          break;
        }
      }
    }, [userState.input, userState.marks, userState.testCases, userState.id],
  );
  const handleOnTestCaseUpdate = useCallback(
    (tempId) => {
      let testCase = {};
      const { testCases, input, output, marks, id } = userState;
      for (let i = 0; i < testCases.length; i += 1) {
        if (testCases[i].id === id) {
          testCase = testCases[i];
          setUserState({
            type: 'updateTestCase',
            payload: { index: i, input, output, marks },
          });
          break;
        }
      }
    }, [userState.input, userState.output, userState.marks, userState.testCases,
      userState.id],
  );
  const handleOnProblemSuccess = useCallback(
    (event) => {
      const { testCases } = userState;
      const len = testCases.length;
      testCases.forEach((tc) => {
        const { input, output, marks } = tc;
        const data = {
          input,
          output,
          marks,
          problem_id,
        };
        useEffect(() => {
          if (reqCount < len && !isTestCaseLoading) {
            dispatch(createTestCaseRequestAction(data));
          }
        }, [reqCount, isTestCaseLoading]);
      });
    },
  );

  const handleOnTestCaseDelete = useCallback(
    (tempId) => {
      // event.preventDefault();
      const { testCases } = userState;
      for (let i = 0; i < testCases.length; i += 1) {
        if (testCases[i].id === tempId) {
          setUserState({
            type: 'deleteTestCase',
            payload: i,
          });
          break;
        }
      }
    }, [userState.testCases],
  );

  const handleOnCancel = useCallback(
    (event) => {
      event.preventDefault();
      setUserState({
        type: 'setdefault',
      });
    },
    [userState.input, userState.output, userState.marks],
  );

  return (
    <TestCaseComponent
      handleInputChange={handleInputChange}
      handleOutputChange={handleOutputChange}
      handleMarksChange={handleMarksChange}
      handleTestCaseOnAdd={handleOnAdd}
      handleOnTestCaseDelete={handleOnTestCaseDelete}
      handleOnTestCaseEdit={handleOnTestCaseEdit}
      handleOnTestCaseUpdate={handleOnTestCaseUpdate}
      handleOnProblemSuccess={handleOnProblemSuccess}
      handleOnCancel={handleOnCancel}
      message={message}
      input={userState.input}
      output={userState.output}
      marks={userState.marks}
      isProblemSuccess={isSuccess}
      isTestCaseEdit={userState.isTestCaseEdit}
      testCases={userState.testCases}
    />
  );
};

export default React.memo(TestCaseContainer);
