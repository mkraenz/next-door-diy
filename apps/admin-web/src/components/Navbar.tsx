import {
  ArrowRightIcon,
  CalendarIcon,
  ChatIcon,
  EmailIcon,
  TimeIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Divider,
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
import { useNavigate } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";

const navData = [
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Availabilities", href: "/availabilities", icon: TimeIcon },
  { name: "Contacts", href: "/contacts", icon: ChatIcon },
  { name: "Bookings", href: "/bookings", icon: EmailIcon },
  { name: "Home", href: "/", icon: ViewIcon, withDividerTop: true },
] satisfies {
  name: string;
  href: string;
  icon: unknown;
  withDividerTop?: true;
}[];

interface Props {}

const Navbar: FC<Props> = (props) => {
  const { t } = useTranslation();
  const nav = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);

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
          <DrawerHeader>{t("appName")}</DrawerHeader>

          <DrawerBody>
            <Stack alignItems={"flex-start"}>
              {navData.map((item) => (
                <Stack
                  key={item.name}
                  _hover={{ bg: "blue.100" }}
                  width={"full"}
                  align={"flex-start"}
                >
                  {item.withDividerTop && <Divider />}
                  <Button
                    as={"a"}
                    onClick={() => nav(item.href)}
                    key={item.name}
                    leftIcon={<item.icon boxSize={6} />}
                    variant="nav"
                    // bg={pathname === item.href ? "blue.200" : undefined}
                  >
                    {item.name}
                  </Button>
                </Stack>
              ))}
            </Stack>
          </DrawerBody>
          <DrawerFooter borderTopWidth="1px">
            <LogoutButton />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
