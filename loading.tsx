import { Flex } from "@chakra-ui/react";
import { PropagateLoader } from "react-spinners";

const Loader = () => {
  return (
    <Flex h="100vh" w="100%" alignItems="center" justifyContent="center">
      <PropagateLoader color="#000" />
    </Flex>
  );
};

export default Loader;
