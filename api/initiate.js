import PaytmChecksum from 'paytmchecksum';

export default async function handler(req, res) {
  const { name, phone, email, amount } = req.body;
  const orderId = 'ORDER_' + Date.now();

  const mid = process.env.PAYTM_MID;
  const key = process.env.PAYTM_KEY;

  const params = {
    MID: mid,
    WEBSITE: 'WEBSTAGING',
    INDUSTRY_TYPE_ID: 'Retail',
    CHANNEL_ID: 'WEB',
    ORDER_ID: orderId,
    CUST_ID: phone,
    MOBILE_NO: phone,
    EMAIL: email,
    TXN_AMOUNT: amount,
    CALLBACK_URL: `${process.env.BASE_URL}/api/callback`
  };

  const checksum = await PaytmChecksum.generateSignature(params, key);

  const actionUrl = 'https://securegw-stage.paytm.in/order/process';
  let formFields = Object.keys(params).map(
    key => `<input type="hidden" name="${key}" value="${params[key]}" />`
  ).join('\n');

  res.send(`
    <html>
      <body onload="document.forms[0].submit()">
        <form method="post" action="${actionUrl}">
          ${formFields}
          <input type="hidden" name="CHECKSUMHASH" value="${checksum}" />
        </form>
      </body>
    </html>
  `);
}
