// 1. 定义路由组件.
// 也可以从其他文件导入
import MessageWall from "./components/MessageWall.vue";
import Welcome from "./components/Welcome.vue";
import NotFound from "./components/NotFound.vue";
import Nav from "./components/Nav.vue";
import Profile from "./components/Profile.vue";
import Left from "./components/Left.vue";
import Content from "./components/Content.vue";
import Right from "./components/Right.vue";
import Layout from "./components/Layout.vue";
import Counter from "./components/Counter.vue";

import { createRouter, createWebHashHistory } from "vue-router";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: "/",
    component: Nav,
    children: [
      { path: "", component: Welcome },
      { path: "message-wall/:id?", component: MessageWall, props: true },
      { path: ":pathMatch(.*)*", name: "NotFound", component: NotFound },
      { path: "profile", name: "Profile", component: Profile },
      { path: "counter", name: "Counter", component: Counter },
      {
        path: "layout",
        name: "Layout",
        components: {
          default: Layout,
          left: Left,
          right: Right,
          content: Content,
        },
      },
    ],
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
