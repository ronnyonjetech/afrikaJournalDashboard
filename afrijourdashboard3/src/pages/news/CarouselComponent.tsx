import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  { src: "https://www.universitiesfund.go.ke/wp-content/uploads/2024/02/Funding-2.jpg", text: "Discover Funding Opportunities" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEipByJ-FEytZa5Qc3jxQw3hwR96nWFrQfDQ&s", text: "Stay informed with updates" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nfdoJgCQehFQlwx2fXE9uQHu9jwcC41JXw&s", text: "Explore academic insights" },
];

export default function CarouselComponent() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-64 overflow-hidden rounded-2xl shadow-lg mt-32 flex items-center justify-center">
      <AnimatePresence>
        <motion.div
          key={images[index].src}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={images[index].src}
            alt={images[index].text}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <p className="text-white text-xl font-semibold">{images[index].text}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
