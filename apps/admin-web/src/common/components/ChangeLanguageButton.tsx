import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FiGlobe } from 'react-icons/fi';

const languages = [
  {
    nameInTargetLanguage: 'English',
    code: 'en',
    flag: '🇬🇧',
  },
  {
    nameInTargetLanguage: 'Deutsch',
    code: 'de',
    flag: '🇩🇪',
  },
];

const ChangeLanguageButton: FC = () => {
  const {
    t,
    i18n: { changeLanguage },
  } = useTranslation();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label={t('changeLanguage')}
        icon={<Icon as={FiGlobe} fontSize={'xl'} />}
        variant="outline"
      />
      <MenuList>
        {languages.map(({ nameInTargetLanguage, code, flag }) => (
          <MenuItem onClick={() => changeLanguage(code)}>
            {flag} {nameInTargetLanguage}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default ChangeLanguageButton;
