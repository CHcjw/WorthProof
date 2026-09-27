<div align="center">
  <img src="web/public/brand/logo-main.png" alt="WorthProof 见值" width="680" />

  <h1>WorthProof 见值</h1>

  <p><strong>买之前，先看清价值。</strong></p>

  <p>
    面向真实购物决策的 AI 助手：识别同款、核算到手价、分析风险、给出个性化建议，
    并持续管理降价、保价、退货和保修期限。
  </p>

  <p>
    <a href="https://github.com/CHcjw/WorthProof">GitHub 仓库</a>
    ·
    <a href="extension/README.md">浏览器扩展</a>
    ·
    <a href="docs/WorthProof_PRODUCTION_RELEASE.md">生产部署</a>
  </p>

  <img src="https://img.shields.io/badge/Python-3.11%2B-3776AB?logo=python&logoColor=white" alt="Python 3.11+" />
  <img src="https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
</div>

## 项目简介

传统比价工具通常只回答“哪里更便宜”。WorthProof 更关注一次购买中真正影响结果的事实：

- 不同平台的候选商品是不是同一个 SKU。
- 容量、接口、版本、套装、地区和成色是否一致。
- 优惠券、满减、会员价、补贴、运费和赠品价值叠加后究竟要付多少钱。
- 低价是否伴随店铺、规格、售后、退货或保修风险。
- 当前商品是否适合用户的预算、设备、场景和偏好。
- 下单后是否还能追踪降价、保价、退货和保修期限。

WorthProof 将这些信息整理成可确认、可追溯、可持续管理的购买决策流程。

## 核心流程

```text
需求 / 商品链接 / 截图 / 浏览器采集
              ↓
      商品识别与人工确认
              ↓
        SKU 与规格匹配
              ↓
        真实到手价计算
              ↓
       评论证据与风险分析
              ↓
        个性化购买建议
              ↓
      目标价格与售后管理
```

## 功能特性

| 模块 | 能力 |
| --- | --- |
| 智能发现 | 支持商品搜索、自然语言购买需求、品类入口和历史浏览 |
| 商品识别 | 支持商品链接、截图、型号和浏览器扩展采集 |
| SKU 对比 | 区分配置、代次、容量、接口、地区、套装和新旧状态 |
| 到手价计算 | 拆解店铺券、平台优惠、会员价、补贴、运费和赠品价值 |
| 购买建议 | 结合预算、用途、已有设备、偏好和风险承受度进行分析 |
| 证据分析 | 关联来源、采集时间、规格、评论证据和不确定性 |
| 价格监控 | 设置目标价、监控降价、记录历史价格并发送提醒 |
| 买后管理 | 管理订单、发票、保价、退货、保修、耗材和续费期限 |
| 账户体系 | 支持登录、邮箱验证、密码重置、MFA、数据导出和注销 |
| 家庭协作 | 管理家庭设备、共享购买记录和售后提醒 |
| 管理后台 | 管理用户、商品、SKU、内容、来源、Prompt、Trace 和监控任务 |
| 浏览器扩展 | 只读取用户当前打开商品页中已经可见的信息 |

## 设计原则

### 事实优先

价格、时间、规格和硬约束由确定性代码处理，模型负责理解、归纳和解释。无法确认的信息会被标记为待确认，不会被伪装成可靠结论。

### 用户确认

识别结果进入比较前需要用户确认。登录价、会员价、动态页面信息和个性化优惠不会在未经确认的情况下写入可信价格历史。

### 来源可追溯

商品结论保留来源链接、采集时间、地区、SKU、会员条件和确认状态，方便回到原页面核验。

### 数据边界清晰

没有正式平台授权时，系统不会用虚构商品、价格、评论或优惠填充结果。页面被登录、验证码或动态渲染阻挡时，会明确提示改用浏览器采集、截图识别或手动确认。

## 技术架构

```text
React / TypeScript / Vite / PWA
                │
                ▼
          FastAPI API
    auth · shopping · reports · admin
                │
                ▼
   LangGraph 工作流 + 事实校验层
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
 PostgreSQL   Redis    RabbitMQ
  持久化数据  缓存限流   异步任务
                │
                ▼
       Monitor Worker
                │
                ▼
      S3 / Cloudflare R2
```

主要技术：

- 前端：React 18、TypeScript、Vite、Lucide、Tesseract.js
- 后端：Python 3.11+、FastAPI、Pydantic、LangGraph、LangChain
- 数据与任务：PostgreSQL、Redis、RabbitMQ
- 文件存储：S3 兼容对象存储或 Cloudflare R2
- 测试：Pytest、Playwright、Ruff
- 部署：Docker Compose、Vercel、Cloudflare Worker

## 快速开始

### 环境要求

- Python 3.11+
- Node.js 20+
- npm

### Windows

```powershell
git clone https://github.com/CHcjw/WorthProof.git
cd WorthProof

python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -e ".[dev]"

Copy-Item .env.example .env
cd web
npm install
npm run build
cd ..

python -m uvicorn app.main:app --reload --port 8100
```

也可以直接运行项目自带的安装和启动脚本：

```powershell
.\setup-and-start.ps1
```

### macOS / Linux

```bash
git clone https://github.com/CHcjw/WorthProof.git
cd WorthProof

python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -e ".[dev]"

cp .env.example .env
cd web
npm install
npm run build
cd ..

python -m uvicorn app.main:app --reload --port 8100
```

启动后打开：

```text
http://127.0.0.1:8100
```

FastAPI 会同时提供 API 和构建后的 Web 页面。

## 前端开发模式

先启动后端，再在另一个终端运行：

```bash
cd web
npm run dev
```

前端开发地址：

```text
http://127.0.0.1:5173
```

Vite 会将本地 `/api` 和 `/health` 请求代理到后端服务。

## 环境变量

本地开发：

```bash
cp .env.example .env
```

Windows PowerShell：

```powershell
Copy-Item .env.example .env
```

最小的模型配置示例：

```env
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
DEV_AGENT_LLM_MODEL=your_text_model
WORTHPROOF_VISION_MODEL=your_vision_model
```

智能对比支持用户在账户页面配置自己的 OpenAI 兼容文本和视觉服务。生产部署还需要配置数据库、Redis、RabbitMQ、对象存储、JWT、管理员邮箱和 MFA 加密密钥，完整示例见：

- `.env.production.example`
- `.env.worker.example`
- [生产部署文档](docs/WorthProof_PRODUCTION_RELEASE.md)

不要将真实密钥提交到 Git。

## Docker 部署

```bash
cp .env.production.example .env.production
docker compose --env-file .env.production -f docker-compose.production.yml up -d --build
```

生产环境包含：

- API 服务
- 监控 Worker
- PostgreSQL
- Redis
- RabbitMQ
- S3 兼容对象存储

数据库、缓存、消息队列和对象存储端口应保持私有，只向公网暴露反向代理的 HTTP/HTTPS 端口。

## 浏览器扩展

浏览器扩展支持在淘宝、天猫、京东和拼多多商品详情页中采集用户当前可见的信息，包括：

- 商品标题、图片和来源链接
- 当前选择的 SKU 与规格
- 页面价格、会员价、优惠券和满减
- 店铺、地区和会员条件
- 采集时间与页面证据

采集后需要在扩展内确认，并在 Web 端再次确认后才会进入可信价格历史。扩展不会遍历搜索结果、绕过登录或验证码，也不会在后台进行大规模爬取。

安装与配置方法见 [extension/README.md](extension/README.md)。

## 测试

后端：

```bash
pytest
ruff check app tests
```

前端：

```bash
cd web
npm run build
npm run test:e2e
npm run test:collector
```

重点测试范围包括账户权限、商品标准化、SKU 匹配、价格计算、购物工作流、截图 OCR、浏览器采集、报告、价格监控、购买管理和消费者页面导航。

## 项目结构

```text
WorthProof/
├── app/                         # FastAPI 后端、购物工作流和业务模块
├── api/                         # 云函数入口
├── web/                         # React Web/PWA 前端
├── extension/                   # Manifest V3 浏览器扩展
├── cloudflare/                  # Cloudflare Monitor Worker
├── tests/                       # Python 测试
├── docs/                        # 功能和部署文档
├── ops/                         # Prometheus 和运维配置
├── docker-compose.production.yml
├── .env.example
└── pyproject.toml
```

## 相关文档

- [生产部署说明](docs/WorthProof_PRODUCTION_RELEASE.md)
- [功能实现记录](docs/WorthProof_IMPLEMENTATION_LOG.md)
- [浏览器扩展说明](extension/README.md)
- [业务场景](docs/BUSINESS_SCENARIOS.md)

## 安全提醒

- 不要提交 `.env`、真实 API Key、数据库密码或对象存储密钥。
- 生产环境必须使用强随机密钥，并配置 HTTPS、允许域名和跨域来源。
- 商品价格、优惠和评论结论仅供决策参考，下单前请回到原平台核验。
- WorthProof 不自动下单、支付、退款，也不会代替用户执行未经确认的外部操作。
