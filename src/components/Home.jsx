import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import Proof from './Proof';
import Flow from './Flow';

const Home = ({ translations }) => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',                     // 粗体
          background: 'linear-gradient(#fff, #888)', // 上白(#fff)、下灰(#888)的渐变
          WebkitBackgroundClip: 'text',           // 只给文字本身填充背景
          WebkitTextFillColor: 'transparent',     // 让文字本身变透明,以便显示渐变
        }}
      >
        {translations.homeTitle}
      </Typography>
      <Typography variant="h6" color="textSecondary" paragraph>
        {translations.homeDescription}
      </Typography>
      <Box mt={4}>
        <Button
          component={Link}
          to="/editor"
          variant="contained"
          color="primary"
          size="large"
        >
          {translations.startButton}
        </Button>
      </Box>

      <Proof />

      <Flow />
    </Container>
  );
};

export default Home;
