import React from "react";
import { Flex, HStack, Text } from "@chakra-ui/react";
// @ts-ignore
import { Pioneer } from "pioneer-react";
import { Link as RouterLink } from "react-router-dom";

const PROJECT_NAME = "ETH and Friends";

const HeaderNew = () => {
  return (
    <Flex
      as="header"
      alignItems="center" // Align items vertically
      justifyContent="space-between" // Spread elements horizontally
      p={5}
      bg="gray.900"
      borderBottom="1px solid" // Set border style
      borderColor="gray.200"
    >
      <HStack spacing={8}>
        <RouterLink to="/">
          <Text fontSize="3xl" color="white">
            {" "}
            {/* Set text color */}
            {PROJECT_NAME}
          </Text>
        </RouterLink>
      </HStack>
      <Pioneer />
    </Flex>
  );
};

export default HeaderNew;
