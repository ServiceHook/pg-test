const PaytmChecksum = require("paytmchecksum");

module.exports = async (req, res) => {
  const { name, email, phone, amount } = req.body;
  const orderId = "ORDERID_" + new Date().getTime();

  const params = {
    MID: process.env.PAYTM_MID,
    WEBSITE: "WEBSTAGING",
    INDUSTRY_TYPE_ID: "Retail",
    CHANNEL_ID: "WEB",
    ORDER_ID: orderId,
    CUST_ID: email || phone,
    TXN_AMOUNT: amount,
    CALLBACK_URL: `${process.env.BASE_URL}/api/callback`,
    MOBILE_NO: phone,
    EMAIL: email
  };

  const checksum = await PaytmChecksum.generateSignature(params, process.env.PAYTM_KEY);
  const body = { ...params, CHECKSUMHASH: checksum };

  res.json({ success: true, body });
};
