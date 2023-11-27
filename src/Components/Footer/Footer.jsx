import { Box, Container, Heading, IconButton, Text } from "@chakra-ui/react"
import { FaPhone } from "react-icons/fa6"

const Footer = () => {
  return(
    <Box as='footer' bg='#E16428' color='#F6E9E9' position='sticky' boxShadow='dark-lg-up'>
      <Container>
        <Heading py={2} size='md'>Pablo Rito</Heading>
      </Container>
    </Box>

      // <Box 
      //   as='footer' // para cuando se renderiza en pantalla sea <footer></footer>
      //       display="flex"
      //       justifyContent='space-between' // para que se separen pegandose a los bordes
      //       alignItems='center' // para que se centren verticalmente
      //       position="absolute"
      //       bottom="0"
      //       left="0"
      //       bg="Gray"
      //       width="100%"
      //       px={4} // para darle separacion con el borde en la izquierda y derecha
      //       py={2} // para darle separacion con el borde arriba y abajo
      //   >
      //     <Box // contenedor para que los textos vayan uno al lado del otro 
      //         display='flex' 
      //         gap={4} // separacion entre los elementos que estan dentro del box
      //         > 
      //       <Text color="white" fontWeight="bold" >Copyright 2023</Text>
      //       <Text color="white" fontWeight="bold" href="">About Us</Text>

      //     </Box>
      //     <Box 
      //           display= "flex"
      //           gap={4} // otra ves, separacion entre los elementos que estan adentro sin necesidad de padding ni margin
      //           >
                  
      //         <IconButton
      //             colorScheme='teal'
      //             aria-label='Call Segun'
      //             size='lg'
      //             icon={<FaPhone />}
      //         />
      //         <IconButton
                  
      //             colorScheme='teal'
      //             aria-label='Call Segun'
      //             size='lg'
      //             icon={<FaPhone />}
      //         />
      //     </Box> 
      // </Box>
  )
}

export { Footer }