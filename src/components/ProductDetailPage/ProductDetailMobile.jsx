import React, { useState } from 'react'

function ProductDetailMobile() {

    const productImages = [
        'https://www.100acress.com/amenities_image/basketball.webp',
        'https://www.100acress.com/amenities_image/senior_citizen.webp',
        'https://www.100acress.com/amenities_image/senior_citizen.webp',
    ];

    const [mainImage, setMainImage] = useState(productImages[0]);
    return (
        <div className='w-full h-full bg-white flex flex-col '>
            {/* productName */}
            <div className="">
                <p>
                    <span className='font-bold text-black text-2xl'>Footballl Korean the Maxi</span>
                    <span className='text-gray-500'></span>
                </p>
            </div>
            {/* product Images */}
            <div className="w-full">
                <div className="">
                    <img
                        src={mainImage}
                        alt="Main Product"
                        className="w-full h-[200px] object-cover rounded-lg"
                    />
                    <div className="flex gap-3 mt-4">
                        {productImages.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className={`w-20 h-20 object-cover rounded cursor-pointer border ${mainImage === img ? 'border-red-600' : 'border-gray-300'}`}
                                onClick={() => setMainImage(img)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* {productDescription} */}
            <div className=" flex  flex-col items-start justify-start mt-4 mb-4 px-5">
                <p className='text-gray-500 text-md'>
                    <span className='font-bold text-black'>Product Description</span>
                    <span className='text-gray-500'></span>
                </p>
                <p className='text-gray-500 text-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, consequatur.</p>
            </div>
            {/* product Price */}
            <div className="py-4 px-10 ">
                <div className="flex flex-row justify-between items-center text-md text-gray-500 border-b-2 border-red-700">
                    <span className="font-bold text-2xl text-black">$599</span>
                    <span className="text-green-700">Stock</span>
                </div>
            </div>

        </div>
    )
}

export default ProductDetailMobile