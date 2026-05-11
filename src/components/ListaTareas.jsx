import TarjetaTarea from './TarjetaTarea'

function ListaTareas({ tareas, filtro, alCambiarFiltro, alCambiarEstado, alEditar, alEliminar }) {
  const tareasFiltradas = tareas.filter((tarea) => {
    if (filtro === 'completadas') return tarea.completada
    if (filtro === 'pendientes') return !tarea.completada
    return true
  })

  return (
    <section className="lista-tareas">
      <div className="barra-filtro">
        <select
          className="selector-filtro"
          value={filtro}
          onChange={(e) => alCambiarFiltro(e.target.value)}
        >
          <option value="todas">Todas</option>
          <option value="completadas">Completadas</option>
          <option value="pendientes">Pendientes</option>
        </select>

        <span className="contador-tareas">
          {tareasFiltradas.length} {tareasFiltradas.length === 1 ? 'tarea' : 'tareas'}
        </span>
      </div>

      {tareasFiltradas.length === 0 ? (
        <div className="lista-vacia">
          <p>No hay tareas {filtro !== 'todas' ? filtro : 'agregadas. Crea la primera para empezar'}.</p>
        </div>
      ) : (
        tareasFiltradas.map((tarea) => (
          <TarjetaTarea
            key={tarea.id}
            tarea={tarea}
            alCambiarEstado={alCambiarEstado}
            alEditar={alEditar}
            alEliminar={alEliminar}
          />
        ))
      )}
    </section>
  )
}

export default ListaTareas
