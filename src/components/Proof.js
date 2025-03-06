import React from 'react';
import { Box, Typography } from '@mui/material';

const Proof = () => {
  return (
    <Box
      id="proof"
      sx={{
        mt: 10,
        textAlign: 'center',
      }}
    >

      <Typography variant="h4" gutterBottom>
        Our Proof
      </Typography>
      <Typography variant="body1" paragraph>
        Throughout this whole video, you'll see me use Interview Coder for both the OA and the final round.
        <br />
        <br />
        Skeptical? Watch the entire, uncut technical interview here.
      </Typography>

      {/* 这里留个视频的占位区域，可以将其替换成真实的 iframe 或视频组件 */}
      <Box
        sx={{
          width: '100%',
          height: 400,
          border: '2px dashed #ccc',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="subtitle1" color="textSecondary">
          (Video Placeholder)
        </Typography>
      </Box>
    </Box>
  );
};

export default Proof;
