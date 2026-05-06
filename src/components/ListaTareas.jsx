import TarjetaTarea from './TarjetaTarea'

function ListaTareas({ tareas, alCambiarEstado, alEditar, alEliminar }) {
  if (tareas.length === 0) {
    return (
      <section className="lista-tareas lista-vacia">
        <p>No hay tareas agregadas. Crea la primera para empezar.</p>
      </section>
    )
  }

  return (
    <section className="lista-tareas">
      {tareas.map((tarea) => (
        <TarjetaTarea
          key={tarea.id}
          tarea={tarea}
          alCambiarEstado={alCambiarEstado}
          alEditar={alEditar}
          alEliminar={alEliminar}
        />
      ))}
    </section>
  )
}

export default ListaTareas
