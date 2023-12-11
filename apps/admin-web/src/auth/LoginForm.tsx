import { FC } from "react";

import {
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthContext";

type FormData = {
  email: string;
  password: string;
};

const LoginForm: FC = () => {
  const { createAccount, error, signIn } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(signIn);
  console.log(error);

  return (
    <form onSubmit={onSubmit}>
      <VStack>
        <FormControl isInvalid={Boolean(errors.email)}>
          <Input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <Input
            type="password"
            id="password"
            placeholder="Password"
            {...register("password", {
              required: "This is required",
              minLength: { value: 8, message: "Minimum length should be 8" },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>
        <Button mt={4} isLoading={isSubmitting} type="submit">
          Sign In
        </Button>
        <Text color="red">{error && "Invalid credentials."}</Text>
      </VStack>
    </form>
  );
};

export default LoginForm;
