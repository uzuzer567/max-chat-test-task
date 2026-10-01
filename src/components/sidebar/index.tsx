import { memo } from 'react';
import { NAVIGATION_ITEMS, ACTIONS } from './consts';
import {
  Wrapper,
  Navigation,
  NavigationItem,
  IconWrapper,
  Label,
  Actions,
  ActionButton,
} from './styles';
import type { Props } from './types';

const Sidebar = ({ activeItem = 'Все', handleLogout }: Props) => {
  return (
    <Wrapper>
      <Navigation>
        {NAVIGATION_ITEMS.map(navigationItem => (
          <NavigationItem
            key={navigationItem.label}
            type="button"
            isActive={activeItem === navigationItem.label}
          >
            <IconWrapper>{navigationItem.icon}</IconWrapper>
            <Label>{navigationItem.label}</Label>
          </NavigationItem>
        ))}
      </Navigation>

      <Actions>
        {ACTIONS.map(action => (
          <ActionButton
            key={action.label}
            type="button"
            onClick={handleLogout}
          >
            <IconWrapper>{action.icon}</IconWrapper>
            <Label>{action.label}</Label>
          </ActionButton>
        ))}
      </Actions>
    </Wrapper>
  );
};

export default memo(Sidebar);
