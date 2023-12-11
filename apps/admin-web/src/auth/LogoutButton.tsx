import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { useAuth } from "./AuthContext";

interface Props {}

const LogoutButton: FC<Props> = (props) => {
  const { loading, signOut } = useAuth();
  return (
    <Button onClick={signOut} isLoading={loading}>
      Sign Out
    </Button>
  );
};

export default LogoutButton;
