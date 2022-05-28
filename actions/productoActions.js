import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  COMENZAR_DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR,
  COMENZAR_EDICION_PRODUCTO
} from '../types';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

/*
=================================================================
*/

//Funcion que agrega productos a la base de datos
const agregarProducto = (producto) => {
  return async (dispatch) => {
    dispatch(agregarProductoAction());

    try {
      await clienteAxios.post('/productos', producto);

      dispatch(agregarProductoExito(producto));
      Swal.fire('Correcto', 'Producto agregado correctamente', 'success');
    } catch (error) {
      dispatch(agregarProductoError(true));
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!',
      });
    }
  };
};

const agregarProductoAction = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true,
});

const agregarProductoExito = (producto) => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto,
});

const agregarProductoError = (estado) => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado,
});

/*
=================================================================
*/

//Fucion que descarga los productos de la base de datos
const descargarProductos = () => {
  return async (dispatch) => {
    dispatch(descargarProductosActions());

    try {
      const { data } = await clienteAxios.get('/productos');
      dispatch(descargarProductosExito(data));
    } catch (error) {
      dispatch(descargarProductosError(true));
    }
  };
};

const descargarProductosActions = () => ({
  type: COMENZAR_DESCARGA_PRODUCTOS,
  payload: true,
});

const descargarProductosExito = (productos) => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos,
});

const descargarProductosError = (estado) => ({
  type: DESCARGA_PRODUCTOS_ERROR,
  payload: estado,
});

/*
=================================================================
*/

//Selecciona producto a eliminar
const eliminarProducto = (id) => {
   return async (dispatch) => {
     dispatch(eliminarProductoAction(id));

     try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(eliminarProductoExito());
     } catch (error) {
       console.log(error)
        dispatch(eliminarProductoError(true));
     }
   }
}

const eliminarProductoAction = (id) => ({
  type: OBTENER_PRODUCTO_ELIMINAR,
  payload: id,
})

const eliminarProductoExito = () => ({
  type: PRODUCTO_ELIMINADO_EXITO,
})

const eliminarProductoError = (estado) => ({
  type: PRODUCTO_ELIMINADO_ERROR,
  payload: estado,
})

/*
=================================================================
*/
//Selecciona producto a editar
const editarProducto = (producto) => {
  return async (dispatch) => {
    dispatch(editarProductoAction(producto));

  }
}

const editarProductoAction = (producto) => ({
  type: OBTENER_PRODUCTO_EDITAR,
  payload: producto,
})

const editarProductoAPI = (producto) => {
  return async (dispatch) => {
    dispatch(editarProductoAPIAction(producto))
    
    try {
      const resultado = await clienteAxios.put(`/productos/${producto.id}`, producto);
      dispatch(editarProductoExito(resultado.data));
    } catch (error) {
      console.log(error)
      dispatch(editarProductoError(true));
    }
  }
}

const editarProductoAPIAction = (producto) => ({
  type: COMENZAR_EDICION_PRODUCTO,
  payload: producto,
})

const editarProductoExito = (producto) => ({
  type: PRODUCTO_EDITADO_EXITO,
  payload: producto,
})

const editarProductoError = (estado) => ({
  type: PRODUCTO_EDITADO_ERROR,
  payload: estado,
})

export { agregarProducto, descargarProductos, eliminarProducto, editarProducto, editarProductoAPI };
