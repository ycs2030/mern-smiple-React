import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useProductStore } from '../../Store/product';
//import eagle from "../assets/2.png"

const ProductCard = ({product}) => {
  // update the ui immediately,
  const [updatedproducts, setupdatedProducts] =useState(product); ;
  const {_id,image, name, price} = product;
  console.log(_id);
  console.log(typeof _id);
  const {deleteProduct,updateProduct} = useProductStore();
  const toast = useToast();
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bgColor = useColorModeValue("white", "gray.800");

  const { isOpen, onOpen, onClose } = useDisclosure()

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  // console.log(initialRef.current.name);

  const handleDeleteProduct =async (id) => {
    const {success, message}=await deleteProduct(id);
    if(!success){
      toast({
        title: 'Error',
        position: 'top',
        description: `${message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }else{
      toast({
        title: 'Success',
        position: 'top',
        description: `${message}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  }
  const handleUpdateProduct =async (id,updatedProduct) => {
    const {success, message}=await updateProduct(id,updatedProduct);
    if(!success){
      toast({
        title: 'Error',
        position: 'top',
        description: `${message}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }else{
      toast({
        title: 'Success',
        position: 'top',
        description: `${message}`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    onClose();
  }
  return (
    <>
         <Box
         shadow={"lg"}
         rounded={"lg"}
         overflow={"hidden"}
         transition={"all 0.3s"}
         _hover={{ transform: "translateY(-5px)",shadow: "xl" }}
         bg={bgColor}
         >
         <Image src={image} alt={name} h={48} w='full' objectFit={"cover"}/>
         
         <Box p={6}>
           <Box pb={4}>
             <Heading as='h3' size='sm'>{name}</Heading>
           </Box>
           <Text
           fontWeight={"bold"}
           fontSize={"xl"}
           mb={4}
           color={textColor}
           >
           {price}
            </Text>
            <HStack spacing={2}>
            <IconButton onClick={onOpen} icon={<EditIcon />}  colorScheme='blue' />
			      <IconButton icon={<DeleteIcon />}
             onClick={() => handleDeleteProduct(_id)}
             colorScheme='red' />
            </HStack>
         </Box>

       </Box>

       <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>update product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input ref={initialRef} placeholder='Product Name' name='name'
               value={updatedproducts.name}
               onChange={(e) => setupdatedProducts({...updatedproducts, name: e.target.value})}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Price </FormLabel>
              <Input type='number' placeholder='Price'  name='price'
              value={updatedproducts.price} 
              onChange={(e) => setupdatedProducts({...updatedproducts, price: e.target.value})}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Image </FormLabel>
              <Input type='text' placeholder='Image URL'  name='image' 
              value={updatedproducts.image}
              onChange={(e) => setupdatedProducts({...updatedproducts, image: e.target.value})}/>
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}
            onClick={() => {handleUpdateProduct(_id, updatedproducts)}}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </>
  )
}

ProductCard.propTypes = {
  //_id: PropTypes.object.isRequired,
 // _id: PropTypes.string.isRequired,
  product: PropTypes.objectOf(
    PropTypes.shape({
      //_id: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
      _id: PropTypes.object.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired
    })).isRequired,
    // _id: PropTypes.string.isRequired,
}

export default ProductCard