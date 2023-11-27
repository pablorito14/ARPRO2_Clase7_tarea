import { Box, Button, Container, Flex, Grid, GridItem, Heading, Image, Input, InputGroup, InputRightElement, Link, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, Spinner, Text, useDisclosure, useMediaQuery } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { FaMagnifyingGlass, FaMaximize, FaRotateRight, FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import axios from 'axios'
import {motion} from 'framer-motion'
import { Gallery } from "../Gallery/Gallery";



const Loading = ({page}) => {
  return (
    <Flex justify='center' align='center' gap={3}>
      <Heading size='md' color='#363333'>Cargando {(page > 1) && 'pagina '+page}</Heading>
      <Spinner thickness='4px'
              speed='0.65s'
              color='blue.500'
              size='lg' />
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
    <>
    
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

  const ACCESS_KEY='client_id=sjuFYhHQk5zOZAMrK20Pw60tY6MHm4bpu4xuNS7Rp7w-';
// URL_BASE+URL_SEARCH+ACCESS_KEY+&query={search}
  // https://api.unsplash.com/photos/?client_id=sjuFYhHQk5zOZAMrK20Pw60tY6MHm4bpu4xuNS7Rp7w&per_page=20&page=1


  // useEffect conectado a la api
  useEffect(() => {
    const getImages = async () => {
      try {
        
      
      let data = [];
      if(search.length > 0){
        const url = `${URL_BASE}${URL_SEARCH}${ACCESS_KEY}&per_page=${perPage}&page=${page}&query=${search}`;
        const response =  await axios.get(url);

        console.log(response)

        data= response.data.results;
      } else {
        const url = `${URL_BASE}${URL_IMAGES}${ACCESS_KEY}&per_page=${perPage}&page${page}`;

        

        const response = await axios.get(url);

        console.log(response)

        data = response.data
      }

      if(data.length < 10 || data.length > 60){
        setLoading(false);
        setMoreResults(false);
        return;
      }

      setTimeout(() => {
        setImages(images.concat(data))
        setLoading(false);
        // console.log('adsasdasda')
        loadingReset && setloadingReset(false);
        loadingSearch && setloadingSearch(false)

      }, 1500);

      } catch (error) {
        console.log(error)  
      } 
    }

    // getImages();
  },[page,search])

  // useEffect desde JSON
  useEffect(() => {
    const getImages = async () => {
      console.log({search})
      let url = '';
      console.log(loadingSearch)
      if(search.length > 0){
        url = `${URL_BASE}${URL_SEARCH}${ACCESS_KEY}&per_page=${perPage}&page=${page}&query=${search}`;
        // const response =  await axios.get(url);
        // data= response.data.results;
      } else {
        url = `${URL_BASE}${URL_IMAGES}${ACCESS_KEY}&per_page=${perPage}&page${page}`;
          // const response = await axios.get(url);
          // data = response.data
      }

      console.log(url);
      // if(search.length > 0){
        // TRAER 20 POR PAGINA
          // url = `${URL_BASE}${URL_SEARCH}${ACCESS_KEY}&page=${page}&query=${search}`;
          // const response =  await axios.get(url);
          // data= response.data.results;
          // ademas viene total: 10000, total_pages:1000       
        // } else {
        //   url = `${URL_BASE}${URL_IMAGES}${ACCESS_KEY}&page${page}`;
        //   const response = await axios.get(url);
        //   data = response.data
        // }
      
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
        setImages(images.concat(data))
        setLoading(false);
        // console.log('adsasdasda')
        loadingReset && setloadingReset(false);
        loadingSearch && setloadingSearch(false)

      }, 1500);
    }
    console.log('CARGANDO DESDE JSON')
    getImages();

  },[page,search])
  
  
  const handleChangeFilter = (e) => {
    setSearchInput(e.target.value)
  }

  const searchOnline = (e) => {
    e.preventDefault();
    if(searchInput.length < 3 || searchInput === search){
      return;
    }

    setSearch(searchInput);
    setloadingSearch(true);
    setPage(1);
    // const url = `${URL_BASE}${URL_SEARCH}${ACCESS_KEY}&page=${page}&query=${searchInput}`
    // // URL_BASE+URL_SEARCH+ACCESS_KEY+&query={search}
    // console.log(search)
    // console.log(searchInput)
    // console.log(url)
    // setTimeout(() => {
    //   setloadingSearch(false)
    // }, 2000);
  }
  
  const nextPage = () => {
    // console.log(images.length)
    setLoading(true);
    setPage(page+1);

    
  }

  const resetSearch = () => {

    if(page === 1 && searchInput === ''){
      return;
    }
    // console.log(searchInput,page)


    // console.log('resetear')
    setSearchInput('')
    setloadingReset(true);
    setPage(1);

    // const url = `${URL_BASE}${URL_SEARCH}${ACCESS_KEY}&page=${page}`
    // console.log(url)

    // setTimeout(() => {
      // setloadingReset(false)
    // }, 2000);
  }

  const zoomIn = (id) => {
    const showImage = images.find(img => img.id === id)
    setImage(showImage);
    onOpen(true);
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [loadingSearch,setloadingSearch] = useState(false)
  const [loadingReset,setloadingReset] = useState(false)

  return(
    <Box bg='#F6E9E9' py={6} minH={{base:'calc(100vh - 40px - 64px)', md:'calc(100vh - 40px - 64px)'}}>
      
      {isOpen && <MaximizeImage isOpen={isOpen} onClose={onClose} description={image.alt_description} url={image.urls.full} name={`${image.user.first_name} ${image.user.last_name}`}
                               />}
      <Container>
        <form noValidate>
          <Box display='flex' 
                mx={5} mb={3} 
                boxShadow='2px 2px 5px 2px rgb(54,51,51, 0.5)'
                rounded='md'
                bg='#363333'
                
                >

          
            <Input onChange={handleChangeFilter} 
                    placeholder="Buscar imagenes" 
                    bg='#363333'
                    border='none'
                    roundedEnd='none'  
                    color='#F6E9E9'
                    size='lg'
                    _placeholder={{color:'#F6E9E97C'}}
                    _focusVisible={{borderColor: '#E16428'}}
                    value={searchInput} />
            <motion.div 
              whileHover={{scale:1.05}}
              whileTap={{scale:0.9}}
              transition={{type: "spring", stiffness: 400, damping: 17 }}
            >       
            <Button 
                isLoading={loadingSearch}
                type="submit"
                bg='#363333'
                color='#F6E9E9'
                border='none'
                rounded='none'
                size='lg'
                borderStartRadius='none'
                _hover={{bg: '#E16428'}}
                onClick={searchOnline}><FaMagnifyingGlass /></Button>
            </motion.div>
            <motion.div 
              whileHover={{scale:1.05}}
              whileTap={{scale:0.9}}
              transition={{type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
              type="reset"
                isLoading={loadingReset}
                bg='#363333'
                color='#F6E9E9'
                border='none'
                roundedStart='none'
                roundedEnd='md'
                size='lg'
                borderStartRadius='none'
                _hover={{bg: '#E16428'}}
                onClick={resetSearch}><FaRotateRight />
                </Button>
            </motion.div>
            
          </Box>
        </form>
        <Gallery images={images} moreResults={moreResults} 
                  nextPage={nextPage} zoomIn={zoomIn} setImage={setImage} />  
        {loading && <Loading page={page} />}
        
      </Container>
      
    </Box>
  )
}

export { Main }