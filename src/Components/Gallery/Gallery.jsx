import { Box, Image, useMediaQuery } from "@chakra-ui/react"
import InfiniteScroll from "react-infinite-scroll-component";
import { motion} from 'framer-motion'

const Gallery = ({images,moreResults,nextPage,zoomIn}) => {

  const [isLargerThan768] = useMediaQuery('(min-width: 48em)')
  
  return(
    <InfiniteScroll dataLength={images.length} next={nextPage} 
                    hasMore={moreResults}
                    endMessage={
                      <p style={{ textAlign: "center" }}>
                        <b>¡No hay mas resultados!</b>
                      </p>
                    }>
      <Box display='flex' flexWrap='wrap' justifyContent='space-around'
            rowGap='1rem' p={3}>
        {images.map((image,index) => (
        
          <Box key={index} 
                maxW={{base:'150px',md:'200px'}} maxH={{base:'150px',md:'200px'}}
              borderRadius='.5rem' onClick={() => zoomIn(image.id) }>
            <motion.div animate={{opacity: [0,1],scale:[0,1] }}>
              <motion.div whileHover={{scale:1.1}}
                          whileTap={{scale:0.9}}
                          transition={{type: "spring", stiffness: 400, damping: 17 }}
                          style={{
                            width:(isLargerThan768) ? '200px': '150px',
                            height:(isLargerThan768) ? '200px': '150px',
                          }}>
                <Image src={image.urls.small} boxSize='full' borderRadius='.5rem' 
                      objectFit='cover' boxShadow='2px 2px 5px 2px rgb(54,51,51, 0.5)'/>
              </motion.div>
            </motion.div>
          </Box>
        ))}
      </Box>
    </InfiniteScroll>
  )
}

export { Gallery }