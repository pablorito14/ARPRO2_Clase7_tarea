import { Box, Image,Button, Text, Flex, Spinner } from "@chakra-ui/react"
import { Children, useEffect, useMemo, useRef } from "react"
import Macy from "macy";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from 'axios';
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";

const Loading = () => {
  return (
    // <Flex>
      <Spinner 
            thickness='4px'
            speed='0.65s'
            color='blue.500'
            size='xl' />
        // <Text>Cargando más imágenes</Text>
    // </Flex>
          )
}

const Gallery = ({images,moreResults,cargarMas}) => {
  // console.log(images)
  // const options = {
  //   columns:4,
  //   margin:5,
  //   breakAt: {
  //     1200: 4,
  //     940: 3,
  //     520: 2,
  //     400: 1
  //   }
  // }
  // const options = useMemo(()=>(
  //   {
  //     columns: 3,
  //     margin: 2,
  //     breakAt: {
  //       1200: 5,
  //       940: 3,
  //       520: 2,
  //       400: 1
  //     }
  //   }),
  //   []
  // );

  // const getStyle = () => {
  //   return { height: `${50 + Math.random() * 200}px`,
  //   width: `${50 + Math.random() * 200}px`  };
  // };

  // const cargarMas = () => {
  //   const getImages = async () => {
  //     try {
        
  //       const response = await axios.get('unsplash-p2.json');

  //       setTimeout(() => {
  //         const data = response.data;
  //         setImages((images) => images.concat(data))
  //         // setLoading(false);
  //       }, 2000);
        
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
      
  //   getImages();
  // }
// console.log(moreResults)
console.log(window.visualViewport.height)
  return(
    <>

    <InfiniteScroll 
            dataLength={images.length}
            // loader={<Loading />}
            // height={1000}
            // height={window.visualViewport.height > 1000 && 800}
            
            next={cargarMas}
            hasMore={moreResults}
            // scrollThreshold={.8}
            // onScroll={() => console.log('asdasda')}
            // pullDownToRefresh={true}
            // refreshFunction={cargarMas}

            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>¡No hay mas resultados!</b>
              </p>
              
            }
            
            >

                {/* <Masonro options={options}> */}
        <Box
          // mx='auto'
          
          display='flex'
          flexWrap='wrap'
          justifyContent='space-around'
          // gap='1rem'
          rowGap='1rem'

          p={3}

        >

          
        
        {images.map((image,index) => (
          <Box key={index}
          // boxSize={{base: '150px',md:'200px'}}
          maxW={{base:'150px',md:'200px'}}
          maxH={{base:'150px',md:'200px'}}
          boxShadow='4px 4px 10px 2px rgb(54,51,51, 0.5)'
          borderRadius='.5rem'
          position='relative'
          >
            <Image src={image.urls.small}
            boxSize='full' 
            borderRadius='.5rem'
            objectFit='cover'
             />


        <Text position='absolute' top='0' bottom='0' left='0' height='full' width='full'
                  bg='rgba(0,0,0,0.3)'
                  opacity='0' 
                  borderRadius='.5rem'
                  display='flex' flexDirection='column' alignItems='center' justifyContent='center'
                  // transition={{opacity: 0.5}}
                  _hover={{opacity:1}}
                  color='whitesmoke'
                  cursor='pointer'
                  // _hover={{blur:'2px'}}
                  onClick={() => console.log('mostrarimagen'+img.id) }
                  >
                    <FaUpRightAndDownLeftFromCenter />
                    Ampliar
                    {/* <FaMaximize /> */}


            </Text> 
          </Box>
          // <div key={index} >
          //   <img src={image.urls.small} alt="" />
          // </div>
        ))}
        </Box>
        {/* </Masonro> */}
      </InfiniteScroll>
      
    </>
  )
}

export { Gallery }