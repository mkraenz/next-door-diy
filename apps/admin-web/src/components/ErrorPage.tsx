import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useRouteError } from "react-router-dom";
import Layout from "./Layout";

const ErrorPage = () => {
  const error = useRouteError() as Error & {
    statusText?: string;
    status?: number;
  };
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isHttpErrorCode =
    error.status && error.status > 400 && error.status < 600;
  return (
    <Layout>
      <VStack h={"full"} justify="center">
        <Heading>Oops!</Heading>
        <br />
        <Text>Sorry, an unexpected error has occurred.</Text>
        <br />
        <Text as="i">{error.statusText || error.message}</Text>
        {isHttpErrorCode && (
          <Image
            src={`https://http.cat/images/${error.status}.jpg`}
            alt={error.statusText}
            maxH={"50%"}
          />
        )}
      </VStack>
    </Layout>
  );
};

export default ErrorPage;
