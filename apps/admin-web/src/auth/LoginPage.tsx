import { Center, Heading, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import LoginForm from './LoginForm';

interface Props {}

const LoginPage: FC<Props> = () => {
    return (
        <Center minH={'100vh'}>
            <VStack>
                <Heading mb={4}>Next Door DIY</Heading>
                <LoginForm />
            </VStack>
        </Center>
    );
};

export default LoginPage;
