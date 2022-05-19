import { useState } from 'react';

export const useCustomMenuProps = () => {
  const [isOpened, setOpened] = useState(false);
  const menuProps = {
    w: 160,
    offset: 8,
    onOpen: () => {
      setOpened(true);
    },
    onClose: () => {
      setOpened(false);
    },
  };
  // TODO: animation
  const triggerStyleProps = {
    shadow: isOpened ? 9 : 0,
    // marginTop: isOpened ? -4 : 0
  };
  return [menuProps, triggerStyleProps];
};
