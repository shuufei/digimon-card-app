import { useDispatch } from 'react-redux';
import { API } from 'aws-amplify';
import * as authStore from '../store/auth-store';
import { useEffect } from 'react';

export const useDispatchSetSigendQueryStrings = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const setSignedQueryStrings = async () => {
      const res: { credentials: string } = await API.get(
        'v1',
        '/v1/credentials',
        {}
      );
      console.log('--- signed query strings: ', res.credentials);
      dispatch(
        authStore.actions.setSignedQueryString({
          signedQueryStrings: res.credentials,
        })
      );
    };
    setSignedQueryStrings();
  }, [dispatch]);
};
