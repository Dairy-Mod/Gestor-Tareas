import { useRef, useState } from 'react'

function FormularioTarea({ alGuardar, tareaEditando, alCancelarEdicion }) {
  const [titulo, setTitulo] = useState(tareaEditando?.titulo || '')
  const [descripcion, setDescripcion] = useState(
    tareaEditando?.descripcion || '',
  )
  const tituloRef = useRef(null)

  function manejarEnvio(evento) {
    evento.preventDefault()

    if (titulo.trim() === '' || descripcion.trim() === '') {
      return
    }

    alGuardar({
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
    })

    setTitulo('')
    setDescripcion('')
    tituloRef.current.focus()
  }

  return (
    <form className="formulario-tarea" onSubmit={manejarEnvio}>
      <div className="grupo-campo">
        <label htmlFor="titulo">Titulo</label>
        <input
          id="titulo"
          ref={tituloRef}
          type="text"
          value={titulo}
          onChange={(evento) => setTitulo(evento.target.value)}
          placeholder="Ej. Repasar componentes"
        />
      </div>

      <div className="grupo-campo">
        <label htmlFor="descripcion">Descripcion</label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(evento) => setDescripcion(evento.target.value)}
          placeholder="Describe los detalles de la tarea"
          rows="4"
        ></textarea>
      </div>

      <div className="acciones-formulario">
        <button type="submit" className="boton boton-principal">
          {tareaEditando ? 'Guardar cambios' : 'Agregar tarea'}
        </button>

        {tareaEditando && (
          <button
            type="button"
            className="boton boton-secundario"
            onClick={alCancelarEdicion}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

export default FormularioTarea
