import { useEffect, useState } from 'react'
import FormularioTarea from './components/FormularioTarea'
import ListaTareas from './components/ListaTareas'
import './App.css'

const CLAVE_TAREAS = 'tareas-gestor-react'

function obtenerTareasGuardadas() {
  const tareasGuardadas = localStorage.getItem(CLAVE_TAREAS)

  if (tareasGuardadas) {
    return JSON.parse(tareasGuardadas)
  }

  return []
}

function App() {
  const [tareas, setTareas] = useState(obtenerTareasGuardadas)
  const [tareaEditando, setTareaEditando] = useState(null)
  const [filtro, setFiltro] = useState('todas')

  //Guardar las tareas en el localStorage 
  useEffect(() => {
    localStorage.setItem(CLAVE_TAREAS, JSON.stringify(tareas))
  }, [tareas])

  function guardarTarea(datosTarea) {
    if (tareaEditando) {
      const tareasActualizadas = tareas.map((tarea) => {
        if (tarea.id === tareaEditando.id) {
          return {
            ...tarea,
            titulo: datosTarea.titulo,
            descripcion: datosTarea.descripcion,
          }
        }

        return tarea
      })

      setTareas(tareasActualizadas)
      setTareaEditando(null)
      return
    }

    const nuevaTarea = {
      id: Date.now(),
      titulo: datosTarea.titulo,
      descripcion: datosTarea.descripcion,
      completada: false,
    }

    setTareas([...tareas, nuevaTarea])
  }

  function cambiarEstadoTarea(id) {
    const tareasActualizadas = tareas.map((tarea) => {
      if (tarea.id === id) {
        return {
          ...tarea,
          completada: !tarea.completada,
        }
      }

      return tarea
    })

    setTareas(tareasActualizadas)
  }

  function eliminarTarea(id) {
    setTareas(tareas.filter((tarea) => tarea.id !== id))

    if (tareaEditando?.id === id) {
      setTareaEditando(null)
    }
  }

  return (
    <main className="contenedor-app">
      <section className="encabezado">
        <p className="subtitulo">Gestor de tareas en React</p>
        <h1>Organiza tus pendientes</h1>
      </section>

      <section className="panel">
        <FormularioTarea
          key={tareaEditando?.id || 'nueva-tarea'}
          alGuardar={guardarTarea}
          tareaEditando={tareaEditando}
          alCancelarEdicion={() => setTareaEditando(null)}
        />
      </section>

      <ListaTareas
        tareas={tareas}
        filtro={filtro}
        alCambiarFiltro={setFiltro}
        alCambiarEstado={cambiarEstadoTarea}
        alEditar={setTareaEditando}
        alEliminar={eliminarTarea}
      />
    </main>
  )
}

export default App
