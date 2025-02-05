import axios from 'axios';
import crypto from 'crypto';
import { env } from '~/config/env';
import { OrderController } from './OrderController';

const handleTransactionMomo = async (req, res) => {
  try {
    const accessKey = env.MOMO_ACCESS_KEY;
    const secretKey = env.MOMO_SECRET_KEY;
    const orderInfo = 'pay with MoMo';
    const partnerCode = 'MOMO';
    const redirectUrl = env.FE_URL + '/orders';
    const ipnUrl = env.BE_URL + '/api/payments/momo-callback'; // callback url
    const requestType = "payWithMethod";
    const amount = '50000';
    const orderId = partnerCode + new Date().getTime();
    const requestId = orderId;
    const extraData = '';
    const orderGroupId = '';
    const autoCapture = true;
    const lang = 'vi';

    const rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //signature
    const signature = crypto.createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature
    });

    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/create',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
      data: requestBody
    }

    try {
      const result = await axios(options);

      return res.status(200).json(result.data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

const callbackMomo = async (req, res) => {
  try {
    // update order status
    console.log("momo callback: ", req.body);
    
    return res.status(200).json(req.body);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};

const handleTransactionCash = async (req, res) => {
  await OrderController.storeOrder(req, res);
};

export const PaymentController = {
  handleTransactionMomo,
  callbackMomo,
  handleTransactionCash
};
