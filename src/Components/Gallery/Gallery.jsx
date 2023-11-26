import { Box, Image,Button, Text, Flex, Spinner } from "@chakra-ui/react"
import InfiniteScroll from "react-infinite-scroll-component";
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";

const Gallery = ({images,moreResults,cargarMas,zoomIn}) => {
  

  return(
    <>

    <InfiniteScroll 
            dataLength={images.length}
            // loader={<Loading />}
            // height={1000}
            // height={window.visualViewport.height > 1000 && 800}
            // height={800}
            
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
                  opacity={{base:1, lg:'0'}} 
                  borderRadius='.5rem'
                  display='flex' flexDirection='column' alignItems='center' justifyContent='center'
                  _hover={{opacity:1}}
                  color='whitesmoke'
                  cursor='pointer'
                  // onTouchEnd={() => zoomIn(image.id) }
                  onClick={() => zoomIn(image.id) }
                  >
                    <FaUpRightAndDownLeftFromCenter />
                    Ampliar


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