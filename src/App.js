import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

import Home from './components/Home';
import ResumeEditor from './components/ResumeEditor';
import ResumeResult from './components/ResumeResult';
import NotFound from './components/NotFound';
import CustomNavbar from './components/CustomNavbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Profile from './components/Profile';
import Vip from './components/Vip'
import PaymentMethod from './components/PaymentMethod';

const createAppTheme = (mode) =>
  createTheme({
    palette: {
      mode: mode,
      primary: {
        main: '#FFD700', // 亮黄色
      },
      background: {
        default: mode === 'dark' ? '#121212' : '#ffffff',
        paper: mode === 'dark' ? '#1d1d1d' : '#f5f5f5',
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '30px', // 椭圆形按钮
            padding: '10px 20px',
            fontSize: '1rem',
            textTransform: 'none',
          },
        },
      },
    },
  });

const translations = {
  zh: {
    homeTitle: '欢迎来到简历修改系统',
    homeDescription: '自动修改、预览并导出 PDF 与 Word 格式的简历',
    startButton: '开始使用',
    switchLanguage: '切换到 English',
    editorTitle: '上传或编辑简历',
    resumeTextLabel: '简历文本',
    uploadFile: '上传文件',
    selectTheme: '选择主题',
    resumeStepOne: '选择主题',
    resumeStepTwo: '上传简历',
    resumeStepThree: '客制化信息',
    customization: '任何额外的定制需求（可选）',
    themeFlat: '扁平化 (默认)',
    themeProfessional: '专业风格',
    submitButton: '提交',
    resultTitle: '简历预览',
    returnToEdit: '返回修改',
    downloadPDF: '下载 PDF',
    downloadWord: '下载 Word',
    pageNotFound: '页面未找到',
    pageNotFoundDescription: '您访问的页面不存在，可能已被删除或链接错误。',
    backToHome: '返回首页',
    barProof: '证明',
    barHelp: '帮助中心',
    barSignin: '登陆',
    barSignup: '注册',
    signIn: '登陆',
    signUp: '注册',
  },
  en: {
    homeTitle: 'F**k Interview',
    homeDescription: 'Automatically modify, preview, and export resumes in PDF and Word formats',
    startButton: 'Get Started',
    switchLanguage: 'Switch to 中文',
    editorTitle: 'Upload or Edit Resume',
    resumeTextLabel: 'Resume Text',
    uploadFile: 'Upload File',
    selectTheme: 'Select Theme',
    resumeStepOne: 'Select Theme',
    resumeStepTwo: 'Upload or Edit Resume',
    resumeStepThree: 'Additional Customization',
    customization: 'Customized Info（Optional）',
    themeFlat: 'Flat (Default)',
    themeProfessional: 'Professional',
    submitButton: 'Submit',
    resultTitle: 'Resume Preview',
    returnToEdit: 'Return to Edit',
    downloadPDF: 'Download PDF',
    downloadWord: 'Download Word',
    pageNotFound: 'Page Not Found',
    pageNotFoundDescription: 'The page you are looking for does not exist.',
    backToHome: 'Back to Home',
    barProof: 'Proof',
    barHelp: 'Help Center',
    barSignin: 'Sign in',
    barSignup: 'Sign up',
    signIn: 'Sign in',
    signUp: 'Sign up'
  },
};

function App() {
  const [themeMode] = useState('dark');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'zh');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const theme = createAppTheme(themeMode);

  const toggleLanguage = () => {
    const newLanguage = language === 'zh' ? 'en' : 'zh';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* 导航栏 */}
        <CustomNavbar language={language} toggleLanguage={toggleLanguage} translations={translations[language]} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />

        {/* 给顶部留出空间，防止 Navbar 遮挡 */}
        <Box sx={{ mt: 15 }}>
          <Routes>
            <Route path="/" element={<Home translations={translations[language]} />} />
            <Route path="/editor" element={<ResumeEditor translations={translations[language]} />} />
            <Route path="/result" element={<ResumeResult translations={translations[language]} />} />
            <Route path="/bar" element={<CustomNavbar language={language} toggleLanguage={toggleLanguage}/>} />
            <Route path="/signin" element={<SignIn translations={translations[language]} setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/signup" element={<SignUp translations={translations[language]} setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/profile" element={<Profile translations={translations[language]} />} />
            <Route path="/vip" element={<Vip translations={translations[language]} />} />
            <Route path="/payment_options" element={<PaymentMethod translations={translations[language]} />} />
            <Route path="*" element={<NotFound translations={translations[language]} />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
