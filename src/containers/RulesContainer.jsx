import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RulesComponent from 'components/RulesComponent';
import { rulesRequest } from '../actions/rulesAction';

const RulesContainer = () => {
  const dispatch = useDispatch();
  const result = useSelector((state) => state.RulesReducer);

  let data = result.userlist.str;

  const { requestError } = result;
  useEffect(() => {
    dispatch(rulesRequest());
  }, [dispatch]);

  if (requestError) {
    data = requestError;
  }

  return <RulesComponent data={data} />;
};

export default RulesContainer;
