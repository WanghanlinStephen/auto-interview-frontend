import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Flow = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 3 }}>
        Our Services
      </Typography>

      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Auto Resume" />
        <Tab label="Interview Coder" />
        <Tab label="Behaviour Q. Mocker" />
      </Tabs>

      {/* === 第一个面板 === */}
      <TabPanel value={value} index={0}>
        <Typography>Automate resume creation and editing with ease.</Typography>
        <Box
          sx={{
            mt: 2,
            width: '100%',
            height: 200,
            border: '2px dashed #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" color="textSecondary">
            (Placeholder for Auto Resume)
          </Typography>
        </Box>
      </TabPanel>

      {/* === 第二个面板 === */}
      <TabPanel value={value} index={1}>
        <Typography>Practice real interview coding questions with AI support.</Typography>
        <Box
          sx={{
            mt: 2,
            width: '100%',
            height: 200,
            border: '2px dashed #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" color="textSecondary">
            (Placeholder for Interview Coder)
          </Typography>
        </Box>
      </TabPanel>

      {/* === 第三个面板 === */}
      <TabPanel value={value} index={2}>
        <Typography>Mock behavioral questions and get instant feedback.</Typography>
        <Box
          sx={{
            mt: 2,
            width: '100%',
            height: 200,
            border: '2px dashed #ccc',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="subtitle1" color="textSecondary">
            (Placeholder for Behaviour Q. Mocker)
          </Typography>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default Flow;
