import { Box, Container, Heading } from "@chakra-ui/react"

const Header = () => {
  return(
    <Box as='header' bg='#E16428' color='#F6E9E9' position='sticky' boxShadow='dark-lg'>
      <Container>
        <Heading size='2xl' py={2}>Galeria</Heading>
      </Container>
    </Box>
    
  )
}

export { Header }