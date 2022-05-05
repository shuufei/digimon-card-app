import { Auth } from 'aws-amplify';
import { Button, Input, Spinner, Text, View } from 'native-base';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as authStore from '../store/auth-store';

export const SignInScreen = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const dispatch = useDispatch();

  const { control, getValues } = useForm<{
    username: string;
    password: string;
  }>();

  return (
    <View>
      <View p="3">
        <Controller
          control={control}
          name="username"
          defaultValue=""
          render={({ field }) => {
            return (
              <>
                <Input
                  type="text"
                  w="100%"
                  placeholder="ユーザ名"
                  fontSize={16}
                  fontWeight="semibold"
                  backgroundColor="white"
                  _focus={{ borderColor: 'gray.500' }}
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
              </>
            );
          }}
        />
        <Controller
          control={control}
          name="password"
          defaultValue=""
          render={({ field }) => {
            return (
              <>
                <Input
                  type="password"
                  w="100%"
                  placeholder="パスワード"
                  fontSize={16}
                  fontWeight="semibold"
                  backgroundColor="white"
                  _focus={{ borderColor: 'gray.500' }}
                  mt="2"
                  value={field.value}
                  onChangeText={(value) => field.onChange(value)}
                />
              </>
            );
          }}
        />
      </View>
      <View px="3" mt="4">
        <Button
          disabled={isLoading}
          onPress={async () => {
            try {
              const username = getValues('username');
              const password = getValues('password');
              setLoading(true);
              const res = await Auth.signIn(username, password);
              dispatch(authStore.actions.signIn());
              console.log('--- sign in res: ', res);
            } catch (error) {
              setErrorMessage(error.message);
            } finally {
              setLoading(false);
            }
          }}
        >
          {isLoading ? (
            <Spinner
              accessibilityLabel="Loading posts"
              color="white"
              opacity="1"
            />
          ) : (
            <Text color="white">SignIn</Text>
          )}
        </Button>
        {errorMessage && (
          <Text mt="2" color="red.500">
            {errorMessage}
          </Text>
        )}

        {/* <Button
          mt="2"
          onPress={async () => {
            Auth.signOut();
            // setSignedIn(false);
            dispatch(authStore.actions.signOut());
            console.log('--- sign out');
          }}
        >
          SignOut
        </Button>
        <Button
          mt="3"
          onPress={async () => {
            const creds = await Auth.currentAuthenticatedUser();
            console.log('--- creds: ', creds, typeof creds);
          }}
        >
          Confirm Current User
        </Button>
        <Button
          mt="3"
          onPress={async () => {
            try {
              const res = await API.get('v1', '/v1/credentials', {});
              console.log('--- qs: ', res);
            } catch (error) {
              console.log('--- error: ', error);
            }
          }}
        >
          Get QueryStrings
        </Button> */}
      </View>
    </View>
  );
};
