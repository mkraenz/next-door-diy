import {
  ArrowRightIcon,
  CalendarIcon,
  ChatIcon,
  EmailIcon,
  TimeIcon,
} from "@chakra-ui/icons";
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
  useDisclosure,
} from "@chakra-ui/react";
import type { FC } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const homeRoute = "/";
const navData = [
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Availabilities", href: "/availabilities", icon: TimeIcon },
  { name: "Contacts", href: "/contacts", icon: ChatIcon },
  { name: "Bookings", href: "/bookings", icon: EmailIcon },
] satisfies {
  name: string;
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
      <IconButton
        icon={<ArrowRightIcon />}
        aria-label={"open drawer navigation menu"}
        ref={btnRef}
        onClick={onOpen}
        m={2}
      />
      <Drawer
        isOpen={isOpen}
        placement={"left"}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader
            cursor={"pointer"}
            onClick={() => handleClick(homeRoute)}
          >
            {t("appName")}
          </DrawerHeader>

          <DrawerBody>
            <Stack alignItems={"flex-start"}>
              {navData.map((item) => (
                <Stack
                  key={item.name}
                  _hover={{ bg: "blue.200" }}
                  width={"full"}
                  align={"flex-start"}
                  cursor={"pointer"}
                  as={"a"}
                  onClick={() => handleClick(item.href)}
                  bg={location.pathname === item.href ? "blue.100" : undefined}
                >
                  <Button
                    variant="nav"
                    key={item.name}
                    leftIcon={<item.icon boxSize={6} />}
                  >
                    {item.name}
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
