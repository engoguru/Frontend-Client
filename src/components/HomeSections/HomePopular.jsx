
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { fetchProducts } from '../../store/slice/productSlice';
import { useSelector,useDispatch } from 'react-redux';
function HomePopular() {
const dispatch=useDispatch();
  const { products, totalCount, totalPages, loading, error } = useSelector((state) => state.product);



  const popularCategories = [
    {
      title: 'Nutrition',
      images: [
        'https://media.istockphoto.com/id/533336742/photo/strongman-with-can-of-supplements.jpg?s=612x612&w=0&k=20&c=ckq9eDWfA9Fd6uPsIWun6hgw-w5aMAME-iHBGTrXlhc=',
        'https://samacharlahrein.com/wp-content/uploads/2023/09/Image_Hardik-Pandya-450x445.jpg',
        'https://www.sixstarpro.com/cdn/shop/articles/protein-shakes-for-weight-gain.jpg?v=1739478537',
      ],
      description: 'Top supplements and health boosters.',
    },
    {
      title: 'Apparel',
      images: [
        'https://img.freepik.com/free-photo/young-happy-sportswoman-running-road-morning-copy-space_637285-3758.jpg?semt=ais_incoming&w=740&q=80',
        'https://w0.peakpx.com/wallpaper/375/792/HD-wallpaper-fitness-model-girl-women.jpg',
        'https://media.istockphoto.com/id/914755598/photo/group-of-young-sporty-girls-with-yoga-mats-copyspace.jpg?s=612x612&w=0&k=20&c=tUL2sS9oIVk-7sBQZlrfNUPvuJhAQQQ1stJzjql2EQ4=',
      ],
      description: 'Train in style with performance gear.',
    },
    {
      title: 'Equipment',
      images: [
        'https://www.shutterstock.com/image-photo/young-8-years-old-indian-600nw-2627690837.jpg',
        'https://images.stockcake.com/public/a/f/8/af822797-0b39-4d58-a012-52da1dc0ed63_large/cricket-gear-arranged-stockcake.jpg',
        'https://whacksports.com.au/cdn/shop/files/MRF_Grand_Edition_Senior-Junior-Bundle-2023-Main_cf24e4a7-253c-43c8-b0c0-115bd88a272a.jpg',
      ],
      description: 'Durable tools for your fitness goals.',
    },
  ];

  return (
    <div className="w-full py-10 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
        Popular Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-8">
        {popularCategories.map((item, index) => (
          <Link
            to={`/productViewAll?category=${encodeURIComponent(item.title)}`}
            key={index}
            className="group relative h-72 rounded-lg overflow-hidden shadow-lg "
          >
            {/* Swiper Carousel */}
            <Swiper
              modules={[Autoplay]}
              navigation
              pagination={{ clickable: false }}
              autoplay={{ delay: 3000 }}
              loop={true}
              className="w-full h-full object-contain bg-black "
            >
              {item.images.map((img, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={img}
                    alt={`${item.title} ${i + 1}`}
                    className="w-full h-full object-cover object-center "
                  />
                </SwiperSlide>
              ))}
            </Swiper>

     
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#00000094] bg-opacity-40 group-hover:bg-opacity-100 transition duration-300 z-10" />

            {/* Centered Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-20 px-4">
              <h3 className="text-2xl font-bold mb-2 group-hover:text-red-500 transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-sm group-hover:text-red-300 transition-colors duration-300">
                {item.description}
              </p>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePopular;

