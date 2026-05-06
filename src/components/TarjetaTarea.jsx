function TarjetaTarea({ tarea, alCambiarEstado, alEditar, alEliminar }) {
  const claseEstado = tarea.completada ? 'tarea completada' : 'tarea pendiente'

  return (
    <article className={claseEstado}>
      <div className="contenido-tarea">
        <span className="etiqueta-estado">
          {tarea.completada ? 'Completada' : 'Pendiente'}
        </span>
        <h3>{tarea.titulo}</h3>
        <p>{tarea.descripcion}</p>
      </div>

      <div className="acciones-tarea">
        <button
          type="button"
          className="boton boton-estado"
          onClick={() => alCambiarEstado(tarea.id)}
        >
          {tarea.completada ? 'Marcar pendiente' : 'Marcar completada'}
        </button>
        <button
          type="button"
          className="boton boton-secundario"
          onClick={() => alEditar(tarea)}
        >
          Editar
        </button>
        <button
          type="button"
          className="boton boton-eliminar"
          onClick={() => alEliminar(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </article>
  )
}

export default TarjetaTarea
