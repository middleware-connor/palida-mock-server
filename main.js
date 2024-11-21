const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

// Sample data
const storeId = "10001000190197";
const tables = [
  { id: "1__1___", name: "1F-1", floor_code: "1", updated_time: "2024-01-04T10:36:57.947+09:00" },
  { id: "1__2___", name: "1F-2", floor_code: "1", updated_time: "2024-01-04T10:36:57.950+09:00" },
  { id: "1__3___", name: "1F-3", floor_code: "1", updated_time: "2024-01-09T09:24:59.210+09:00" },
  { id: "1__4___", name: "1F-4", floor_code: "1", updated_time: "2024-01-09T09:24:59.210+09:00" },
  { id: "1__5___", name: "1F-5", floor_code: "1", updated_time: "2024-01-09T09:24:59.210+09:00" },
  { id: "2__1___", name: "2F-1", floor_code: "2", updated_time: "2024-01-09T09:24:59.210+09:00" },
  { id: "2__2___", name: "2F-2", floor_code: "2", updated_time: "2024-01-09T09:24:59.210+09:00" },
];
const tableDetails = { id: "1__3___", name: "1F-3", floor_code: "1", updated_time: "2024-01-04T10:36:58.023+09:00" };
const store = {
  id: storeId,
  name: "테스트점",
  sales_date: "20240202",
  biz_no: "4418700221",
  pos_version: "1.100.100.105"
};
const orders = [
  {
    id: "202402021____",
    table_id: "1__1___",
    table_name: "1F-1",
    sales_date: "20240202",
    created_time: "2024-02-02T08:09:36.000+09:00",
    updated_time: "2024-02-02T08:09:36.000+09:00",
    pos_order_guest: [
      { type: "여자", qty: 1 },
      { type: "남자", qty: 1 }
    ],
    pos_order_goods: [
      {
        goods_id: "10000004",
        name: "설성한우 1++등급 등심 구이용",
        qty: 2,
        price: 13900,
        amount: 27800,
        discounted_amount: 26800,
        vat: 0,
        created_time: "2024-02-02T08:09:36.000+09:00",
        pos_order_goods_option: []
      }
    ]
  },
  {
    id: "202402022____",
    table_id: "1__2___",
    table_name: "1F-2",
    sales_date: "20240202",
    created_time: "2024-02-02T10:58:20.000+09:00",
    updated_time: "2024-02-02T10:57:42.000+09:00",
    pos_order_guest: [{ type: "여자", qty: 2 }],
    pos_order_goods: [
      {
        goods_id: "10001511",
        name: "한우 우족탕 900g",
        qty: 1,
        price: 18000,
        amount: 18000,
        discounted_amount: 18000,
        vat: 1636,
        created_time: "2024-02-02T10:57:42.000+09:00",
        pos_order_goods_option: []
      }
    ]
  },
  {
    id: "202402023____",
    table_id: "1__3___",
    table_name: "1F-3",
    sales_date: "20240202",
    created_time: "2024-02-02T10:58:20.000+09:00",
    updated_time: "2024-02-02T10:57:42.000+09:00",
    pos_order_guest: [{ type: "여자", qty: 2 }],
    pos_order_goods: [
      {
        goods_id: "10001502",
        name: "한우 고기 곰탕 500g(S)",
        qty: 10,
        price: 18000,
        amount: 180000,
        discounted_amount: 180000, 
        vat: 1636,
        created_time: "2024-02-02T10:57:42.000+09:00",
        pos_order_goods_option: []
      }
    ]
  },
  {
    id: "202402024____",
    table_id: "2__2___",
    table_name: "2F-2",
    sales_date: "20240202",
    created_time: "2024-02-02T10:58:20.000+09:00",
    updated_time: "2024-02-02T10:57:42.000+09:00",
    pos_order_guest: [{ type: "여자", qty: 2 }],
    pos_order_goods: [
      {
        goods_id: "10001502",
        name: "한우 고기 곰탕 500g(S)",
        qty: 10,
        price: 18000,
        amount: 180000,
        discounted_amount: 180000, 
        vat: 1636,
        created_time: "2024-02-02T10:57:42.000+09:00",
        pos_order_goods_option: []
      }
    ]
  },
];
const goods = [
  { id: "10000004", type: "1", name: "설성한우 1++등급 등심 구이용", price: 13900, relations: [], updated_time: "2023-12-26T11:34:38.997+09:00" },
  { id: "10001511", type: "1", name: "한우 우족탕 900g", price: 18000, relations: [], updated_time: "2023-12-26T11:34:39.003+09:00" },
  { id: "10001502", type: "1", name: "한우 고기 곰탕 500g(S)", price: 12000, relations: [], updated_time: "2023-12-26T11:34:39.003+09:00" },
  { id: "OPT0203", type: "1", name: "고명 옵션", price: 0, relations: [{path: "10001502/OPT0203"}], updated_time: "2023-12-26T11:34:39.003+09:00" },
  { id: "OPT20101", type: "1", name: "사태 추가", price: 500, relations: [{path: "10001502/OPT0203/OPT20101"}], updated_time: "2023-12-26T11:34:39.003+09:00" },
  { id: "12000645", type: "1", name: "공깃밥 추가", price: 1000, relations: [{path: "10001502/12000645"}], updated_time: "2023-12-26T11:34:39.003+09:00" },
];
const goodGroups = [
  { id: "5", name: "고기", relations_good_group: [], relations_good: [
    {
        good_id: "10000004",
        sort: 1,
    },
    {
        good_id: "10001511",
        sort: 1,
    },
    {
        good_id: "10001502",
        sort: 1,
    }
], created_time: "2022-03-10T10:30:00.000Z", updated_time: "2022-03-10T10:30:00.000Z" },
  { id: "4", name: "녹차", relations_good_group: [{path: "1/3/4"}], relations_good: [
], created_time: "2022-03-10T10:30:00.000Z", updated_time: "2022-03-10T10:30:00.000Z" },
  { id: "3", name: "차", relations_good_group: [{path: "1/3"}], relations_good: [
], created_time: "2022-03-10T10:30:00.000Z", updated_time: "2022-03-10T10:30:00.000Z" },
  { id: "1", name: "음료", relations_good_group: [], relations_good: [
], created_time: "2022-03-10T10:30:00.000Z", updated_time: "2022-03-10T10:30:00.000Z" },
];

// Routes
app.get(`/store/:storeId/tables`, (req, res) => {
  res.json({ result: true, tables });
});

app.get(`/store/:storeId/tables/:tableId`, (req, res) => {
  res.json({ result: true, table: tableDetails });
});

app.get(`/store/:storeId`, (req, res) => {
  res.json({ result: true, store });
});

app.get(`/store/:storeId/orders`, (req, res) => {
  res.json({ result: true, pos_orders: orders });
});

app.post(`/store/:storeId/orders`, (req, res) => {
    console.log(req.body);
    
  res.json({ message: "ok" });
});

app.get(`/store/:storeId/goods`, (req, res) => {
  res.json({ result: true, goods });
});

app.get(`/store/:storeId/goods-groups`, (req, res) => {
  res.json({ result: true, good_groups: goodGroups });
});

// Server start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
