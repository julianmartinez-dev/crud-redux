import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { editarProductoAPI } from '../actions/productoActions';
import { useNavigate } from 'react-router-dom';

const EditarProducto = () => {

  const producto = useSelector(state => state.productos.producto);
  if(!producto) return null;
  const dispatch = useDispatch();
  const [nombre, setNombre] = useState(producto.nombre);
  const [precio, setPrecio] = useState(producto.precio);

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editarProductoAPI({nombre, precio, id: producto.id}));
    navigate('/')

  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="text-center mb-4 fw-bold">Editar Producto</h2>

            <form
              onSubmit={handleSubmit}
            >
              <div className="form-group">
                <label htmlFor="nombre">Nombre del Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="nombre producto"
                  name="nombre"
                  id="nombre"
                  autoComplete="off"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="precio">Precio</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio producto"
                  name="precio"
                  id="precio"
                  autoComplete="off"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary fw-bold text-uppercase d-block w-100 mt-3"
              >
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditarProducto