let merchantList = [
  {
    id: 1,
    order: 1,
    merchantName: '商户1',
    merchantNumber: 1111,
    contacts: '联系人1',
    mailbox: 'chenbao_200@163.com',
    telephone: '15266741680',
    effectiveDiscount: 'ewdwdv',
    registrationDate: '2021-12-2',
    state: 'effect',
    money: 111,
    islocking: 'unlock',
    comments: 2,
  },
  {
    id: 2,
    order: 2,
    merchantName: '商户2',
    merchantNumber: 2222,
    contacts: '联系人2',
    mailbox: 'chen_200@163.com',
    telephone: '15266741680',
    effectiveDiscount: 'ewdwdv',
    registrationDate: '2021-12-3',
    state: 'effect',
    money: 222,
    islocking: 'lock',
    comments: 1,
  },
  {
    id: 3,
    order: 3,
    merchantName: '商户3',
    merchantNumber: 1111,
    contacts: '联系人3',
    mailbox: 'chen_300@163.com',
    telephone: '15266741680',
    effectiveDiscount: 'ewdwdv',
    registrationDate: '2021-12-3',
    state: 'effect',
    money: 333,
    islocking: 'lock',
    comments: 1,
  },
  {
    id: 4,
    order: 4,
    merchantName: '商户4',
    merchantNumber: 4444,
    contacts: '联系人4',
    mailbox: 'chen_400@163.com',
    telephone: '15266741680',
    effectiveDiscount: 'ewdwdv',
    registrationDate: '2021-12-4',
    state: 'invalid',
    money: 444,
    islocking: 'unlock',
    comments: 2,
  },
  {
    id: 5,
    order: 5,
    merchantName: '商户5',
    merchantNumber: 5555,
    contacts: '联系人5',
    mailbox: 'chen_500@163.com',
    telephone: '15266741680',
    effectiveDiscount: 'ewdwdv',
    registrationDate: '2021-12-5',
    state: 'invalid',
    money: 555,
    islocking: 'unlock',
  },
  {
    id: 6,
    order: 6,
    merchantName: '商户6',
    merchantNumber: 6666,
    contacts: '联系人6',
    mailbox: 'chen_600@163.com',
    telephone: '15266741680',
    effectiveDiscount: 'ewdwdv',
    registrationDate: '2021-12-6',
    state: 'invalid',
    money: 666,
    islocking: true,
  },
];

// 查询用户
const getMerchantList = (req: any, res: any) => {
  const { merchantName } = req.body.body;

  let filterList =
    !merchantName || merchantName === ''
      ? merchantList
      : merchantList.filter((item: { merchantName: string }) => {
          return item.merchantName.indexOf(merchantName) !== -1;
        });

  res.send({
    data: filterList,
    invalidRule: 100,
    page: 1,
    success: true,
    total: filterList.length,
  });
};

export default {
  'POST /api/merchantList': getMerchantList,
};
