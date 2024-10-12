import { Container, SimpleGrid, Text, useColorModeValue, VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../../Store/product";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
    const {fetchProducts,products} =useProductStore();
    
    // Fetch products on component mount
    useEffect(() => {
      fetchProducts();
    },[fetchProducts]);
  return (
    <Container
      maxW={"container.xl"}
      px={4}
      py={4}
      bg={useColorModeValue("gray.100", "gray.900")}
    >
      <VStack spacing={8} textTransform={"capitalize"}>
        <Text
          fontSize={{ base: "22", sm: "28px" }}
          fontWeight={"bold"}
          bgGradient={"linear(to-l, #e45454, #7950b5)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          product store
        </Text>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3 }}
                spacing={{ base: 5, lg: 8 }}
                w={"full"}
              >
               {products && products.map((product) => (
                // Render ProductCard component for each product in the array
                <ProductCard key={product._id} product={product} />
               ))}
              </SimpleGrid>

        { products.length === 0 && (
          <Text
          fontSize={{ base: "22", sm: "28px" }}
          fontWeight={"bold"}
          color="gray.500"
          textAlign={"center"}
          m={3}
        >
          no product found &#128542; <br />
          <Link to={"/create"}>
            <Text
              as={"span"}
              color={"blue.500"}
              _hover={{ textDecoration: "underline" }}
            >
              Create a new product
            </Text>
          </Link>
        </Text>
        )
        }
        
      </VStack>
    </Container>
  );
};

export default HomePage;
