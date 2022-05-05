import { FC } from 'react';
import { useEffect } from 'react';
import { Auth } from 'aws-amplify';
import { useDispatch } from 'react-redux';
import * as authStore from '../store/auth-store';

export const SignOutScreen: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.signOut().then(() => {
      dispatch(authStore.actions.signOut());
    });
  }, []);

  return <></>;
};
