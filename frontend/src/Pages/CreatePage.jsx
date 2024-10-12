import { useState } from "react";
import {
  Container,
  VStack,
  Heading,
  Box,
  useColorModeValue,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import conditions from 'underscore';
import { useProductStore } from "../../Store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  console.log("product name:"+newProduct.name);
  console.log(conditions.isEmpty(newProduct.name));
  console.log(conditions.isNull(newProduct) );
  console.log(typeof newProduct);

  const toast = useToast();
  const positions = [
    "top"
  ]
  const { createProduct }=useProductStore();

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };
  const handleFormSubmit =async (e) => {
    // TODO: Add API call to create new product
    
    if( conditions.isEmpty(newProduct.name) || conditions.isEmpty(newProduct.price) || conditions.isEmpty(newProduct.image)) {
        toast({
            title: "Error",
            position: 'top',
            description: `Product name, price and image are required`,
            status: "error",
            duration: 1000,
            isClosable: true,
          });
      // TODO: Redirect to product list page or update the existing list
    }else{
        const {success, message} = await createProduct(newProduct);
        if(success){
            toast({
                title: `${positions} Success`,
                position: 'top',
                description: ` Product created successfully ${message}`,
                status: "success" ,
                duration: 3000,
                isClosable: true,
              });
              setNewProduct({
                name: "",
                price: "",
                image: "",
              });
        }else{
            toast({
                title: "Error",
                position: 'top',
                description: `${message}`,
                status: "error",
                duration: 3000,
                isClosable: true,
              });
        }
    }
    e.preventDefault();
  };
  return (
    <Container maxW={"container.sm"} my="10%">
      <VStack spacing={8}>
        <Heading
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          textTransform={"capitalize"}
          mb={8}
        >
          Create New Product
        </Heading>
        <Box 
          w={"full"}
          p={"8"}
          bg={useColorModeValue("white", "gray.800")}
          rounded={"lg"}
          boxShadow={"md"}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Input
            type="text"
            placeholder="Product Name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
          <Input
            type="number"
            value={newProduct.price}
            placeholder="Product Price"
            name="price"
            onChange={handleInputChange}
          />
          <Input
            type="text"
            value={newProduct.image}
            placeholder="Product Image URL"
            name="image"
            onChange={handleInputChange}
          />
          <Button type="submit" onClick={handleFormSubmit}>
            Create Product
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
