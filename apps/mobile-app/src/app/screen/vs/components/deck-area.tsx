import { Menu, Pressable, View } from 'native-base';
import { FC, memo, useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomMenuProps } from '../../../hooks/use-custom-menu-props';
import * as vsStore from '../../../store/vs-store';
import { BoardContext } from '../context/board-context';
import { CountLabel } from './presentation/count-label';
import { VsAssetsImage } from './vs-assets-image';

export const DeckArea: FC = memo(() => {
  const [menuProps, triggerStyleProps] = useCustomMenuProps();
  const cardList = useSelector(vsStore.selectors.myselfDeckSelector);

  const boardContext = useContext(BoardContext);

  const dispatch = useDispatch();

  const draw = useCallback(() => {
    dispatch(vsStore.actions.draw());
  }, [dispatch]);

  return (
    <View>
      <Menu
        placement={'left top'}
        trigger={(triggerProps) => {
          return (
            <Pressable
              accessibilityLabel="more options menu"
              {...(boardContext.side === 'myself' ? triggerProps : {})}
            >
              <View {...triggerStyleProps}>
                <VsAssetsImage imageFileName="back.png" alt="deck card" />
              </View>
              <CountLabel count={cardList.length} />
            </Pressable>
          );
        }}
        {...menuProps}
      >
        <Menu.Item onPress={draw}>ドロー</Menu.Item>
        <Menu.Item>オープン</Menu.Item>
        <Menu.Item>リカバリー</Menu.Item>
        <Menu.Item>上から1枚破棄</Menu.Item>
        <Menu.Item>シャッフル</Menu.Item>
      </Menu>
    </View>
  );
});
