# umi project

```text
|-- bsin-apps-container
    |-- package.json              # 项目配置文件
    |-- tsconfig.json             #指定了编译项目所需的根文件和编译器选项。
    |-- config                    # 配置文件
    |-- mock                      # 存储 mock 文件
    |-- public                    # 此目录下所有文件会被 copy 到输出路径
    |-- src
        |-- app.ts                # 运行时配置文件
        |-- layouts               # 约定式路由时的全局布局文件
        |-- models                # dva model
        |-- pages                 # 所有路由组件存放在这里。
        |-- services              # 请求
        |-- utils                 # 工具库
```

## Getting Started

Install dependencies,

```bash
yarn
```

Start the dev server,

```bash
yarn start
```
