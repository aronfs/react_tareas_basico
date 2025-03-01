import { useEffect, useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

export default function EditTable(){
    const [id, setid] = useState("");
    const [nombre_Tarea, setnombreTarea] = useState("");
    const [descripcion_Tarea, setdescripcionTarea] = useState("");
    const [validation, setValidation] = useState(false);
    const isCompleted_Tarea = false;
    const isDeleted_Tarea = false;
    const navigate = useNavigate();
    const tareas = useParams();
    //const [tareasData, setTareasData]=useState("");

    useEffect(()=>{
        fetch("https://localhost:7070/api/Tareas/"+tareas.id)
        .then((res)=>res.json())
        .then((data)=>{
            setid(data.id)
            setnombreTarea(data.nombre_Tarea)
            setdescripcionTarea(data.descripcion_Tarea)
        }
    )
        .catch((err)=>console.log(err.message))
    },[]);

   
    const handleSubmit=(e)=>{
        e.preventDefault();
        const tareasdata={id,nombre_Tarea,descripcion_Tarea,isCompleted_Tarea,isDeleted_Tarea}
        fetch("https://localhost:7070/api/Tareas/edit/"+tareas.id, {
            method:'PUT',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(tareasdata)
        }).then((res)=>{
            alert("Tarea Actualizada Correctamente");
            navigate("/")
        }).catch((err)=> console.log(err.message))
    
    }
    return(
        <div className="container">
          <div className="container">
            <h2>Editar Tarea</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="id">Id:</label>
                <input type="text" id="id"name="id" value={id} onChange={e=>setid(e.target.value)}
                onMouseDown={()=>setValidation(true)}></input>
                {nombre_Tarea.length===0 && validation &&<span className="errorMsg">Porfavor ingresa un Id</span>}


                <label htmlFor="nombre_Tarea">Nombre Tarea:</label>
                <input type="text" id="nombre_Tarea"name="nombre_Tarea" value={nombre_Tarea} onChange={e=>setnombreTarea(e.target.value)}
                onMouseDown={()=>setValidation(true)}/>
                {nombre_Tarea.length===0 && validation && <span className="errorMsg">Porfavor ingresa un nombre</span>}

                <label htmlFor="Descripcion">Descripcion:</label>
                <input type="text" id="Descripcion"name="Descripcion"value={descripcion_Tarea} onChange={e=>setdescripcionTarea(e.target.value)}
                onMouseDown={()=>setValidation(true)}/>
                {descripcion_Tarea.length===0 && validation &&<span className="errorMsg">Porfavor ingresa una descripcion</span>}

                <div>
                    <button className="btn btn-save">
                        Actualizar
                    </button>
                    <Link to='/' class='btn btn-back'>Volver</Link>
                </div>
            </form>
        </div>
        </div>
    )
}