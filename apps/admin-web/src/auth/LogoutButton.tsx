import { Button } from '@chakra-ui/react';
import { FC } from 'react';
import { useAuth } from '../hooks/auth';

interface Props {
    afterSignout: () => void;
}

const LogoutButton: FC<Props> = ({ afterSignout }) => {
    const { loading, signOut } = useAuth();
    const handleClick = async () => {
        await signOut();
        afterSignout();
    };
    return (
        <Button onClick={handleClick} isLoading={loading}>
            Sign Out
        </Button>
    );
};

export default LogoutButton;
