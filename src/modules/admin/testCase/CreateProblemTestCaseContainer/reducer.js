import produce from 'immer';

const setterForCrud = (payload, state) => {
  if (payload.subType === 'input') {
    state.input  = payload.data;
  } else if (payload.subType === 'output') {
    state.output  = payload.data;
  } else if (payload.subType === 'marks') {
    state.marks  = payload.data;
  } else if (payload.subType === 'id') {
    state.id  = payload.data;
  }
};

const setErrTxt = (payload, state) => {
  if (payload.subType === 'inputErr') {
    state.inputErrTxt  = payload.data;
  } else if (payload.subType === 'outputErr') {
    state.outputErrTxt  = payload.data;
  } else if (payload.subType === 'marksErr') {
    state.marksErrTxt  = payload.data;
  }
};

export const reducer = produce((state, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case 'set input/output/mark/id':
      setterForCrud(payload, state);
      break;
    case 'setErrTxt':
      setErrTxt(payload, state);
      break;
    case 'addTestCase':
      state.testCases.push(payload);
      state.input = '';
      state.output = '';
      state.marks = 0;
      state.inputErrTxt = '';
      state.outputErrTxt = '';
      state.marksErrTxt = '';
      break;
    case 'editTestCase':
      state.input = payload.input;
      state.output = payload.output;
      state.marks = payload.marks;
      state.id = payload.id;
      state.isTestCaseEdit = true;
      break;
    case 'updateTestCase':
      state.testCases[payload.index].input = payload.input;
      state.testCases[payload.index].output = payload.output;
      state.testCases[payload.index].marks = payload.marks;
      state.input = '';
      state.output = '';
      state.marks = 0;
      state.inputErrTxt = '';
      state.outputErrTxt = '';
      state.marksErrTxt = '';
      state.isTestCaseEdit = false;
      break;
    case 'deleteTestCase':
      state.testCases.splice(payload, 1);
      break;
    default:
      state.input = '';
      state.output = '';
      state.marks = 0;
      break;
  }
});