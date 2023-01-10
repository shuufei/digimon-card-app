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
import { VsCardModalScreen } from '../screen/vs-card-modal-screen';
import { VsBattleCard } from '../domains/vs-card';
import { VsBoardScreen } from '../screen/vs/vs-board-screen';
import * as authStore from '../store/auth-store';
import { ConnectOpponentModalScreen } from '../screen/connect-opponent-modal-screen';
import { SelectDeckModalScreen } from '../screen/select-deck-modal-screen';

export type RootParamList = {
  Main: undefined;
  DeckFilterModal: undefined;
  CardModal: { cardImageSrc: string; name: string };
  VsCardModal: { card: VsBattleCard };
  ConnectOpponentModal: undefined;
  SelectDeckModal: undefined;
  SignIn: undefined;
};

export type VsParamList = {
  VsConnect: undefined;
  VsBoard: undefined;
};

const VsStack = createNativeStackNavigator<VsParamList>();

const VsStackNavigator: FC = () => {
  return (
    <VsStack.Navigator initialRouteName="VsBoard">
      {/* <VsStack.Screen
        name="VsConnect"
        component={VsConnectScreen}
        options={{ headerShown: true, title: '対戦 接続' }}
      /> */}
      <VsStack.Screen
        name="VsBoard"
        component={VsBoardScreen}
        options={{ headerShown: false }}
      />
    </VsStack.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Deck">
      <Drawer.Screen name="Deck" component={DeckScreen} />
      <Drawer.Screen
        name="VS"
        component={VsStackNavigator}
        options={{ title: '対戦', headerShown: false }}
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
  }, [dispatch]);

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
        <Stack.Screen
          name="VsCardModal"
          component={VsCardModalScreen}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen
          name="ConnectOpponentModal"
          component={ConnectOpponentModalScreen}
          options={{ presentation: 'modal', title: '対戦相手と接続' }}
        />
        <Stack.Screen
          name="SelectDeckModal"
          component={SelectDeckModalScreen}
          options={{ presentation: 'modal', title: 'デッキを選択' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
