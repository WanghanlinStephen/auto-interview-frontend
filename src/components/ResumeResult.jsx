import React, { useState } from 'react';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const ResumeResult = ({ translations }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const previewUrl = queryParams.get('preview_html_url'); // 🔥 预览 HTML URL
  const htmlUrl = queryParams.get('html_url'); // 🔥 真实 HTML 文件 URL
  console.log(previewUrl)
  console.log(htmlUrl)
  const [loading, setLoading] = useState(false);

  // **🔥 处理 PDF 下载**
  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('html_url', htmlUrl);
      const response = await axios.post('http://localhost:8000/download_pdf/', formData);
      setLoading(false);
 
      if (response.data.pdf_url) {
        window.open(response.data.pdf_url, '_blank'); // 🔥 在新标签页打开 PDF 下载链接
      } else {
        alert('下载失败，请稍后重试');
      }
    } catch (err) {
      console.error('PDF 下载失败:', err);
      alert('PDF 生成失败，请检查网络');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>{translations.resultTitle}</Typography>

      {/* 🔥 直接加载后端返回的 HTML 文件 */}
      <Box component="iframe" src={previewUrl} width="100%" height="800px" title="简历预览" sx={{ border: 'none', mt: 2 }} />

      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <Button component={Link} to="/editor" variant="contained" color="primary">
          {translations.returnToEdit}
        </Button>

        {/* 🔥 PDF 下载按钮 */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDownloadPDF}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : translations.downloadPDF}
        </Button>
      </Box>
    </Container>
  );
};

export default ResumeResult;
