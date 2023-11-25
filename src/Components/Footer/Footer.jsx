import { Box, Container, Heading } from "@chakra-ui/react"

const Footer = () => {
  return(
    <Box as='footer' bg='#E16428' color='#F6E9E9' position='sticky' boxShadow='dark-lg-up'>
      <Container>
        <Heading py={2} size='md'>Pablo Rito</Heading>
      </Container>
    </Box>
  )
}

export { Footer }