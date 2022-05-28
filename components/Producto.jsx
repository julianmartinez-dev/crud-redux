import { Link, useNavigate } from "react-router-dom";

//Redux
import { useDispatch } from "react-redux";
import { eliminarProducto, editarProducto } from "../actions/productoActions";
import Swal from 'sweetalert2/dist/sweetalert2.all.js';

const Producto = ({producto}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    //Confirmar si desea eliminar
    const confirmarEliminarProducto = id => {
        //1. Preguntar al usuario
        //2. Si se desea eliminar, hacer el dispatch  
        Swal.fire({
          title: 'Estas seguro?',
          text: "Se eliminara el producto",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar',
        }).then((result) => {
          if (result.isConfirmed) {
              dispatch(eliminarProducto(id));
            Swal.fire('Eliminado!', 'Your file has been deleted.', 'success');
          }
        });
    }

    const handleEditar = () =>{
        dispatch( editarProducto(producto) );
        navigate(`/productos/editar/${producto.id}`);
    }

 const {nombre, precio, id} = producto;
  return (
    <tr>
      <td>{nombre}</td>
      <td className="fw-bold">$ {precio}</td>
      <td className="acciones d-flex">
          <button onClick={handleEditar} className="btn btn-primary">Editar</button>
          <button
            type="button"
            className="btn btn-danger ms-5"
            onClick={() => confirmarEliminarProducto(id)}
          >
            Eliminar
          </button>
      </td>
    </tr>
  );
}

export default Producto