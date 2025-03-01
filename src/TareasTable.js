import { useEffect, useState } from "react";
import { data, Link, navigate,useNavigate } from "react-router-dom";
import { Table } from "reactstrap";
import ViewDetails from "./ViewDetails";
import EditTable from "./EditTable";

export default function TareasTable(){
    const [tareas, setTareas]= useState("");
    const navigate=useNavigate();
    const ViewDetails=(id)=> {
        navigate("Tareas/"+id)
    }
    const EditTable=(id)=>{
        navigate("/Tareas/edit/"+id)
    }
    const Remove=(id)=>{
        if(window.confirm("Esta seguro que quiere eliminar esta tarea")){
            fetch("https://localhost:7070/api/Tareas/borrar/"+id,{
                method: 'DELETE'
            })
            .then((res)=>{
                alert("Eliminacion Completada");
                navigate("/");
            })
        }
    }
    useEffect(()=>{
        fetch('https://localhost:7070/api/Tareas')
        .then((res)=>res.json())
        .then((data)=>
           setTareas(data)
        ).catch((err)=>
            console.log(err.message)
        )
    },[])
    return(
        <div className="container">
            <h2>TODO APP REACT v1</h2>
            <div className="table-container">
                <Link to="/Tareas/create" className="btn btn-add"> Añadir nueva Tarea</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre Tarea</th>
                            <th>Descripcion Tarea</th>
                            <th>Estado Tarea</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tareas && tareas.map((item)=> (
                                <tr>
                                <td>{item.id}</td>
                                <td>{item.nombre_Tarea} </td>
                                <td>{item.descripcion_Tarea} </td>
                                <td>{item.isCompleted_Tarea}</td>
                                <td>
                                    <button onClick={()=>ViewDetails(item.id)} className="btn btn-info" >Ver Detalle</button>
                                    <button onClick={()=>{EditTable(item.id)}} className="btn btn-primary">Editar</button>
                                    <button onClick={()=>{Remove(item.id)}} className="btn btn-danger">Eliminar</button>
                                </td>
                            </tr>
                            ))
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    )
}