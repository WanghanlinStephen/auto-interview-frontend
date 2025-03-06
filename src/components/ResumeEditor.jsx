import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  Box,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// 主题列表
const themeList = [
  { name: 'Flat', author: 'Mattias Erming', imageUrl: '/theme/Flat.png', value: 'flat' },
  { name: 'Kendall', author: 'M. Adam Kendall', imageUrl: '/theme/Kendall.png', value: 'kendall' },
  { name: 'Macchiato', author: 'Alessandro Biondi', imageUrl: '/theme/Macchiato.png', value: 'macchiato' },
  { name: 'One Page Plus', author: '', imageUrl: '/theme/One Page Plus.png', value: 'onepageplus' },
  { name: 'Professional', author: 'Thomas Davis', imageUrl: '/theme/Professional.png', value: 'professional' },
  { name: 'Relaxed', author: 'ObserverOfTime', imageUrl: '/theme/Relaxed.png', value: 'relaxed' },
  { name: 'Stack Overflow', author: '', imageUrl: '/theme/Stack Overflow.png', value: 'stackoverflow' },
];

const ResumeEditor = ({ translations }) => {
  const [theme, setTheme] = useState('flat');
  const [resumeText, setResumeText] = useState('');
  const [file, setFile] = useState(null);
  const [customText, setCustomText] = useState('');
  const [error, setError] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const steps = [translations.resumeStepOne, translations.resumeStepTwo, translations.resumeStepThree];

  const [loading, setLoading] = useState(false);

  // **🔥 提交表单并请求后端**
  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);
      const formData = new FormData();

      // **确保至少有 `resume_text` 或 `resume_file`**
      if (resumeText.trim()) {
        formData.append('resume_text', resumeText);
      } else if (file) {
        formData.append('resume_file', file);
      } else {
        setError('请填写简历文本或上传文件');
        setLoading(false);
        return;
      }

      formData.append('theme', theme);
      formData.append('customized_info', customText.trim());

      const response = await axios.post('http://localhost:8000/result/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setLoading(false);

      if (response.data.html_url) {
        navigate(`/result?html_url=${encodeURIComponent(response.data.html_url)}&preview_html_url=${encodeURIComponent(response.data.preview_html_url)}`);
      } else {
        setError('生成简历失败，请重试');
      }
    } catch (err) {
      console.error('上传失败：', err);
      setError('提交失败，请检查网络或稍后再试');
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // **🔥 渲染不同步骤的内容**
  const renderStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>{translations.selectTheme}</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {themeList.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.value}>
                  <Card variant="outlined" sx={{ border: theme === item.value ? '2px solid #FFD700' : '1px solid #ccc' }}>
                    <CardMedia component="img" image={item.imageUrl} alt={item.name} sx={{ height: 150, objectFit: 'cover' }} />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>{item.name}</Typography>
                      <Typography variant="body2" color="textSecondary">by {item.author || 'Unknown'}</Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <Button size="small" variant="contained" onClick={() => setTheme(item.value)}>
                        {theme === item.value ? 'Selected' : 'Select'}
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>{translations.editorTitle}</Typography>
            <TextField
              label={translations.resumeTextLabel}
              multiline
              rows={6}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button variant="contained" component="label" sx={{ mt: 2, mb: 2 }}>
              {translations.uploadFile}
              <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
            </Button>
          </Box>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>{translations.customization}</Typography>
            <TextField
              label="Custom Text"
              multiline
              rows={3}
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>{translations.editorTitle}</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {renderStepContent(activeStep)}

      <Box display="flex" justifyContent="space-between" sx={{ mt: 4 }}>
        <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined">上一步</Button>
        <Button variant="contained" color="primary" onClick={handleNext} disabled={loading}>
          {activeStep === steps.length - 1 ? translations.submitButton : '下一步'}
        </Button>
      </Box>
    </Container>
  );
};

export default ResumeEditor;
