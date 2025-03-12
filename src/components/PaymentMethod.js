import React, { useState } from "react";
import { Container, Typography, Card, CardContent, Grid, TextField, Button, Box, CircularProgress } from "@mui/material";
import AlipayIcon from "@mui/icons-material/AccountBalanceWallet";
import WeChatIcon from "@mui/icons-material/Chat";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const PaymentMethod = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { plan } = location.state || {}; // 从上个页面获取选中的套餐

  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [qrCode, setQrCode] = useState(""); // 存储二维码链接
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardholder: "",
    number: "",
    expiry: "",
    cvc: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    street: "",
    phone: "",
    email: "",
  });

  // 🔥 固定二维码用于展示
  const fakeQrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com/pay";

  if (!plan) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h5" color="error">
          请选择一个充值套餐
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={() => navigate("/vip")}>
          返回会员中心
        </Button>
      </Container>
    );
  }

  // **🔥 处理支付**
  const handlePayment = async (method) => {
    setLoading(true);
    setSelectedMethod(method);
    
    // 只有支付宝和微信才需要二维码
    if (method === "alipay" || method === "wechat") {
      setQrCode(fakeQrCodeUrl); // 先用固定二维码模拟
    } else {
      setQrCode(""); // 避免信用卡时还显示二维码
    }
  
    setLoading(false);
  };
  

  // **🔥 确认信用卡支付**
  const handlePaymentConfirm = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post("http://localhost:8000/pay_vip/", {
        plan_id: plan.id,
        amount: plan.price,
        method: "credit_card",
        card_info: creditCardInfo,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        navigate("/payment-success", { state: { plan, method: "credit_card" } });
      } else {
        navigate("/payment-failed");
      }
    } catch (error) {
      navigate("/payment-failed");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        选择支付方式
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* 🔥 支付宝 */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ textAlign: "center", cursor: "pointer", borderRadius: 3, boxShadow: 5, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}
            onClick={() => handlePayment("alipay")}
          >
            <CardContent>
              <AlipayIcon sx={{ fontSize: 50, color: "#1677FF" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>支付宝</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 🔥 微信支付 */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ textAlign: "center", cursor: "pointer", borderRadius: 3, boxShadow: 5, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}
            onClick={() => handlePayment("wechat")}
          >
            <CardContent>
              <WeChatIcon sx={{ fontSize: 50, color: "#07C160" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>微信支付</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* 🔥 信用卡支付 */}
        <Grid item xs={12} sm={4}>
          <Card
            sx={{ textAlign: "center", cursor: "pointer", borderRadius: 3, boxShadow: 5, transition: "0.3s", "&:hover": { transform: "scale(1.05)" } }}
            onClick={() => handlePayment("credit_card")}
          >
            <CardContent>
              <CreditCardIcon sx={{ fontSize: 50, color: "#FF9800" }} />
              <Typography variant="h6" sx={{ mt: 1 }}>信用卡</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 🔥 生成的二维码 */}
      {qrCode && (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h6">请使用 {selectedMethod === "alipay" ? "支付宝" : "微信"} 扫描二维码</Typography>
          <img src={qrCode} alt="支付二维码" style={{ width: 200, height: 200, marginTop: 10 }} />
        </Box>
      )}

      {/* 🔥 信用卡支付表单 */}
      {selectedMethod === "credit_card" && (
        <Box sx={{ mt: 5 }}>
          <Typography variant="h6" align="center">请输入信用卡信息</Typography>
          <TextField label="持卡人姓名" fullWidth margin="normal" value={creditCardInfo.cardholder} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cardholder: e.target.value })} />
          <TextField label="卡号" fullWidth margin="normal" value={creditCardInfo.number} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, number: e.target.value })} />
          <TextField label="到期日期 (MM/YY)" fullWidth margin="normal" value={creditCardInfo.expiry} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, expiry: e.target.value })} />
          <TextField label="CVC" fullWidth margin="normal" type="password" value={creditCardInfo.cvc} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, cvc: e.target.value })} />
          <TextField label="街道地址" fullWidth margin="normal" value={creditCardInfo.street} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, street: e.target.value })} />
          <TextField label="邮政编码" fullWidth margin="normal" value={creditCardInfo.zip} onChange={(e) => setCreditCardInfo({ ...creditCardInfo, zip: e.target.value })} />
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button variant="contained" color="primary" onClick={handlePaymentConfirm}>
              确认支付
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default PaymentMethod;
