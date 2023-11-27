import { Box, Button, Container, Flex, Heading, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaRotateRight } from "react-icons/fa6";
import axios from 'axios'
import {motion} from 'framer-motion'
import { Gallery } from "../Gallery/Gallery";

const Loading = ({page}) => {
  return (
    <Flex justify='center' align='center' gap={3}>
      <Heading size='md' color='#363333'>Cargando {(page > 1) && 'pagina '+page}</Heading>
      <Spinner thickness='4px' speed='0.65s' color='blue.500' size='lg' />
    </Flex>
  )
}

const MaximizeImage = ({isOpen,onClose,description,url,name}) => {
  
  const title = description[0].toUpperCase() 
                + description.slice(1);

  const [load,setLoad] = useState(true);
  useEffect(() => {
    const loading = setTimeout(() => {
      setLoad(false)
    }, 1000);

    return () => clearTimeout(loading)
  },[])

  return(
    <Modal isOpen={isOpen} onClose={onClose} isCentered size='xl'>
      <ModalOverlay bg='blackAlpha.700' backdropFilter='blur(3px)'/>
      <ModalContent bg='#F6E9E930' border='none' boxShadow='none' >
        <ModalHeader px={2} pt={2} pb={0} color='#F6E9E9'>{title}</ModalHeader>
        <ModalCloseButton color='#F6E9E9' _hover={{bg:'#E16428'}} _focusVisible={{border:'none'}}/>
        <ModalBody pb={1} px={2} display='flex' flexDirection='column' alignItems='center'>
          {load && <Spinner thickness='4px' speed='0.65s' color='#E16428' size='lg' />}
          {!load && (
          <>
            <Image rounded='10px' src={url} maxW={{base:'full', md:'500px'}} 
                    maxH={{base:'full',md:'500px'}} mx='auto'
                    shadow='dark-lg' />  
            <Text color='#F6E9E9'>
              Subida por: {name} 
            </Text>
          </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

const SearchForm = ({handleChangeFilter,search,loadingSearch,searchOnline,loadingReset,resetSearch}) => {
  return (
    <form noValidate>
      <Box display='flex' mx={{base: 3, md: 5}} mb={3} 
            boxShadow='2px 2px 5px 2px rgb(54,51,51, 0.5)'
            rounded='md' bg='#363333'>
        <Input onChange={handleChangeFilter} placeholder="Buscar imagenes" 
                bg='#363333' border='none' roundedEnd='none' color='#F6E9E9'
                size='lg' value={search} 
                _placeholder={{color:'#F6E9E97C'}}
                _focusVisible={{borderColor: '#E16428'}}/>
          <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.9}}
                    transition={{type: "spring", stiffness: 400, damping: 17 }}>       
          <Button isLoading={loadingSearch} type="submit" bg='#363333' color='#F6E9E9'
                  border='none' rounded='none' size='lg' borderStartRadius='none'
                  _hover={{bg: '#E16428'}} onClick={searchOnline}>
            <FaMagnifyingGlass />
          </Button>
        </motion.div>
        <motion.div whileHover={{scale:1.05}} whileTap={{scale:0.9}}
                    transition={{type: "spring", stiffness: 400, damping: 17 }}>
          <Button type="reset" isLoading={loadingReset} bg='#363333' color='#F6E9E9'
                  border='none' roundedStart='none' roundedEnd='md' size='lg'
                  borderStartRadius='none' _hover={{bg: '#E16428'}} onClick={resetSearch}>
            <FaRotateRight />
          </Button>
        </motion.div>
      </Box>
    </form>
  )
}
const Main = () => {
  const [connectionError,setConnectionError] = useState(false)
  const [loading,setLoading] = useState(true)
  const [images,setImages] = useState([])
  const [moreResults, setMoreResults] = useState(true);
  const [perPage,setPerPage] = useState((window.innerHeight >= 1080) ? 60 : 30);
  const [page,setPage] = useState(1);
  const [search,setSearch] = useState('');
  const [image,setImage] = useState(null);
  const [reload,setReload] = useState(true);
  const [loadingSearch,setloadingSearch] = useState(false)
  const [loadingReset,setloadingReset] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  // mover a variables de entorno (investigar)
  const URL_BASE = 'https://api.unsplash.com/';
  const URL_IMAGES = 'photos/?';
  const URL_SEARCH = 'search/photos/?';
  const ACCESS_KEY='client_id=sjuFYhHQk5zOZAMrK20Pw60tY6MHm4bpu4xuNS7Rp7w';

  useEffect(() => {
    const getImages = async () => {
      try {
        if(!reload){
          return
        }
        let data = [];
        if(search.length > 0){
          const url = `${URL_BASE}${URL_SEARCH}${ACCESS_KEY}&per_page=${perPage}&page=${page}&query=${search}`;
          const response =  await axios.get(url);
          data= response.data.results;

        } else {
          const url = `${URL_BASE}${URL_IMAGES}${ACCESS_KEY}&per_page=${perPage}&page=${page}`;
          const response = await axios.get(url);
          data = response.data
        }

        if(data.length < 10 || data.length > 60){
          setLoading(false);
          setMoreResults(false);
          // return;
        }

        setTimeout(() => {
          setImages(images.concat(data))
          setLoading(false);
          setReload(false);
          loadingReset && setloadingReset(false);
          loadingSearch && setloadingSearch(false)

        }, 500);

      } catch (error) {
        console.log(error)
        setConnectionError(true);
      } 
    }
    getImages();
  
  },[reload])

  const handleChangeFilter = (e) => {
    setSearch(e.target.value)
  }

  const nextPage = () => {
    setLoading(true);
    setPage(page+1);
    setReload(true);
  }

  const searchOnline = (e) => {
    e.preventDefault();
    if(search.length < 3){
      return;
    }
    setImages([]);
    setloadingSearch(true);
    setPage(1);
    setReload(true)
  }

  const resetSearch = () => {
    if(page === 1 && search === ''){
      return;
    }
    setImages([]);
    setSearch('')
    setloadingReset(true);
    setPage(1);
    setReload(true);
  }

  const zoomIn = (id) => {
    const showImage = images.find(img => img.id === id)
    setImage(showImage);
    onOpen(true);
  }

  return(
    <Box bg='#F6E9E9' py={6} minH={{base:'calc(100vh - 40px - 64px)', md:'calc(100vh - 40px - 64px)'}}>
      
      {isOpen && <MaximizeImage isOpen={isOpen} onClose={onClose} description={image.alt_description} 
                                url={image.urls.full} name={`${image.user.first_name} ${image.user.last_name}`} />}
      <Container>
        <SearchForm handleChangeFilter={handleChangeFilter} search={search} 
                    loadingSearch={loadingSearch} searchOnline={searchOnline}
                    loadingReset={loadingReset} resetSearch={resetSearch} />
        {connectionError && <Text textAlign='center' color='red.400' fontWeight='700' >Se produjo un error al buscar las imagenes</Text>}
        <Gallery images={images} moreResults={moreResults} 
                  nextPage={nextPage} zoomIn={zoomIn} setImage={setImage} />  
        {(loading || loadingSearch || loadingReset) && <Loading page={page} />}
        
      </Container>
      
    </Box>
  )
}

export { Main }