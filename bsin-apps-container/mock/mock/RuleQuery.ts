let ruleQueryList = [
  {
    id: 1,
    order: 1,
    behaviorNumber: '3232',
    behaviorName: '行为1',
    incentiveScore: 3,
    effectiveDate: '2021-12-2',
    expirationDate: '2021-12-12',
    state: '生效',
    describe: '行为描述',
  },
  {
    id: 2,
    order: 2,
    behaviorNumber: '12123',
    behaviorName: '行为2',
    incentiveScore: 3,
    effectiveDate: '2021-12-2',
    expirationDate: '2021-12-12',
    state: '生效',
    describe: '行为描述2',
  },
  {
    id: 3,
    order: 3,
    behaviorNumber: '3232',
    behaviorName: '行为3',
    incentiveScore: 20,
    effectiveDate: '2021-12-2',
    expirationDate: '2021-12-12',
    state: '生效',
    describe: '行为描述3',
  },
  {
    id: 4,
    order: 4,
    behaviorNumber: '3232',
    behaviorName: '行为4',
    incentiveScore: 30,
    effectiveDate: '2021-12-2',
    expirationDate: '2021-12-12',
    state: '生效',
    describe: '行为描述4',
  },
];

// 查询用户
const getRuleQueryList = (req: any, res: any) => {
  const { behaviorNumber } = req.body.body;

  let filterList =
    !behaviorNumber || behaviorNumber === ''
      ? ruleQueryList
      : ruleQueryList.filter((item: { behaviorNumber: string }) => {
          return item.behaviorNumber.indexOf(behaviorNumber) !== -1;
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
  'POST /api/ruleQueryList': getRuleQueryList,
};
