// Cloud function: pay
// Handles WeChat Pay unified order.
// Requires a merchant account — currently returns an error stub.

const cloud = require('wx-server-sdk');
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const PLAN_CONFIG = {
  monthly: { priceCent: 990, days: 30, label: '包月会员' },
  yearly: { priceCent: 6800, days: 365, label: '包年会员' },
};

exports.main = async (event) => {
  const { OPENID } = cloud.getWXContext();
  const { plan } = event;

  if (!PLAN_CONFIG[plan]) {
    return { success: false, error: 'invalid plan' };
  }

  const config = PLAN_CONFIG[plan];
  const outTradeNo = `order_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  // ── TODO: Uncomment after merchant account is ready ──────────
  //
  // const res = await cloud.cloudPay.unifiedOrder({
  //   body: config.label,
  //   outTradeNo,
  //   spbillCreateIp: '127.0.0.1',
  //   subMchId: 'YOUR_MERCHANT_ID',
  //   totalFee: config.priceCent,
  //   envId: cloud.DYNAMIC_CURRENT_ENV,
  //   functionName: 'pay_callback',
  // });
  //
  // // Save order record
  // await db.collection('orders').add({
  //   data: {
  //     openId: OPENID,
  //     plan,
  //     outTradeNo,
  //     amount: config.priceCent,
  //     status: 'pending',
  //     createdAt: db.serverDate(),
  //   },
  // });
  //
  // return { success: true, payment: res.payment, orderId: outTradeNo };
  // ─────────────────────────────────────────────────────────────

  return {
    success: false,
    error: 'Payment not configured — merchant account required.',
  };
};
