
import { prisma } from '@/libs/prisma'; //importando el file cliente conexion
import {NextResponse} from 'next/server';


// http://localhost:3000/api/tasks  ---get desde postman
export async function GET(){

    // usando el orm del folder src\libs
    // listado todo
    const tasks = await prisma.task.findMany();

    // console.log(tasks);

    // retorn al cliente
    return NextResponse.json(tasks);
}


// http://localhost:3000/api/tasks ----post desde postman
// en body > raw > json >
// {
//     "title":"realmadrid",
//     "description":"santiago"
// }
export async function POST(request){

    // obteniendo desde el body
    const {title, description} = await request.json();
    // console.log(data);

    // creando el objeto
    const newtask = await prisma.task.create({
        data:{
            title: title , 
            description : description
        }
    })

    // retorna al cliente
    return NextResponse.json(newtask);
}