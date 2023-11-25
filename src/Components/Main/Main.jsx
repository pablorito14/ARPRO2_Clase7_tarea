import { Box, Button, Container, Flex, Grid, GridItem, Heading, Image, Input, InputGroup, InputRightElement, Spinner, Text } from "@chakra-ui/react"
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
const Main = () => {

  const [loading,setLoading] = useState(true)
  const [images,setImages] = useState([])
  const [moreResults, setMoreResults] = useState(true);
  
  const [page,setPage] = useState(1);
  const [searchInput,setSearchInput] = useState('');
  const [search,setSearch] = useState('');

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

const handleScroll = () => {
  console.log('asdasdasd');
}

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
      console.log(`unsplash-p${page}.json`)
      

      console.log('cargar imagenes')
      const response = await axios.get(`unsplash-p${page}.json`);
      let data=response.data
    // REVISAR ERRORES
      if(data.length < 10 || data.length > 30){
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





    // console.log(page)
    
    // setLoading(true);
    // const getImages = async () => {
    //   console.log(page)
    //   setPage(page+1);
    //   // try {
    //     // if(moreResults){
    //       // const response = await axios.get('unsplash-p2.json');
    //       console.log(`unsplash-p${page+1}.json`)
    //       const response = await axios.get(`unsplash-p${page+1}.json`);

    //       if(response.data.length < 10){
    //         setLoading(false);
    //         setMoreResults(false);
    //         return;
    //       }

    //       setTimeout(() => {
    //         const data = response.data;
    //         console.log(data.length)
    //         setImages((images) => images.concat(data))
    //         // setContador(contador+1);
    //         setLoading(false);
    //         // setMoreResults(false);
    //       }, 500);
    //     // }
    //   // } catch (error) {
    //     // console.log(error)
    //   // }
    // }
      
    // getImages();
  }

  return(
    <Box bg='#F6E9E9' py={6} minH={{base:'calc(100vh - 40px - 64px)', md:'calc(100vh - 40px - 64px)'}}>
      
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
        <Gallery images={images} moreResults={moreResults} cargarMas={cargarMas} />  
        {loading && <Loading page={page} />}

      </Container>
      
    </Box>
  )
}

export { Main }