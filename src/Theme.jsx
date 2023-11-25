import { defineStyleConfig, extendTheme } from "@chakra-ui/react"

const shadows = {
  'dark-lg-up':'rgba(0, 0, 0, 0.1) 0px 0px 0px 1px, rgba(0, 0, 0, 0.2) 0px -5px 10px, rgba(0, 0, 0, 0.4) 0px -15px 40px'
}

const Container = defineStyleConfig({
  baseStyle:{
    maxW: '6xl'
  }
})

const theme = extendTheme({shadows,components:{Container} })

export default theme;