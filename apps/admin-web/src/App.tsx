// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { store } from "./store";
import Test from "./test/Test";
import { theme } from "./theme";

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Test />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
