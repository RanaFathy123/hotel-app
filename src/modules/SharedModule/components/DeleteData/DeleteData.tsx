import React from 'react';
import imgTrash from '../../../../assets/images/Email.png';
import { Box, Stack, Typography } from '@mui/material';



const DeleteData = ({ title, item }:any) => {

  return (
    <Box
      sx={{
        margin: 'auto',
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 8,
        maxWidth: 450
      }}
      borderRadius={2}
    >
      <Stack>
        <img src={imgTrash} alt="Trash" style={{ width: '7em', margin: 'auto' }} />
        <Typography  variant="subtitle1" sx={{ marginTop: '3em' }} fontWeight='700' fontFamily='sans-serif'>
          Delete This {title}
        </Typography>
        <Typography sx={{ mt: 2 }} color='gray'>
          Are you sure you want to delete this {item}? If you are sure, just click on delete it.
        </Typography>
      </Stack>
    </Box>
  );
}

export default DeleteData;
