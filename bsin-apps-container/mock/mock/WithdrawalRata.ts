let withdrawalRataList = [
  {
    id: 1,
    order: 1,
    configurationDate: '2021-12-1',
    serviceChargeNo: '111',
    effectiveDate: '11/9',
    expirationDate: '2021-12-9',
    state: '生效',
    rate: '12',
    chargeAmount: '50',
    maxChargeAmount: '100',
  },
  {
    id: 2,
    order: 2,
    configurationDate: '12/1',
    serviceChargeNo: '222',
    effectiveDate: '11/9',
    expirationDate: '12/9',
    state: '失效',
    rate: '12',
    chargeAmount: '30',
    maxChargeAmount: '100',
  },
  {
    id: 3,
    order: 3,
    configurationDate: '12/1',
    serviceChargeNo: '333',
    effectiveDate: '11/9',
    expirationDate: '12/9',
    state: '生效',
    rate: '12',
    chargeAmount: '20',
    maxChargeAmount: '100',
  },
  {
    id: 4,
    order: 4,
    configurationDate: '12/1',
    serviceChargeNo: '333',
    effectiveDate: '11/9',
    expirationDate: '12/9',
    state: '生效',
    rate: '12',
    chargeAmount: '20',
    maxChargeAmount: '100',
  },
  {
    id: 5,
    order: 5,
    configurationDate: '12/1',
    serviceChargeNo: '333',
    effectiveDate: '11/9',
    expirationDate: '12/9',
    state: '生效',
    rate: '12',
    chargeAmount: '20',
    maxChargeAmount: '100',
  },
  {
    id: 6,
    order: 6,
    configurationDate: '12/1',
    serviceChargeNo: '333',
    effectiveDate: '11/9',
    expirationDate: '12/9',
    state: '生效',
    rate: '12',
    chargeAmount: '20',
    maxChargeAmount: '100',
  },
];

// 查询用户
const getWithdrawalRataList = (req: any, res: any) => {
  const { serviceChargeNo } = req.body.body;

  let filterList =
    !serviceChargeNo || serviceChargeNo === ''
      ? withdrawalRataList
      : withdrawalRataList.filter((item: { serviceChargeNo: string }) => {
          return item.serviceChargeNo.indexOf(serviceChargeNo) !== -1;
        });

  res.send({
    data: filterList,
    // pageSize: 3,
    // success: true,
    // total: list.length
  });
};

export default {
  'POST /api/withdrawalRataList': getWithdrawalRataList,
};
