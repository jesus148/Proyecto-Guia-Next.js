import TaskCard from '@/components/TaskCard';
import { prisma } from '@/libs/prisma'
import React from 'react'

// http://localhost:3000/

// PAGINA PRINCIPAL LISTADO


// metodo del orm
// ojo : tambien puedes llamar al metodo api de next.js con el route osea usando fecth con el endpoint
async function loadTasks(){
  // obtiene todo
  const tasks = await prisma.task.findMany()
  // console.log(tasks)
  // retorna
  return tasks
}

// para al momento de deployar se actualize todo la app muestra la data nueva 
// export const revalidate = 60;

// desactiva en el deploy pq no se guarda la data en el cache
export const dynamic = 'force-dynamic'; 

async function HomePage() {
  // logica
  // llama todo
  const tasks = await loadTasks();

  // renderizado
  return (
    <section className='container mx-auto' >
          <div className='grid grid-cols-3 gap-3'>
      {/* desenvolsando data  ,atributos = clase modelo*/}
      {
        tasks.map((task)=>(
          // importando componente
          <TaskCard task={task} key={task.id}/>
        ))
      }
    </div>
    </section>
  )
}

export default HomePage