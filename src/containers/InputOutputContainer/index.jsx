import React, { useState, useReducer, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';

import CustomIOComponent from 'components/IdeComponent/CustomIOComponent';
import { customInputOutputPostApi, customInputOutputSendTokenApi } from 'apis/customIOAPI';
import { reducer } from 'containers/InputOutputContainer/reducer';

const initialState = {
  outputValue: '',
  inputValue: '',
};

const CustomIOContainer = () => {
  const { authToken } = useSelector((state) => state.candidateFormReducer);
  const broadcastingRoom = `room_${authToken}`;

  const [latestToken, setLatestToken] = useState('test_token');
  const [inputOutuptValue, setInputOutputValue] = useReducer(
    reducer,
    initialState,
  );
  const [loading, setLoading] = useState(false);
  const [showOutput, setshowOutput] = useState(true);

  const globalState = useSelector((state) => state.languageReducer);
  const {
    languageSelected,
    code,
  } = globalState;

  const handleRunClick = async () => {
    setLoading(true);
    setInputOutputValue({ type: 'output', payload: { output: '' } });

    const data = {
      language_id: languageSelected.id,
      language_name: languageSelected.name,
      source_code: code,
      stdin: inputOutuptValue.inputValue,
      room: broadcastingRoom,
    };

    const checkStatus = (token) => {
      // in future we will remove it
      let outputValue = '';
      setTimeout(() => {
        customInputOutputSendTokenApi(token)
          .then((output) => {
            if (output.data.data.status.description === 'Processing') {
              checkStatus(token);
            } else {
              if (output.data.data.stderr) {
                outputValue = output.data.data.stderr;
              } else if (!output.data.data.stdout) {
                outputValue = output.data.data.compile_output;
              } else {
                outputValue = output.data.data.stdout;
              }
              setLoading(false);
              setInputOutputValue({
                type: 'output',
                payload: { output: outputValue },
              });
            }
          })
          .catch((error) => {
            setInputOutputValue({
              type: 'output',
              payload: { output: 'Compiler error' },
            });
            // something went wrong! error
            setLoading(false);
          });
      }, 2000);
    };

    customInputOutputPostApi(data)
      .then((response) => {
        const { token } = response.data.data;
        setLatestToken(token);
        // checkStatus(token);
      })
      .catch((error) => {
        setLoading(false);
        setInputOutputValue({
          type: 'output',
          payload: { output: error.message },
        });
      });
  };

  const handleInputChange = useCallback(
    (event) => {
      setInputOutputValue({
        type: 'input',
        payload: { input: event.target.value },
      });
    },
    [inputOutuptValue.inputValue],
  );

  const handleEvent = (event) => {
    event.preventDefault();
  };

  const toggle = useCallback(() => setshowOutput(!showOutput), [showOutput]);

  const handleOnInputClick = () => {
    toggle();
    handleRunClick();
  };

  const handleReceived = (data) => {
    if (data.token === latestToken) {
      let outputValue = '';

      if (data.stderr) {
        outputValue = data.stderr;
      } else if (!data.stdout) {
        outputValue = data.compile_output;
      } else {
        outputValue = data.stdout;
      }

      setLoading(false);

      setInputOutputValue({
        type: 'output',
        payload: { output: outputValue },
      });
    }
  };

  return (
    <>
      <ActionCableConsumer
        channel={{ channel: 'TestChannel', room: broadcastingRoom }}
        onReceived={handleReceived}
      />
      <CustomIOComponent
        toggle={toggle}
        handleRunClick={handleRunClick}
        handleInputChange={handleInputChange}
        handleEvent={handleEvent}
        handleOnInputClick={handleOnInputClick}
        showOutput={showOutput}
        inputValue={inputOutuptValue.inputValue}
        outputValue={inputOutuptValue.outputValue}
        loading={loading}
      />
    </>
  );
};

export default React.memo(CustomIOContainer);
