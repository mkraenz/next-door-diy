import {
    ArrowRightIcon,
    CalendarIcon,
    ChatIcon,
    EmailIcon,
    TimeIcon,
} from '@chakra-ui/icons';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Stack,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react';
import type { FC } from 'react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

const homeRoute = '/';
const navData = [
    { nameTKey: 'Calendar', href: '/calendar', icon: CalendarIcon },
    { nameTKey: 'Availabilities', href: '/availabilities', icon: TimeIcon },
    { nameTKey: 'Contacts', href: '/contacts', icon: ChatIcon },
    { nameTKey: 'Bookings', href: '/bookings', icon: EmailIcon },
] satisfies {
    nameTKey: string;
    href: string;
    icon: unknown;
    withDividerTop?: true;
}[];

const Navbar: FC = () => {
    const { t } = useTranslation();
    const nav = useNavigate();
    const location = useLocation();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef<HTMLButtonElement>(null);

    const handleClick = (href: string) => {
        nav(href);
        onClose();
    };
    return (
        <>
            <Tooltip label={t('Open drawer navigation')}>
                <IconButton
                    icon={<ArrowRightIcon />}
                    aria-label={t('Open drawer navigation')}
                    ref={btnRef}
                    onClick={onOpen}
                    m={2}
                />
            </Tooltip>
            <Drawer
                isOpen={isOpen}
                placement={'left'}
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton
                        aria-label={t('Close drawer navigation')}
                    />
                    <DrawerHeader
                        cursor={'pointer'}
                        onClick={() => handleClick(homeRoute)}
                    >
                        {t('appName')}
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack alignItems={'flex-start'}>
                            {navData.map((item) => (
                                <Stack
                                    key={item.nameTKey}
                                    width={'full'}
                                    align={'flex-start'}
                                    onClick={() => handleClick(item.href)}
                                    as={'a'}
                                >
                                    <Button
                                        variant="nav"
                                        key={item.nameTKey}
                                        leftIcon={<item.icon boxSize={6} />}
                                        width={'full'}
                                        justifyContent={'flex-start'}
                                        bg={
                                            location.pathname === item.href
                                                ? 'blue.100'
                                                : undefined
                                        }
                                        _hover={{ bg: 'blue.200' }}
                                    >
                                        {t(item.nameTKey)}
                                    </Button>
                                </Stack>
                            ))}
                        </Stack>
                    </DrawerBody>
                    <DrawerFooter borderTopWidth="1px">
                        <LogoutButton afterSignout={onClose} />
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
};

export default Navbar;
