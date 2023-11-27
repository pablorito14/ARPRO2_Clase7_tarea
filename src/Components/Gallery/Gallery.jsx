import { Box, Image,Button, Text, Flex, Spinner, useMediaQuery } from "@chakra-ui/react"
import InfiniteScroll from "react-infinite-scroll-component";
import { FaUpRightAndDownLeftFromCenter } from "react-icons/fa6";
import {AnimatePresence, motion} from 'framer-motion'
import { useEffect, useMemo, useState } from "react";

const Gallery = ({images,moreResults,nextPage,zoomIn}) => {

  const [isLargerThan768] = useMediaQuery('(min-width: 48em)')
  
  return(
    <>

    <InfiniteScroll 
            dataLength={images.length}
            next={nextPage}
            hasMore={moreResults}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>¡No hay mas resultados!</b>
              </p>
            }
            >

        <Box
          // mx='auto'
          display='flex'
          flexWrap='wrap'
          justifyContent='space-around'
          // gap='1rem'
          rowGap='1rem'

          p={3}

        >

          
        {/* <AnimatePresence mode="sync"> */}
        {images.map((image,index) => (
          
          
            <Box key={index}
            margin
              // boxSize={{base: '150px',md:'200px'}}
              maxW={{base:'150px',md:'200px'}}
              maxH={{base:'150px',md:'200px'}}
              
              borderRadius='.5rem'
              // position='relative'
              onClick={() => zoomIn(image.id) }
              
            >
              <motion.div
                animate={{opacity: [0,1],scale:[0,1]  }}
                // transition={{delay: (index-animationDelay)/50 }}

                
              >

              
<motion.div
          // key={`motion-${index}`}
          
          // style={{
          //   width:'200px',
          //   height:'200px',
          // }}

          style={{
              width:(isLargerThan768) ? '200px': '150px',
              height:(isLargerThan768) ? '200px': '150px',
            }}
          
          whileHover={{scale:1.1}}
          whileTap={{scale:0.9}}
          transition={{type: "spring", stiffness: 400, damping: 17 }}
          >
              <Image src={image.urls.small}
              boxSize='full' 
              borderRadius='.5rem'
              objectFit='cover'
              boxShadow='2px 2px 5px 2px rgb(54,51,51, 0.5)'
              />



            </motion.div>
            </motion.div>
            </Box>
          
        ))}
        {/* </AnimatePresence> */}
        </Box>
      </InfiniteScroll>
      
    </>
  )
}

export { Gallery }