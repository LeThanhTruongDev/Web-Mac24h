import React from "react";

const images = [
  "https://evostore.com.np/image/catalog/homepage.png?height=600&width=1200",
  "https://cdnb.artstation.com/p/assets/images/images/016/802/459/large/shuja-shuaib-banner.jpg?1553535424",
  "https://macstores.vn/wp-content/uploads/2017/03/New-MacBook-Pro-banner_B-1277x500.jpg",
  "https://qmacstore.com/media/banner-macbook-air-2022-chip-M2.jpg",
];

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  React.useEffect(() => {
    const interval = setInterval(nextSlide, 4000); // Tự động chuyển slide sau 4 giây
    return () => clearInterval(interval); // Dọn dẹp interval khi component unmount
  }, []);

  return (
    <div className="relative w-full h-[80vh] bg-gray-100 overflow-hidden">
      {/* Images Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
            style={{ flexBasis: "100%" }} // Đảm bảo mỗi slide chiếm 100% chiều rộng
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        &lt;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 z-10 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
      >
        &gt;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => goToSlide(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
