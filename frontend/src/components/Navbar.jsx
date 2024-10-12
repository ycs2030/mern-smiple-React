import { Button, Container, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react'
import { PlusSquareIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
const Navbar = () => {

const { colorMode,toggleColorMode } = useColorMode();
  return (
    <Container maxW={"container.xxl"} px={4} 
    bg={useColorModeValue("gray.100", "gray.900")}>
      <Flex h={16}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{base: "22", sm: "28px"}}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-l, #e45454, #7950b5)"}
          bgClip={"text"}
        >
           <Link to={"/"}>Product Store &#128722;</Link>
        </Text>
       
       <HStack>
        <Link to={"/create"}>
        <Button >
          <PlusSquareIcon  fontSize={"20px"}/>
        </Button>
        </Link>

        <Button onClick={toggleColorMode}>
         {colorMode === "light" ? 
          <MoonIcon color={"blue.400"} fontSize={"20px"}/> :
          <SunIcon color={"yellow.400"} fontSize={"20px"}/>}
        </Button>
       </HStack>

      </Flex>
    </Container>
  );
}

export default Navbar