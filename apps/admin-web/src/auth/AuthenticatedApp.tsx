import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { useAuth } from "./AuthProvider";
import LoginPage from "./LoginPage";

const AuthenticatedApp: FC<PropsWithChildren> = ({ children }) => {
  const { initiated, authenticated } = useAuth();
  if (!initiated) {
    return (
      <Center minH={"100vh"}>
        <VStack>
          <Spinner size={"xl"} />
          <Text>Attempting to resume last session...</Text>
        </VStack>
      </Center>
    );
  }
  if (authenticated) {
    return children;
  }
  return <LoginPage />;
};

export default AuthenticatedApp;
