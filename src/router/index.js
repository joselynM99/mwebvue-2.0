import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import Pagina403 from '@/views/pages/Page403.vue'
import Pagina404 from '@/views/pages/Page404.vue'
import authService from '@/services/authService'
const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(
      /* webpackChunkName: "Login" */ '@/views/pages/Login.vue'
      )
  },

  {

    path: '/',
    name: 'Home',
    redirect: '/inicio',
    component: DefaultLayout,
    children: [
      {
        path: '/inicio',
        name: 'Inicio',
        component: () =>
          import(
            /* webpackChunkName: "inicio" */ '@/views/inicio/PaginaInicio.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
    ],
  },
  {
    path: '/negocio',
    name: 'Negocio',
    redirect: '/negocio/menu',
    component: DefaultLayout,
    children: [
      {
        path: 'menu',
        name: '',
        component: () =>
          import(
            /* webpackChunkName: "NegocioMenu" */ '@/views/inicio/NegocioMenu.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
      
      {
        path: 'cajas',
        name: 'Cajas',
        component: () =>
          import(
            /* webpackChunkName: "CajasNegocio" */ '@/views/gestion-cajas/CajasNegocio.vue'
          ),
        meta: { roles: ['ADMIN'] }
      },
      {
        path: 'cajas/abrir-caja',
        name: 'Abrir Caja',
        component: () =>
          import(
            /* webpackChunkName: "AbrirCaja" */ '@/views/gestion-cajas/AbrirCaja.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
      {
        path: 'cajas/cerrar-caja',
        name: 'Cerrar Caja',
        component: () =>
          import(
            /* webpackChunkName: "CerrarCaja" */ '@/views/gestion-cajas/CerrarCaja.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },


      {
        path: '/usuarios',
        name: 'Usuarios',
        redirect: '/usuarios/lista',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'lista',
            name: '',
            component: () =>
              import(
                /* webpackChunkName: "ListaUsuarios" */ '@/views/usuarios/ListaUsuarios.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
          {
            path: 'agregar',
            name: 'Registrar Usuario',
            component: () =>
              import(
                /* webpackChunkName: "RegistrarUsuario" */ '@/views/usuarios/RegistrarUsuario.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
          {
            path: 'actualizar',
            name: 'Actualizar Usuario',
            component: () =>
              import(
                /* webpackChunkName: "ActualizarUsuario" */ '@/views/usuarios/ActualizarUsuario.vue'
              ),
            meta: { roles: ['ADMIN', 'VENTAS'] }
          },
        ],
      },
      {
        path: '/clientes',
        name: 'Clientes',
        redirect: '/clientes/lista',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'lista',
            name: '',
            component: () =>
              import(
                /* webpackChunkName: "ListaClientes" */ '@/views/clientes/ListaClientes.vue'
              ),
            meta: { roles: ['ADMIN', 'VENTAS'] }
          },
          {
            path: 'agregar',
            name: 'Registrar Cliente',
            component: () =>
              import(
                /* webpackChunkName: "RegistrarClientes" */ '@/views/clientes/RegistrarClientes.vue'
              ),
            meta: { roles: ['ADMIN', 'VENTAS'] }
          },
          {
            path: 'actualizar',
            name: 'Actualizar Cliente',
            component: () =>
              import(
                /* webpackChunkName: "ActualizarClientes" */ '@/views/clientes/ActualizarClientes.vue'
              ),
            meta: { roles: ['ADMIN', 'VENTAS'] }
          },
        ],
      },
    ],
  },
  {
    path: '/inventario',
    name: 'Inventario',
    redirect: '/inventario/menu',
    component: DefaultLayout,
    children: [
      {
        path: 'menu',
        name: '',
        component: () =>
          import(
            /* webpackChunkName: "InventarioMenu" */ '@/views/inicio/InventarioMenu.vue'
          ),
        meta: { roles: ['ADMIN'] }
      },
      {
        path: 'productos',
        name: 'Productos',
        redirect: '/inventario/productos/lista',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'lista',
            name: '',
            component: () =>
              import(
                /* webpackChunkName: "ListaProductos" */ '@/views/inventario/productos/ListaProductos.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
          {
            path: 'agregar',
            name: 'Registrar Producto',
            component: () =>
              import(
                /* webpackChunkName: "RegistrarProductos" */ '@/views/inventario/productos/RegistrarProductos.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
          {
            path: 'actualizar',
            name: 'Actualizar Productos',
            component: () =>
              import(
                /* webpackChunkName: "ActualizarProductos" */ '@/views/inventario/productos/ActualizarProductos.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
        ],
      },
      {
        path: 'subproductos',
        name: 'Subproductos',
        redirect: '/inventario/subproductos/lista',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'lista',
            name: '',
            component: () =>
              import(
                /* webpackChunkName: "ListaSubproductos" */ '@/views/inventario/subproductos/ListaSubproductos.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
          {
            path: 'agregar',
            name: 'Registrar Subproducto',
            component: () =>
              import(
                /* webpackChunkName: "RegistrarSubproductos" */ '@/views/inventario/subproductos/RegistrarSubproductos.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
          {
            path: 'actualizar',
            name: 'Actualizar Subproducto',
            component: () =>
              import(
                /* webpackChunkName: "ActualizarSubproducto" */ '@/views/inventario/subproductos/ActualizarSubproducto.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
        ],
      },
      {
        path: 'proveedores',
        name: 'Proveedores',
        redirect: '/inventario/proveedores/lista',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'lista',
            name: '',
            component: () =>
              import(
                /* webpackChunkName: "ListaProveedores" */ '@/views/inventario/proveedores/ListaProveedores.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
          {
            path: 'agregar',
            name: 'Registrar Proveedor',
            component: () =>
              import(
                /* webpackChunkName: "RegistrarProveedores" */ '@/views/inventario/proveedores/RegistrarProveedores.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
          {
            path: 'actualizar',
            name: 'Actualizar Proveedor',
            component: () =>
              import(
                /* webpackChunkName: "ActualizarProveedores" */ '@/views/inventario/proveedores/ActualizarProveedores.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
        ],
      },
      {
        path: 'categorias',
        name: 'Categorías',
        redirect: '/inventario/categorias/gestion',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'gestion',
            name: '',
            component: () =>
              import(
                /* webpackChunkName: "Categorias" */ '@/views/inventario/categorias/Categorias.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
        ],
      },
      {
        path: 'marcas',
        name: 'Marcas',
        redirect: '/inventario/marcas/gestion',
        component: { render: () => h(resolveComponent('router-view')) },
        children: [
          {
            path: 'gestion',
            name: '',
            component: () =>
              import(
                /* webpackChunkName: "Marcas" */ '@/views/inventario/marcas/Marcas.vue'
              ),
            meta: { roles: ['ADMIN'] }
          },
        ],
      },
    ],
  },
  {
    path: '/reportes',
    name: 'Reportes',
    redirect: '/reportes/menu',
    component: DefaultLayout,
    children: [
      {
        path: 'menu',
        name: '',
        component: () =>
          import(
            /* webpackChunkName: "ReportesMenu" */ '@/views/inicio/ReportesMenu.vue'
          ),
        meta: { roles: ['ADMIN'] }
      },
      {
        path: 'ventas',
        name: 'Reporte Ventas',
        component: () =>
          import(
          /* webpackChunkName: "ReporteVentas" */ '@/views/reportes/ReporteVentas.vue'
          ),
        meta: { roles: ['ADMIN'] }
      },
      {
        path: 'compras',
        name: 'Reporte Compras',
        component: () =>
          import(
          /* webpackChunkName: "ReporteCompras" */ '@/views/reportes/ReporteCompras.vue'
          ),
        meta: { roles: ['ADMIN'] }
      },
      {
        path: 'productos-mas-vendidos',
        name: 'Reporte productos más vendidos',
        component: () =>
          import(
          /* webpackChunkName: "ReporteProductosMasVendidos" */ '@/views/reportes/ReporteProductosMasVendidos.vue'
          ),
        meta: { roles: ['ADMIN'] }

      }
    ]
  },

  {
    path: '/transacciones',
    name: 'Transacciones',
    redirect: '/transacciones/menu',
    children: [
      {
        path: 'menu',
        name: '',
        component: () =>
          import(
            /* webpackChunkName: "TransaccionesMenu" */ '@/views/inicio/TransaccionesMenu.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
      {
        path: 'adicionales',
        name: 'Adicionales',
        component: () =>
          import(
            /* webpackChunkName: "Adicionales" */ '@/views/transacciones/Adicionales.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
      {
        path: 'ventas/realizar-venta',
        name: 'Ventas',
        component: () =>
          import(
            /* webpackChunkName: "Ventas" */ '@/views/transacciones/ventas/Ventas.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
      {
        path: 'ventas/completar-venta',
        name: 'CompletarVenta',
        component: () =>
          import(
            /* webpackChunkName: "CompletarVenta" */ '@/views/transacciones/ventas/CompletarVenta.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
      {
        path: 'compra/realizar-compra',
        name: 'Compras',
        component: () =>
          import(
            /* webpackChunkName: "Compras" */ '@/views/transacciones/compras/Compras.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
      {
        path: 'deudas',
        name: 'Deudas',
        component: () =>
          import(
            /* webpackChunkName: "Deudas" */ '@/views/transacciones/deudas/Deudas.vue'
          ),
        meta: { roles: ['ADMIN', 'VENTAS'] }
      },
    ],
  },
  {
    path: '/403',
    name: 'Pagina403',
    component: Pagina403,
  },

  {
    path: '/404',
    name: 'Pagina404',
    component: Pagina404,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: Pagina404,
  },

  {
    path: '/cuadres-caja',
    name: 'Cuadres de Caja',
    redirect: '/cuadres-caja/lista',
    component: DefaultLayout,
    children: [
      {
        path: 'lista',
        name: '',
        component: () =>
          import(
            /* webpackChunkName: "CierresCajas" */ '@/views/gestion-cajas/CierresCajas.vue'
          ),
        meta: { roles: ['ADMIN'] }
      },

      {
        path: 'detalles-cuadre-caja',
        name: 'Detalles Cuadre Caja',
        component: () =>
          import(
            /* webpackChunkName: "DetalleCuadreCaja" */ '@/views/gestion-cajas/DetallesCuadresCaja.vue'
          ),
        meta: { roles: ['ADMIN'] }
      },

    ],
  },


]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

router.beforeEach((to, from, next) => {
  const usuario = JSON.parse(localStorage.getItem('usuario'))
  const isAuthenticated = authService.isAuthenticated()

  // Si intenta ir al login y ya está autenticado, redirige al inicio
  if (to.path === '/login') {
    if (isAuthenticated) {
      next('/inicio')
    } else {
      next()
    }
    return
  }

  // Si no está autenticado, redirige al login
  if (!isAuthenticated) {
    next('/login')
    return
  }

  // Si la ruta requiere roles
  if (to.meta.roles && usuario && usuario.rol) {
    if (to.meta.roles.includes(usuario.rol)) {
      next()
    } else {
      next('/403')
    }
  } else {
    next()
  }
})


export default router