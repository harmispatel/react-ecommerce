import React, { useState } from "react";

const dummyProducts = [
  {
    id: 1,
    name: "Classic Denim Jacket",
    category: "Jackets",
    price: 59.99,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    category: "T-Shirts",
    price: 15.5,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 3,
    name: "Summer Floral Dress",
    category: "Dresses",
    price: 45.0,
    available: false,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 4,
    name: "Slim Fit Jeans",
    category: "Jeans",
    price: 39.99,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 5,
    name: "Hooded Sweatshirt",
    category: "Hoodies",
    price: 30.0,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 6,
    name: "Formal Shirt",
    category: "Shirts",
    price: 25.0,
    available: false,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 7,
    name: "Cargo Pants",
    category: "Pants",
    price: 29.99,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 8,
    name: "Woolen Sweater",
    category: "Sweaters",
    price: 35.0,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 9,
    name: "Track Shorts",
    category: "Shorts",
    price: 19.99,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 10,
    name: "Rain Coat",
    category: "Coats",
    price: 49.99,
    available: false,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 11,
    name: "Graphic Tee",
    category: "T-Shirts",
    price: 22.0,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
  {
    id: 12,
    name: "Denim Skirt",
    category: "Skirts",
    price: 27.5,
    available: true,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/026/345/481/small/illustration-of-a-white-plain-t-shirt-mockup-ai-generated-photo.jpg",
  },
];

const TaskList = () => {
  const [products, setProducts] = useState(dummyProducts);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Task List
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition duration-300"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 mb-1">
                Category: {product.category}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                Price:{" "}
                <span className="font-medium">${product.price.toFixed(2)}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
