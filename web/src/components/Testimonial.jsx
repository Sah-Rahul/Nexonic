import React from 'react'

const Testimonial = () => {
  const testimony = [
    {
      "rating": '★★★★',
      "description": 'Dolores porro laboriosam molestias est quo. Et et eos. Ab error modi labore sed eaque est. Quaerat aut est fugiat.',
      "img": '/images/testimony1.jpg',
      "name": "Rafael Stokes"
    },
    {
      "rating": '★★★★',
      "description": 'Dolores porro laboriosam molestias est quo. Et et eos. Ab error modi labore sed eaque est. Quaerat aut est fugiat.',
      "img": '/images/testimony2.jpg',
      "name": "Chelsea Turner"
    },
    {
      "rating": '★★★★',
      "description": 'Dolores porro laboriosam molestias est quo. Et et eos. Ab error modi labore sed eaque est. Quaerat aut est fugiat.',
      "img": '/images/testimony3.jpg',
      "name": "Jacqueline Mueller"
    },
    {
      "rating": '★★★★',
      "description": 'Dolores porro laboriosam molestias est quo. Et et eos. Ab error modi labore sed eaque est. Quaerat aut est fugiat.',
      "img": '/images/testimony4.jpg',
      "name": "Olive Borer"
    },
    {
      "rating": '★★★★',
      "description": 'Dolores porro laboriosam molestias est quo. Et et eos. Ab error modi labore sed eaque est. Quaerat aut est fugiat.',
      "img": '/images/testimony5.jpg',
      "name": "Priscilla Jacobson"
    },
    {
      "rating": '★★★★',
      "description": 'Dolores porro laboriosam molestias est quo. Et et eos. Ab error modi labore sed eaque est. Quaerat aut est fugiat.',
      "img": '/images/testimony6.jpg',
      "name": "Joseph Reinger"
    }
  ];
  return (
    <>
      <div className='md:px-10  p-5 flex items-center justify-center min-h-screen bg-[#F7FAFD]'>
        <div className='h-full  w-full md:pt-10 pt-2'>
          <h1 className='text-gray-700 font-bold text-2xl'>What is everyone saying?</h1>
          <div className='mt-10 flex flex-wrap items-center justify-between gap-5'>
            {
              testimony.map((item, index) => (
                <div key={index} className="md:h-[25vw] pt-16 rounded-sm md:w-[29vw] flex flex-col items-start bg-white text-black p-4 space-y-4">
                  <span className="text-yellow-400">{item.rating}</span>
                  <p className='text-gray-500'>{item.description}</p>
                  <div className='flex items-center gap-5'>
                    <img src={item.img} alt="User" className="h-12 w-12 rounded-full object-cover" />
                    <label htmlFor="" className="font-semibold">{item.name} </label></div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Testimonial