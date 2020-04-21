import {Text, Flex} from 'rebass'

export default props =>
  <Flex
    width={1}
    alignItems="center"
    justifyContent="center"
  >
    <Text
      textAlign="center"
      p={25}
      fontSize={3}
      bg="c1"
      {...props}
      sx={{
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 25,
      }}
    />
  </Flex>
