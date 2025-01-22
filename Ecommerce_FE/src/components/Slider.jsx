import { useState, useEffect } from "react";
import slider1 from '~/assets/slider-1.webp';
import slider2 from '~/assets/slider-2.webp';

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    { 
      src: slider1, 
      text: [
        { content: "Giảm 35%", style: "text-gray-500 md:text-xl font-normal" },
        { content: "Sản phẩm bán chạy nhất", style: "text-black md:text-4xl font-bold" },
        { content: "Mua ngay", style: "text-primary-500 md:text-2xl font-semibold" },
      ] 
    },
    { 
      src: slider2, 
      text: [
        { content: "Khuyến mãi sốc", style: "text-gray-500 md:text-xl font-normal" },
        { content: "Hàng mới về", style: "text-black md:text-4xl font-bold" },
        { content: "Đặt hàng ngay", style: "text-primary-500 md:text-2xl font-semibold" },
      ] 
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full mx-auto">
      <div className="overflow-hidden rounded-lg">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className="relative w-full flex-shrink-0">
              <img
                src={image.src}
                alt={`Slide ${index + 1}`}
                className="w-full h-auto"
              />
              <div className="absolute md:top-1/3 md:left-28 top-4 left-4 md:space-y-4 space-y-2">
                {image.text.map((line, lineIndex) => (
                  <p key={lineIndex} className={line.style}>
                    {line.content}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full h-4"></div>
    </div>
  );
}

export default Slider;
