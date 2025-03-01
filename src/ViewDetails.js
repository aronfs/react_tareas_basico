import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"

export default function ViewDetails(){
    
    const tareas = useParams();
    const [tareasData, setTareasData]=useState("");
    useEffect(()=>{
        fetch("https://localhost:7070/api/Tareas/"+tareas.id)
        .then((res)=>res.json())
        .then((data)=>setTareasData(data))
        .catch((err)=>console.log(err.message))
    },[])
 
    return(
        <div className="container">
            <h1>Detalle de Tarea</h1>
            {tareasData && <div className="details">
            <p><strong>ID:</strong> {tareasData.id}</p>
            <p><strong>Nombre Tarea:</strong> {tareasData.nombre_Tarea}</p>
            <p><strong>Descripcion Tarea:</strong> {tareasData.descripcion_Tarea}</p>
            <p><strong>Estado Tarea:</strong> {tareasData.isCompleted_Tarea}</p>
            </div>}
            <Link to="/" className="btn btn-back">Volver</Link>
        </div>
    )
}