"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";

interface FormData {
  productName: string;
  shortDescription: string;
  price: string;
  image: File | null;
}

export default function AddProductForm() {
  const [formData, setFormData] = useState<FormData>({
    productName: "",
    shortDescription: "",
    price: "",
    image: null,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    console.log("FILE",file?.name)
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!formData.image) {
      alert('Please upload an image.');
      return;
    }
  
    try {
      const imageBase64 = await toBase64(formData.image);
  
      const response = await fetch('/api/product/add-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: formData.productName,
          shortDescription: formData.shortDescription,
          price: formData.price,
          image: imageBase64,
        }),
      });
  
      if (!response.ok) {
        // Attempt to parse JSON error response
        const text = await response.text(); // Read raw text
        const errorData = text ? JSON.parse(text) : { error: 'Unknown error occurred' };
        alert(`Error: ${errorData.error}`);
      } else {
        alert('Product added successfully!');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };
  

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  return (
    <form onSubmit={handleSubmit} className="h-auto w-fit bg-secondary rounded-md p-4 grid grid-cols-1 justify-items-start ">
      <div className="gap-2 flex flex-col items-start p-1 w-full justify-between h-fit">
        <label className="font-medium">Product Name:</label>
        <input
          type='text'
          name='productName'
          className="h-1/2 rounded-sm bg-background text-text"
          value={formData.productName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="gap-2 flex flex-col items-start  p-1 w-full justify-between h-fit">
        <label>Short Description:</label>
        <textarea
          name='shortDescription'
          value={formData.shortDescription}
          className="h-1/2 rounded-sm bg-background text-text w-full"
          onChange={handleInputChange}
          maxLength={150}
          required
        ></textarea>
      </div>
      <div className="gap-2 flex flex-col items-start  p-1 w-full justify-between h-fit">
        <label>Price:</label>
        <input
          type='number'
          step='0.01'
          name='price'
          className="h-1/2 rounded-sm bg-background text-text w-full"
          value={formData.price}
          onChange={handleInputChange}
          min={5}
          required
        />
      </div>
      <div className="gap-2 flex flex-col items-start  p-1 w-full justify-between h-fit">
        <label>Image:</label>
        <input
          type='file'
          accept='image/*'
          className="h-1/2 rounded-sm bg-background text-text w-full p-2"
          onChange={handleFileChange}
          required
        />
      </div>
      <button type='submit' className="h-10 w-full bg-accent text-background mt-6 rounded-lg hover:scale-95 transition-all ease-in-out duration-300">Add Product</button>
    </form>
  );
}
