import { Box, Button, Container, Flex, Grid, GridItem, Heading, Image, Input, InputGroup, InputRightElement, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaMaximize, FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import axios from 'axios'
import { Gallery } from "../Gallery/Gallery";



const Loading = ({page}) => {
  return (
    <Flex justify='center' align='center' gap={3}>
      <Heading size='md'>Cargando {(page > 1) && 'pagina '+page}</Heading>
      <Spinner thickness='4px'
              speed='0.65s'
              color='blue.500'
              size='lg' />
    </Flex>
          )
}

const MaximizeImage = ({isOpen,onClose,image}) => {
  console.log(image)

  return(
    <>
    
    {image && <Modal 
                    isOpen={isOpen} onClose={onClose} 
                    isCentered size='xl'>
      <ModalOverlay backdropFilter='blur(3px)'/>
      <ModalContent bg='#F6E9E9' >
        <ModalHeader>{image.alt_description}</ModalHeader>
        <ModalCloseButton _focusVisible={{border:'none'}}/>
        <ModalBody pb={6}>
          {/* <Box h='500px' maxW='800px' maxH='500px'> */}

            <Image src={image.urls.full} maxW={{base:'full', md:'500px'}} 
                    maxH={{base:'full',md:'500px'}} mx='auto' />  
                    <Text>Subido por: {image.user.first_name} {image.user.last_name} - Usuario {image.user.username} - Imagenes: {image.user.total_photos}</Text>
          {/* </Box> */}
        </ModalBody>

      </ModalContent>
    </Modal>}

    </>
  )
}
const Main = () => {

  const [loading,setLoading] = useState(true)
  const [images,setImages] = useState([])
  const [moreResults, setMoreResults] = useState(true);
  const [perPage,setPerPage] = useState((window.innerHeight >= 1080) ? 60 : 30);
  
  
  const [page,setPage] = useState(1);
  const [searchInput,setSearchInput] = useState('');
  const [search,setSearch] = useState('');

  const [image,setImage] = useState(null);

  const URL_BASE = 'https://api.unsplash.com/';
  const URL_IMAGES = 'photos/?';
  const URL_SEARCH = 'search/photos/?';

  const ACCESS_KEY='client_id=sjuFYhHQk5zOZAMrK20Pw60tY6MHm4bpu4xuNS7Rp7w';

  // https://api.unsplash.com/photos/?client_id=sjuFYhHQk5zOZAMrK20Pw60tY6MHm4bpu4xuNS7Rp7w&per_page=20&page=1

//   useEffect(() => {
//     const getImages = async () => {
//       try {
//         // let url = URL_BASE;
//         // let data = undefined;
//         // if(search.length > 0){
//         // TRAER 20 POR PAGINA
//         //   url = `${URL_BASE}${URL_SEARCH}${ACCESS_KEY}&page=${page}&query=${search}`;
//         //   const response =  await axios.get(url);
//         //   data= response.data.results;
//         //   // ademas viene total: 10000, total_pages:1000       
//         // } else {
//         //   url = `${URL_BASE}${URL_IMAGES}${ACCESS_KEY}&page${page}`;
//         //   const response = await axios.get(url);
//         //   data = response.data
//         // }

//         // console.log(url);
//         const response = await axios.get('unsplash.json');

//         setTimeout(() => {
//           const data = response.data;
//           setImages(data)
//           setLoading(false);
//         }, 1000);
        
//       } catch (error) {
//         console.log(error)
//       }
//     }
      
//     getImages();
//   },[search])
// // },[page,search])



useEffect(() => {
  const getImages = async () => {
      // let url = URL_BASE;
      // let data = undefined;
      // if(search.length > 0){
      // TRAER 20 POR PAGINA
      //   url = `${URL_BASE}${URL_SEARCH}${ACCESS_KEY}&page=${page}&query=${search}`;
      //   const response =  await axios.get(url);
      //   data= response.data.results;
      //   // ademas viene total: 10000, total_pages:1000       
      // } else {
      //   url = `${URL_BASE}${URL_IMAGES}${ACCESS_KEY}&page${page}`;
      //   const response = await axios.get(url);
      //   data = response.data
      // }

      // console.log(url);
      
      // OLD VERSION
      // const response = await axios.get('unsplash.json');

      // setTimeout(() => {
      //   const data = response.data;
      //   setImages(data)
      //   setLoading(false);
      // }, 1000);



      // NEW VERSION

      // CONSUMIENDO JSON
      let file = `unsplash-p${page}.json`;
      if(images.length === 0 && perPage === 60){
        file = `unsplash-p${page}-xl.json`;
      }
      // file = (perPage === 30) ? `unsplash-p${page}.json` : `unsplash-p${page}-xl.json`

    console.log(file)
      const response = await axios.get(file);
      let data=response.data
    // REVISAR ERRORES
      if(data.length < 10 || data.length > 60){
        setLoading(false);
        setMoreResults(false);
        return;
      }

      setTimeout(() => {
        console.log(data.length)
        console.log(images)
        setImages(images.concat(data))
        setLoading(false);
      }, 1500);
  }
  
  getImages();
},[page,search])
  
  
  const handleChangeFilter = (e) => {
    setSearchInput(e.target.value)
  }

  const searchOnline = (e) => {
    e.preventDefault();
    setSearch(searchInput);
    console.log('hacer peticion para agregar la busqueda de '+searchInput)
  }
  
  const cargarMas = () => {
    console.log(images.length)
    setLoading(true);
    setPage(page+1);
  }

  const zoomIn = (id) => {
    console.log('ampliar imagen '+id)
    const showImage = images.find(img => img.id === id)
    console.log(showImage);
    setImage(showImage);
    console.log(showImage);
    onOpen(true);
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  return(
    <Box bg='#F6E9E9' py={6} minH={{base:'calc(100vh - 40px - 64px)', md:'calc(100vh - 40px - 64px)'}}>
      
      {isOpen && <MaximizeImage isOpen={isOpen} onClose={onClose} image={image} />}
      <Container>
        <form noValidate>
          <InputGroup pb={6} >
      
            <Input onChange={handleChangeFilter} 
                    placeholder="Buscar imagenes" 
                    // focusBorderColor='#E16428'
                    bg='#363333'
                    border='none'  
                    color='#F6E9E9'
                    boxShadow='4px 4px 10px 2px rgb(54,51,51, 0.5)'
                    _placeholder={{color:'#F6E9E97C'}}
                    _focusVisible={{borderColor: '#E16428',boxShadow:'4px 4px 10px 2px rgb(54,51,51, 0.5)'}}
                    value={searchInput} />
                    <InputRightElement w='auto'>
                    
            <Button type="submit"
                //  boxShadow='4px 4px 10px 2px rgb(54,51,51, 0.5)' 
                bg='#363333'
                color='#F6E9E9'
                border='none'
                
                borderStartRadius='none'
                // borderColor='#F6E9E9' 
                // borderWidth='1px 1px 1px 0px'
                _hover={{bg: '#E16428'}}
                onClick={searchOnline}><FaMagnifyingGlass /></Button>
                </InputRightElement>
          </InputGroup>
        </form>
        <Gallery images={images} moreResults={moreResults} cargarMas={cargarMas} zoomIn={zoomIn} setImage={setImage} />  
        {loading && <Loading page={page} />}
        
      </Container>
      
    </Box>
  )
}

export { Main }