import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Auth } from 'aws-amplify';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardListFilterModalScreen } from '../screen/card-list-filter-modal-screen';
import { CardModalScreen } from '../screen/card-modal-screen';
import { DeckScreen } from '../screen/deck-screen';
import { SignInScreen } from '../screen/sign-in-screen';
import { SignOutScreen } from '../screen/sign-out-screen';
import { VSScreen } from '../screen/vs-screen';
import * as authStore from '../store/auth-store';

export type RootParamList = {
  Main: undefined;
  DeckFilterModal: undefined;
  CardModal: { cardImageSrc: string; name: string };
  SignIn: undefined;
};

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Deck">
      <Drawer.Screen name="Deck" component={DeckScreen} />
      <Drawer.Screen
        name="VS"
        component={VSScreen}
        options={{ title: '対戦' }}
      />
      <Drawer.Screen name="SignOut" component={SignOutScreen} />
    </Drawer.Navigator>
  );
};

const Stack = createNativeStackNavigator<RootParamList>();

export const Navigation = () => {
  const isAuthenticated = useSelector(
    authStore.selectors.isAuthenticatedSelector
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSignedIn = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        dispatch(authStore.actions.signIn());
      } catch (error) {
        dispatch(authStore.actions.signOut());
      }
    };
    checkSignedIn();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Main' : 'SignIn'}>
        {isAuthenticated ? (
          <Stack.Screen
            name="Main"
            component={DrawerNavigator}
            options={{ headerShown: false, animation: 'none' }}
          />
        ) : (
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{ title: 'サインイン', animation: 'none' }}
          />
        )}
        <Stack.Screen
          name="DeckFilterModal"
          component={CardListFilterModalScreen}
          options={{ presentation: 'modal', title: 'フィルタ' }}
        />
        <Stack.Screen
          name="CardModal"
          component={CardModalScreen}
          options={{ presentation: 'modal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
