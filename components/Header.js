import { Heading, HStack, Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <HStack display="flex" width="100%" my="10" justifyContent="space-around">
      <Heading>Shoppies</Heading>
      <Button onClick={toggleColorMode} backgroundColor="transparent">
        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      </Button>
    </HStack>
  );
};

export default Header;
