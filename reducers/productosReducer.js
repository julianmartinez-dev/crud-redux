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

//Cada reducer tiene su propio state

const initialState = {
    productos: [],
    producto: {},
    loading: false,
    error: null
}

export default function(state = initialState, action) {
    switch (action.type) {
        case AGREGAR_PRODUCTO:
        case COMENZAR_DESCARGA_PRODUCTOS:
            return{
                ...state,
                loading: action.payload,
                error: null
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                productos: [...state.productos, action.payload],
                loading: false,
                
            }
        case AGREGAR_PRODUCTO_ERROR:
        case DESCARGA_PRODUCTOS_ERROR:
        case PRODUCTO_ELIMINADO_ERROR:
        case PRODUCTO_EDITADO_ERROR:
            return{
                ...state,
                loading: false,
                error: action.payload,
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                productos: action.payload,
                loading: false,
                error: null
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                producto : action.payload,
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return {
              ...state,
              productos: state.productos.filter(
                (producto) => producto.id !== state.producto
              ),
              producto: null,
            };
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                producto: action.payload,
            }
        case PRODUCTO_EDITADO_EXITO:
            return{
                ...state,
                productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto),
            }
        default:
            return state;
    }
}