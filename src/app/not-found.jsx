import Link from 'next/link'
import React from 'react'


// pagina para rutas invalidas en la url
// http://localhost:3000/lslslsjd
function Notfound() {
  return (
    <section className='flex h-[calc(100vh-7rem)] justify-center items-center'>
        <div className='text-center'>
            <h1 className='text-4xl font-bold'>Not found</h1>
            <Link href="/" className='text-slate-400 text-2xl mt-2'>
            Volver al Incio
            </Link>
        </div>

    </section>
  )
}

export default Notfound