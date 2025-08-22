"use client"
import {useRouter , useParams} from 'next/navigation';
import React, { useEffect, useState } from 'react'

// ruta 
// http://localhost:3000/new

// PAGINA CREAR Y UPDATE TAREA SEGUN LOS PARAMETROS

 function NewPage() {
  // logica

  
  // obtener parametros de la url
  const params = useParams();
  // console.log(params);

  // variables almacena valores inputs
  const [title,setTitle ] = useState("");
  const [description , setDescription] = useState("");



  // cuando incia la app solo 1 vez
  useEffect(() => {
    if(params.id){
          // metodo api
    fetch(`/api/tasks/${params.id}`)
      .then(res =>res.json()) //convierte a json
      .then(data =>{ 
        // desenvolsa y resetea inputs
        setTitle(data.title)
        setDescription(data.description)
      })
    }
  }, [])
  



  // para renderizar rutas
  const router = useRouter();


  // metodo registra
  const onSubmit = async (e) =>{
    e.preventDefault(); //cancele el refresh del form

    // si es update
    if(params.id){
      const res = await fetch(`/api/tasks/${params.id}`, {
      method:'PUT', 
      body:JSON.stringify({title, description}), //envia en formato json 
      headers:{
        'Content-Type' :'application/json'
      }
    })
    const data = await res.json()
    console.log(data);


    // si es registrar
    }else{
          // obteniendo valores de los inputs o textarea x el id
    // const title = e.target.title.value
    // const description = e.target.title.value

    // llamada al endpoint dentro del src en el folder api desde aqui
    const res = await fetch('/api/tasks', {
      method:'POST', 
      body:JSON.stringify({title, description}), //envia en formato json 
      headers:{
        'Content-Type' :'application/json'
      }
    })
    // retorna al cliente en json
    const data = await res.json();
    // console.log(data);
    }

    // esto es x seacaso pq next.js guarda la data en cache , te tal forma esto refresca todo tu app de nuevo
    // // basicamente para listar otra vez.etc
    router.refresh();
    // redirge a la ruta base
    router.push("/");
  }







  // renderizado
  return (
    // onChange : cuando deja el teclado cambia
    //value : valor q sale en el input
    <div className='h-screen flex justify-center items-center'>
      <form onSubmit={onSubmit} action="" className='bg-slate-800 p-10 lg:w-1/4 md:w-1/2'>
        <label htmlFor='title' className='font-bold text-sm'>Titulo de la tarea</label>
        <input id='title' type="text" className='border border-gray-400 p-2 mb-4 w-full text-white ' placeholder='Titulo'
        onChange={(e) => setTitle(e.target.value)} value={title}/>
        <label htmlFor="description" className='font-bold text-sm' >Descripcion de la tarea</label>
        <textarea id='description' rows="3" className='border border-gray-400 p-2 mb-4 w-full text-white' placeholder='Describe tu Tarea' onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
        <div className='flex justify-between'> 
        {/* type='submit' : esto envia el formulario */}
        <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl'>Crear</button>
        {
          // type='button' : no envia el formulario
          <button className='bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-2xl ' type='button'
          onClick={async()=>{
            const res = await fetch(`/api/tasks/${params.id}`, {
              method:"DELETE"
            })
            const data  = await res.json();
            // console.log(data);
            router.push("/")
          }}>
            Delete
          </button>
        }
        </div>
      </form>
    </div>
  )
}

export default NewPage