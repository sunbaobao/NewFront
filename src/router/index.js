import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },

    {
        path: '/example',
        component: Layout,
        redirect: '/example/table',
        name: 'Example',
        meta: { title: '例子', icon: 'el-icon-s-help' },
        children: [
            {
                path: 'table',
                name: 'Table',
                component: () => import('@/views/table/index'),
                meta: { title: '表格', icon: 'table' }
            },
            {
                path: 'tree',
                name: 'Tree',
                component: () => import('@/views/tree/index'),
                meta: { title: '树节点', icon: 'tree' }
            }
        ]
    },
    {
        path: '/user',
        component: Layout,
        redirect: '/user/list',
        name: 'User',
        meta: { title: '用户管理', icon: 'el-icon-user' },
        children: [
            {
                path: 'list',
                name: 'list',
                component: () => import('@/views/user/user'),
                meta: { title: '用户列表', icon: 'user' }
            }
        ]
    },
    {
        path: '/log',
        component: Layout,
        redirect: '/log/loginLog',
        name: 'log',
        meta: { title: '登陆日志', icon: 'el-icon-user' },
        children: [
            {
                path: 'loginLog',
                name: 'loginLog',
                component: () => import('@/views/log/loginLog'),
                meta: { title: '登陆日志', icon: 'documentation' }
            }
        ]
    },
    {
        path: '/bd',
        component: Layout,
        redirect: '/bd/face',
        name: 'bdAPI',
        meta: {
            title: '百度接口案例', icon: 'el-icon-s-platform'
        },
        children: [
            {
                path: 'face',
                name: 'face',
                component: () => import('@/views/Baidu/FaceDetect'),
                meta: { title: '人脸识别 ', icon: 'people' }
            },
            {
                path: 'orc',
                name: 'orc',
                component: () => import('@/views/Baidu/orc'),
                meta: { title: '文字识别', icon: 'skill' }
            }
        ]
    },
    {
        path: '/form',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Form',
                component: () => import('@/views/form/index'),
                meta: { title: '表单', icon: 'form' }
            }
        ]
    },

    {
        path: '/nested',
        component: Layout,
        redirect: '/nested/menu1',
        name: 'Nested',
        meta: {
            title: 'Nested',
            icon: 'nested'
        },
        children: [
            {
                path: 'menu1',
                component: () => import('@/views/nested/menu1/index'), // Parent router-view
                name: 'Menu1',
                meta: { title: 'Menu1' },
                children: [
                    {
                        path: 'menu1-1',
                        component: () => import('@/views/nested/menu1/menu1-1'),
                        name: 'Menu1-1',
                        meta: { title: 'Menu1-1' }
                    },
                    {
                        path: 'menu1-2',
                        component: () => import('@/views/nested/menu1/menu1-2'),
                        name: 'Menu1-2',
                        meta: { title: 'Menu1-2' },
                        children: [
                            {
                                path: 'menu1-2-1',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                                name: 'Menu1-2-1',
                                meta: { title: 'Menu1-2-1' }
                            },
                            {
                                path: 'menu1-2-2',
                                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                                name: 'Menu1-2-2',
                                meta: { title: 'Menu1-2-2' }
                            }
                        ]
                    },
                    {
                        path: 'menu1-3',
                        component: () => import('@/views/nested/menu1/menu1-3'),
                        name: 'Menu1-3',
                        meta: { title: 'Menu1-3' }
                    }
                ]
            },
            {
                path: 'menu2',
                component: () => import('@/views/nested/menu2/index'),
                name: 'Menu2',
                meta: { title: 'menu2' }
            }
        ]
    },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
];
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    // {
    //   path: '/permission',
    //   component: Layout,
    //   redirect: '/permission/page',
    //   alwaysShow: true, // will always show the root menu
    //   name: 'Permission',
    //   meta: {
    //     title: 'Permission',
    //     icon: 'lock',
    //     roles: ['admin', 'editor'] // you can set roles in root nav
    //   },
    //   children: [
    //     {
    //       path: 'page',
    //       component: () => import('@/views/permission/page'),
    //       name: 'PagePermission',
    //       meta: {
    //         title: 'Page Permission',
    //         roles: ['admin'] // or you can only set roles in sub nav
    //       }
    //     },
    //     {
    //       path: 'directive',
    //       component: () => import('@/views/permission/directive'),
    //       name: 'DirectivePermission',
    //       meta: {
    //         title: 'Directive Permission'
    //         // if do not set roles, means: this page does not require permission
    //       }
    //     },
    //     {
    //       path: 'role',
    //       component: () => import('@/views/permission/role'),
    //       name: 'RolePermission',
    //       meta: {
    //         title: 'Role Permission',
    //         roles: ['admin']
    //       }
    //     }
    //   ]
    // },

    // {
    //   path: '/icon',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/icons/index'),
    //       name: 'Icons',
    //       meta: { title: 'Icons', icon: 'icon', noCache: true }
    //     }
    //   ]
    // },
    //
    // /** when your routing map is too long, you can split it into small modules **/
    // componentsRouter,
    // chartsRouter,
    // nestedRouter,
    // tableRouter,

    // {
    //   path: '/example',
    //   component: Layout,
    //   redirect: '/example/list',
    //   name: 'Example',
    //   meta: {
    //     title: 'Example',
    //     icon: 'el-icon-s-help'
    //   },
    //   children: [
    //     {
    //       path: 'create',
    //       component: () => import('@/views/example/create'),
    //       name: 'CreateArticle',
    //       meta: { title: 'Create Article', icon: 'edit' }
    //     },
    //     {
    //       path: 'edit/:id(\\d+)',
    //       component: () => import('@/views/example/edit'),
    //       name: 'EditArticle',
    //       meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
    //       hidden: true
    //     },
    //     {
    //       path: 'list',
    //       component: () => import('@/views/example/list'),
    //       name: 'ArticleList',
    //       meta: { title: 'Article List', icon: 'list' }
    //     }
    //   ]
    // },

    // {
    //   path: '/tab',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/tab/index'),
    //       name: 'Tab',
    //       meta: { title: 'Tab', icon: 'tab' }
    //     }
    //   ]
    // },

    {
        path: '/error',
        component: Layout,
        redirect: 'noRedirect',
        name: 'ErrorPages',
        meta: {
            title: '错误页面',
            icon: '404'
        },
        children: [
            {
                path: '401',
                component: () => import('@/views/error-page/401'),
                name: 'Page401',
                meta: { title: '401', noCache: true }
            },
            {
                path: '404',
                component: () => import('@/views/error-page/404'),
                name: 'Page404',
                meta: { title: '404', noCache: true }
            }
        ]
    },

    {
        path: '/error-log',
        component: Layout,
        children: [
            {
                path: 'log',
                component: () => import('@/views/error-log/index'),
                name: 'ErrorLog',
                meta: { title: 'Error Log', icon: 'bug' }
            }
        ]
    },

    // {
    //   path: '/excel',
    //   component: Layout,
    //   redirect: '/excel/export-excel',
    //   name: 'Excel',
    //   meta: {
    //     title: 'Excel',
    //     icon: 'excel'
    //   },
    //   children: [
    //     {
    //       path: 'export-excel',
    //       component: () => import('@/views/excel/export-excel'),
    //       name: 'ExportExcel',
    //       meta: { title: 'Export Excel' }
    //     },
    //     {
    //       path: 'export-selected-excel',
    //       component: () => import('@/views/excel/select-excel'),
    //       name: 'SelectExcel',
    //       meta: { title: 'Export Selected' }
    //     },
    //     {
    //       path: 'export-merge-header',
    //       component: () => import('@/views/excel/merge-header'),
    //       name: 'MergeHeader',
    //       meta: { title: 'Merge Header' }
    //     },
    //     {
    //       path: 'upload-excel',
    //       component: () => import('@/views/excel/upload-excel'),
    //       name: 'UploadExcel',
    //       meta: { title: 'Upload Excel' }
    //     }
    //   ]
    // },
    //
    // // {
    // //   path: '/zip',
    // //   component: Layout,
    // //   redirect: '/zip/download',
    // //   alwaysShow: true,
    // //   name: 'Zip',
    // //   meta: { title: 'Zip', icon: 'zip' },
    // //   children: [
    // //     {
    // //       path: 'download',
    // //       component: () => import('@/views/zip/index'),
    // //       name: 'ExportZip',
    // //       meta: { title: 'Export Zip' }
    // //     }
    // //   ]
    // // },
    //
    // {
    //   path: '/pdf',
    //   component: Layout,
    //   redirect: '/pdf/index',
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/pdf/index'),
    //       name: 'PDF',
    //       meta: { title: 'PDF', icon: 'pdf' }
    //     }
    //   ]
    // },
    // {
    //   path: '/pdf/download',
    //   component: () => import('@/views/pdf/download'),
    //   hidden: true
    // },
    //
    // {
    //   path: '/theme',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import('@/views/theme/index'),
    //       name: 'Theme',
    //       meta: { title: 'Theme', icon: 'theme' }
    //     }
    //   ]
    // },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

    // {
    //   path: 'external-link',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'https://github.com/PanJiaChen/vue-element-admin',
    //       meta: { title: 'External Link', icon: 'link' }
    //     }
    //   ]
    // },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
}

export default router;
