import {Box} from 'rebass'

export default props =>
  <Box
    {...props}
    width={1}
    height="100vh"
    sx={{
      background: 'repeating-linear-gradient(45deg,#ffc857 0%, #ffc857 20%, #e9724c 20%, #e9724c 40%, #c5283d 40%, #c5283d 60%, #481d24 60%, #481d24 80%, #255f85 80%, #255f85 100%)'
    }}
  />


