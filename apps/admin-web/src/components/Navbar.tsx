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
import LogoutButton from "../auth/LogoutButton";

const navData = [
  { name: "Calendar", href: "/admin/calendar", icon: CalendarIcon },
  { name: "Availabilities", href: "/admin/availabilities", icon: TimeIcon },
  { name: "Contacts", href: "/admin/contacts", icon: ChatIcon },
  { name: "Bookings", href: "/admin/bookings", icon: EmailIcon },
  { name: "Home", href: "/", icon: ViewIcon, withDividerTop: true },
] satisfies {
  name: string;
  href: string;
  icon: unknown;
  withDividerTop?: true;
}[];

interface Props {}

const Navbar: FC<Props> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement>(null);
  //   const router = useRouter();

  //   const navigateTo = (href: string) => () => router.push(href);
  return (
    <>
      <IconButton
        icon={<ArrowRightIcon />}
        aria-label={"open drawer navigation menu"}
        ref={btnRef}
        onClick={onOpen}
        m={{ md: 8, base: 2 }}
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
          <DrawerHeader>Next Door DIY Admin</DrawerHeader>

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
                    key={item.name}
                    // onClick={navigateTo(item.href)}
                    leftIcon={<item.icon boxSize={6} />}
                    variant="nav"
                    // bg={router.pathname === item.href ? "brand.800" : undefined}
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
