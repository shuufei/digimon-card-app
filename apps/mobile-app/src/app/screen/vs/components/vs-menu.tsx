import { Ionicons } from '@expo/vector-icons';
import { Button, Menu } from 'native-base';
import { FC } from 'react';
import { MenuItem } from '../../../components/presentation/menu-item';

export const VsMenu: FC = () => {
  return (
    <Menu
      trigger={(triggerProps) => {
        return (
          <Button
            size="xs"
            variant="ghost"
            _pressed={{
              background: '#f0f0f0',
            }}
            {...triggerProps}
          >
            <Ionicons name="ellipsis-horizontal-circle-outline" size={24} />
          </Button>
        );
      }}
      width="160"
      backgroundColor="white"
      px={2}
      mr={4}
    >
      <MenuItem label="デッキを選択" />
      <MenuItem label="対戦セットアップ" />
      <MenuItem label="接続を切断" color="red.600" />
    </Menu>
  );
};
