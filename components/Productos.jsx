import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { descargarProductos } from '../actions/productoActions';
import Producto from './Producto';

const Productos = () => {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error);
  const productos = useSelector(state => state.productos.productos);

  
  useEffect(() => {
    const dispatchDescargarProductos = () => dispatch(descargarProductos());
    dispatchDescargarProductos();
  },[])

  return (
    <> 
      <h2 className="text-center my-5">Listado de Productos</h2>
      {error ? <p className="alert alert-danger text-center">Hubo un error</p> : null}
      {loading ? <p className="text-center">Cargando...</p> : null}
      <table className="table table-striped text-center">
        <thead className='bg-primary table-dark'>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            productos.length === 0 ? 'No hay productos' : (
              productos.map(producto => (
                <Producto
                  key={producto.id}
                  producto={producto}
                />
              ))
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default Productos