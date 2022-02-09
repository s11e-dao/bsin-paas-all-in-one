// 声明各变量的基本数据类型
interface userListType {
  id: string;
  name: string;
  sex: string;
  age: string;
  address: string;
}

// 定义用户数据
let userList: userListType[] = [
  {
    id: '1',
    name: '张三',
    sex: '男',
    age: '24',
    address: '湖南',
  },
  {
    id: '2',
    name: '李四',
    sex: '男',
    age: '24',
    address: '湖南',
  },
  {
    id: '3',
    name: '王五',
    sex: '男',
    age: '24',
    address: '深圳',
  },
  {
    id: '4',
    name: '张三',
    sex: '男',
    age: '24',
    address: '广西',
  },
  {
    id: '5',
    name: '张三',
    sex: '男',
    age: '24',
    address: '广东',
  },
  {
    id: '6',
    name: '张三',
    sex: '男',
    age: '24',
    address: '湖南',
  },
  {
    id: '7',
    name: '张三',
    sex: '男',
    age: '24',
    address: '湖南',
  },
  {
    id: '8',
    name: '张三',
    sex: '男',
    age: '24',
    address: '湖南',
  },
  {
    id: '9',
    name: '张三',
    sex: '男',
    age: '24',
    address: '湖南',
  },
  {
    id: '10',
    name: '张三',
    sex: '男',
    age: '24',
    address: '湖南',
  },
  {
    id: '11',
    name: '张三',
    sex: '男',
    age: '24',
    address: '湖南',
  },
];

// 查询用户
const getUserList = (req: any, res: any) => {
  // 获取传递过来的参数值
  const { name } = req.query;

  // 过滤返回符合条件的数据
  let filterList =
    !name || name === ''
      ? userList
      : userList.filter((item: { name: string }) => {
          return item.name.indexOf(name) !== -1;
        });

  // res.send({
  //   code: 0,
  //   data: filterList,
  // });

  res.send({
    body: {
      data: filterList,
    },
    sysHead: {
      retCd: '000000',
      retInf: '查询成功',
    },
  });
};

// 用户删除
const userDelete = (req: any, res: any) => {
  const { id } = req.query;

  // 查看是否存在数组中
  let index = userList.findIndex((item: any) => item.id == id);

  // 更新数据
  userList.splice(index, 1);

  res.send({
    body: {},
    sysHead: {
      retCd: '000000',
      retInf: '删除成功',
    },
  });
};

// 用户新增
const userListAdd = (req: any, res: any) => {
  const { name, age, sex, address } = req.query;

  userList.unshift({
    id: (userList.length + 1).toString(),
    name,
    age,
    sex,
    address,
  });

  res.send({
    body: {},
    sysHead: {
      retCd: '000000',
      retInf: '用户新增成功',
    },
  });
};

// 用户修改
const userListUpdate = (req: any, res: any) => {
  const { id, name, age, sex, address } = req.query;
  // 查看数据的
  let index = userList.findIndex((item: any) => item.id == id);
  userList[index] = { id, name, age, sex, address };

  res.send({
    body: {},
    sysHead: {
      retCd: '000000',
      retInf: '用户修改成功',
    },
  });
};

export default {
  'POST /api/getUserList': getUserList,
  'POST /api/user/userDelete': userDelete,
  'POST /api/user/userListAdd': userListAdd,
  'POST /api/user/userListUpdate': userListUpdate,
};
