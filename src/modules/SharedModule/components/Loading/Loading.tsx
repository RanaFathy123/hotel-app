import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  return (
    <Box sx={{ display: 'flex' ,height:'50vh',alignItems:'center',justifyContent:'center'}}>
    <CircularProgress />
  </Box>
  )
}

export default Loading