

import { prisma } from '@/libs/prisma';
import {NextResponse} from 'next/server';


// http://localhost:3000/api/tasks/2


// METODO OBTIENE POR ID
// http://localhost:3000/api/tasks/2 --- get x id en postman u otro
export async function GET(request , {params}){
    // desenvolsando el parametro de la url
    const resolvedParams = await params;

    // respondiendo al cliente
    // id igual a este file se llama [id]
    // return NextResponse.json('obteniendo tarea GET ' + resolvedParams.id )

    // consultando por id de la url
    const task = await prisma.task.findUnique({
        where:{
                  //convierte a number el parametro
            id : Number(resolvedParams.id)
        }
    })
    // console.log(task);

    // retornando al cliente
    return NextResponse.json(task);
}






// METODO ACTUALIZA X ID
// http://localhost:3000/api/tasks/1 --- put en postman u otro
// en body > raw > JSON >
// {
//     "title":"liverpool",
//     "description":"anfield"
// }
export async function PUT(request , {params}){

    // obteniendo params url
    const resolvedParams = await params;
    // obteniendo body del request
    const data = await request.json();

    // actualiza
    const update = await prisma.task.update({
        // donde x id
        where:{
            id: Number(resolvedParams.id)
        }, 
        // actualiza , segun lo q los campos q envies en el request
        data:data
    })
    // retorna al cliente
    return NextResponse.json(update);
}






// METODO ELIMINA X ID
// http://localhost:3000/api/tasks/2 --- delete en postman u otro
export async function DELETE(request , {params}){
    // todo ok
    try {
    // obteniendo parametros url
      const resolvedParams = await params;

    //   eliminando x id
      const taskremoved = await prisma.task.delete({
        where:{
            id:Number(resolvedParams.id) //convierte parametro en int
        }
      })

    //   printer objeto eliminado
    //   console.log(taskremoved);

    //   retornando cliente
    // return NextResponse.json('obteniendo tarea DELETE ' + resolvedParams.id )
    return NextResponse.json(taskremoved);//retorna cliente el objeto eliminado
    
    //  error
    } catch(error) {
        return NextResponse.json(error.message);
    }
}