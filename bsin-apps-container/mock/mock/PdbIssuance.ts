let pdbIssuanceList = [
  {
    id: 1,
    order: 1,
    configurationDate: '2021-12-2',
    configurationNo: '1231231',
    effectiveDate: '2021-12-2',
    expirationDate: '2021-12-12',
    state: '生效',
    pdbAmount: 10,
    remarks: '...',
  },
  {
    id: 2,
    order: 2,
    configurationDate: '2021-11-11',
    configurationNo: '123224',
    effectiveDate: '2021-11-1',
    expirationDate: '2021-12-12',
    state: '生效',
    pdbAmount: 10,
    remarks: '...',
  },
  {
    id: 3,
    order: 3,
    configurationDate: '2021-12-2',
    configurationNo: '1231231',
    effectiveDate: '2021-12-2',
    expirationDate: '2021-12-12',
    state: '生效',
    pdbAmount: 20,
    remarks: '...',
  },
  {
    id: 4,
    order: 4,
    configurationDate: '2021-12-2',
    configurationNo: '1231231',
    effectiveDate: '2021-1-2',
    expirationDate: '2021-12-12',
    state: '失效',
    pdbAmount: 100,
    remarks: '...',
  },
];

// 查询用户
const getpdbIssuanceList = (req: any, res: any) => {
  const { configurationNo } = req.body.body;

  let filterList =
    !configurationNo || configurationNo === ''
      ? pdbIssuanceList
      : pdbIssuanceList.filter((item: { configurationNo: string }) => {
          return item.configurationNo.indexOf(configurationNo) !== -1;
        });

  res.send({
    data: filterList,
    // pageSize: 3,
    // success: true,
    // total: list.length
  });
};

export default {
  'POST /api/pdbIssuanceList': getpdbIssuanceList,
};
