import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//Actions de redux
import { agregarProducto } from '../actions/productoActions';
import { useNavigate } from 'react-router-dom';

const NuevoProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState(0);

  const navigate = useNavigate();
  //Acceder al state del store
  const loading = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);

  //Llamar al action de Agregar Producto con dispatch de redux
  const dispatch = useDispatch();
  const dispatchAgregarProducto = (producto) =>
    dispatch(agregarProducto(producto));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (nombre.trim() === '' || precio <= 0) {
      return;
    }

    //Envia el producto al action de agregarProducto
    dispatchAgregarProducto({
      nombre,
      precio,
    });

    //Redirecciona a la ruta '/'
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card mt-5">
          <div className="card-body">
            <h2 className="text-center mb-4 fw-bold">Agregar nuevo Producto</h2>

            <form onSubmit={handleSubmit}>
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
                  onChange={(e) => setNombre(e.target.value)}
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
                  min="0"
                  onChange={(e) => setPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary fw-bold text-uppercase d-block w-100 mt-3"
              >
                Agregar Producto
              </button>
            </form>

            {(loading && <p>Cargando..</p>) ||
              (error && (
                <p className="alert alert-danger p2 mt-4 text-center">
                  Hubo un error
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
