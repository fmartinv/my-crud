import React from 'react';
import { nanoid } from 'nanoid';

function App() {
  const [tarea, setTarea] = React.useState('');
  const [tareas, setTareas] = React.useState([]);
  const [modoEdicion, setmodoEdicion] = React.useState(false);
  const [id, setId] = React.useState('');

  const agregarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('elemento vacío ');
      return;
    }
    console.log('tarea enviada');
    setTareas([...tareas, { id: nanoid(10), NombreTarea: tarea }]);

    setTarea('');
  };
  const eliminarTarea = (id) => {
    const arrayFilter = tareas.filter((item) => item.id !== id);
    setTareas(arrayFilter);
  };
  const editar = (item) => {
    console.log(item);
    setmodoEdicion(true);
    setTarea(item.NombreTarea);
    setId(item.id);
  };
  const editarTarea = (e) => {
    e.preventDefault();
    if (!tarea.trim()) {
      console.log('elemento vacío ');
      return;
    }
    const arrayEditado = tareas.map((item) =>
      item.id === id ? { id, NombreTarea: tarea } : item
    );

    setTareas(arrayEditado);
    setmodoEdicion(false);
    setTarea('');
    setId('');
  };
  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center my-5 border border-warning">Crud</h1>
        <div className="row">
          <div className="col-12 col-md-4">
            <h4 className="text-center my-2 border border-warning p-2">
              {modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}
            </h4>
            <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
              <input
                type="text"
                className="form-control mb-2 "
                placeholder="Ingrese Tarea"
                onChange={(e) => setTarea(e.target.value)}
                value={tarea}
              />
              {modoEdicion ? (
                <button
                  className="btn btn-warning btn-block mt-3"
                  type="submit"
                >
                  Editar
                </button>
              ) : (
                <button className="btn btn-dark btn-block mt-3" type="submit">
                  Agregar
                </button>
              )}
            </form>
          </div>
          <div className=" col-12 col-md-8">
            <h4 className="text-center my-2 border border-warning">
              Lista de tareas
            </h4>
            <ul className="list-group">
              {tareas.length === 0 ? (
                <li className="list-group-item">No Hay Tareas</li>
              ) : (
                tareas.map((item) => (
                  <li className="list-group-item" key={item.id}>
                    <span className="lead"> {item.NombreTarea} </span>
                    <button
                      className="btn btn-danger btn-sm float-right mx-2"
                      onClick={() => eliminarTarea(item.id)}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-warning btn-sm float-right mx-2"
                      onClick={() => editar(item)}
                    >
                      Editar
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
