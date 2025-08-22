"use client"
import { useRouter } from "next/navigation";
import React from "react";


// COMPONENTE PARA MOSTRAR LISTADO

function TaskCard({task}) {
    // logica
    const router = useRouter();


    // renderizado
  return (
    <div
      className="bg-slate-900 p-3 mt-10 hover:bg-slate-500 hover:cursor-pointer"
      onClick={()=>{
        router.push('/tasks/edit/' + task.id)
      }}
    >
      <h3 className="font-bold text-2xl mb-2">{task.title}</h3>
      <p>{task.description}</p>
      {/* para fechas debes convertir a string pq es un date lo que viene de la bd */}
      <p>{new Date(task.createAt).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskCard;
