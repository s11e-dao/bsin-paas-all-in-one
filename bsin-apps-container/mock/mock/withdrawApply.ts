// 提现交易记录列表
let withdrawRecordList = [
  {
    merchant: '商家1',
    MCHID: 'sdfsa1564',
    withdrawAmount: 100.0,
    withdrawCurrency: 'PDB',
    withdrawWay: '法币账户',
    handlingCharge: 10.0,
    handlingChargeCurrency: 'PDB',
    amountReceived: 90.0,
    amountReceivedCurrency: 'PDB',
    exchangeRate: 1.0,
    bothCurrencies: 'PDB/PDB',
    serialNumber: '1247123',
    created_at: '2021-12-1',
    result: 'Success',
    approvalStatus: '已批准',
    approver: 'A',
    approval_at: '2021/12/2',
    approvalNumber: '3412341',
    isRefund: 0,
  },
  {
    merchant: '商家2',
    MCHID: 'sdfsa1564',
    withdrawAmount: 100.0,
    withdrawCurrency: 'PDB',
    withdrawWay: '法币账户',
    handlingCharge: 10.0,
    handlingChargeCurrency: 'PDB',
    amountReceived: 90.0,
    amountReceivedCurrency: 'PDB',
    exchangeRate: 1.0,
    bothCurrencies: 'PDB/PDB',
    serialNumber: '235244243',
    created_at: '2021-12-1',
    result: 'Success',
    approvalStatus: '已批准',
    approver: 'A',
    approval_at: '2021-12-1',
    approvalNumber: '14231413',
    isRefund: 0,
  },
  {
    merchant: '商家3',
    MCHID: 'sdfsa1564',
    withdrawAmount: 100.0,
    withdrawCurrency: 'PDB',
    withdrawWay: '法币账户',
    handlingCharge: 10.0,
    handlingChargeCurrency: 'PDB',
    amountReceived: 90,
    amountReceivedCurrency: 'PDB',
    exchangeRate: 1.0,
    bothCurrencies: 'PDB/PDB',
    serialNumber: '124134124',
    created_at: '2021-12-1',
    result: 'Failure',
    approvalStatus: '已批准',
    approver: 'A',
    approval_at: '2021-12-1',
    approvalNumber: '151324123124',
    isRefund: 1,
  },
  {
    merchant: '商家4',
    MCHID: 'sdfsa1564',
    withdrawAmount: 100.0,
    withdrawCurrency: 'PDB',
    withdrawWay: '法币账户',
    handlingCharge: 10.0,
    handlingChargeCurrency: 'PDB',
    amountReceived: 90.0,
    amountReceivedCurrency: 'PDB',
    exchangeRate: 1.0,
    bothCurrencies: 'PDB/PDB',
    serialNumber: '431224132',
    created_at: '2021-12-1',
    result: 'Success',
    approvalStatus: '已批准',
    approver: 'A',
    approval_at: '2021-12-1',
    approvalNumber: '3412312514',
    isRefund: 0,
  },
  {
    merchant: '商家5',
    MCHID: 'sdfsa1564',
    withdrawAmount: 100.0,
    withdrawCurrency: 'PDB',
    withdrawWay: '法币账户',
    handlingCharge: 10.0,
    handlingChargeCurrency: 'PDB',
    amountReceived: 90,
    amountReceivedCurrency: 'PDB',
    exchangeRate: 1.0,
    bothCurrencies: 'PDB/PDB',
    serialNumber: '124123123',
    created_at: '2021-12-1',
    result: 'Processing',
    approvalStatus: '已批准',
    approver: 'A',
    approval_at: '2021-12-1',
    approvalNumber: '35243125234',
    isRefund: 1,
  },
  {
    merchant: '商家6',
    MCHID: 'sdfsa1564',
    withdrawAmount: 100.0,
    withdrawCurrency: 'PDB',
    withdrawWay: '法币账户',
    handlingCharge: 10.0,
    handlingChargeCurrency: 'PDB',
    amountReceived: 90.0,
    amountReceivedCurrency: 'PDB',
    exchangeRate: 1.0,
    bothCurrencies: 'PDB/PDB',
    serialNumber: '1241231421',
    created_at: '2021-12-1',
    result: 'Success',
    approvalStatus: '已批准',
    approver: 'A',
    approval_at: '2021-12-1',
    approvalNumber: 'qwrqerqeqtqr',
    isRefund: 0,
  },
  {
    merchant: '商家7',
    MCHID: 'sdfsa1564',
    withdrawAmount: 100.0,
    withdrawCurrency: 'PDB',
    withdrawWay: '法币账户',
    handlingCharge: 10.0,
    handlingChargeCurrency: 'PDB',
    amountReceived: 90.0,
    amountReceivedCurrency: 'PDB',
    exchangeRate: 1.0,
    bothCurrencies: 'PDB/PDB',
    serialNumber: '',
    created_at: '2021-12-1',
    result: '',
    approvalStatus: '未处理',
    approver: '',
    approval_at: '',
    approvalNumber: '1241432112413',
    isRefund: 1,
  },
  {
    merchant: '商家7',
    MCHID: 'sdfsa1564',
    withdrawAmount: 100.0,
    withdrawCurrency: 'PDB',
    withdrawWay: '法币账户',
    handlingCharge: 10.0,
    handlingChargeCurrency: 'PDB',
    amountReceived: 90.0,
    amountReceivedCurrency: 'PDB',
    exchangeRate: 1.0,
    bothCurrencies: 'PDB/PDB',
    serialNumber: '',
    created_at: '2021-12-1',
    result: '',
    approvalStatus: '拒绝',
    approver: 'A',
    approval_at: '2021-12-1',
    approvalNumber: '12435234',
    isRefund: 1,
  },
];

const getWithdrawApplyList = (req: any, res: any) => {
  const body = req.body.body;
  let list = body.serialNumber
    ? withdrawRecordList.filter(
        (item) => item.serialNumber === body.serialNumber,
      )
    : withdrawRecordList;

  res.send({
    data: list,
    pending: 2,
    page: 1,
    success: true,
    total: list.length,
  });
};

export default {
  'POST /api/withdrawApplyList': getWithdrawApplyList,
};
