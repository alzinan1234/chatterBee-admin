
 "use client";
import React, { useState } from 'react';

// --- Helper Components & Icons ---

// A simple SVG icon for the plus sign
const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

// A simple SVG icon for uploading files
const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L13 9.414V13h-2.5z" />
        <path d="M9 13h2v5H9v-5z" />
    </svg>
);


// --- Main Components ---

/**
 * AddCategory Component
 * Renders a form to add a new category.
 * @param {object} props - Component props
 * @param {function} props.onAddCategory - Function to call when a new category is added.
 * @param {function} props.onCancel - Function to call when the operation is cancelled.
 */
const AddCategory = ({ onAddCategory, onCancel }) => {
  const [categoryName, setCategoryName] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      // Simple validation
      alert('Category name is required.');
      return;
    }
    const newCategory = {
      id: Date.now(), // Use a timestamp for a unique ID
      name: categoryName,
      imageUrl: imagePreview || 'https://placehold.co/40x40/EBF4FF/333333?text=N/A', // Use placeholder if no image
    };
    onAddCategory(newCategory);
  };

  return (
    <div className=" p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Type the word"
            className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition placeholder-gray-500"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image/Icon</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-24 object-cover rounded-md" />
              ) : (
                <UploadIcon />
              )}
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500">
                  <span>Upload Image</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/jpeg, image/png" />
                </label>
              </div>
              <p className="text-xs text-gray-500">Image must be in JPG or PNG format and at least 100*100 pixels.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * EditCategory Component
 * Renders a form to edit an existing category.
 * @param {object} props - Component props
 * @param {object} props.category - The category object to edit.
 * @param {function} props.onUpdateCategory - Function to call when the category is updated.
 * @param {function} props.onCancel - Function to call when the operation is cancelled.
 */
const EditCategory = ({ category, onUpdateCategory, onCancel }) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(category.imageUrl);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!categoryName.trim()) {
      alert('Category name is required.');
      return;
    }
    const updatedCategory = {
      ...category,
      name: categoryName,
      imageUrl: imagePreview,
    };
    onUpdateCategory(updatedCategory);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Type the word"
            className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition placeholder-gray-500"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Image/Icon</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
            <div className="space-y-1 text-center">
              {imagePreview ? (
                 <img src={imagePreview} alt="Preview" className="mx-auto h-24 w-24 object-cover rounded-md" />
              ) : (
                <UploadIcon />
              )}
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-yellow-600 hover:text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-yellow-500">
                  <span>Upload Image</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/jpeg, image/png" />
                </label>
              </div>
              <p className="text-xs text-gray-500">Image must be in JPG or PNG format and at least 100*100 pixels.</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-start gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-400 text-gray-800 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};


/**
 * CategoryList Component
 * Displays the list of all categories in a table.
 * @param {object} props - Component props
 * @param {array} props.categories - The array of category objects.
 * @param {function} props.onEdit - Function to handle editing a category.
 * @param {function} props.onDelete - Function to handle deleting a category.
 */
const CategoryList = ({ categories, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-8 rounded-xl shadow-lg w-full bg-white  border-gray-900">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Category List</h2>
      <div className="overflow-x-auto  border">
        <table className="w-full  text-sm ">
          <thead>
            <tr className=" border  border-gray-200 divide-y-reverse  bg-gray-50">
              <th className="text-left p-4 font-semibold text-gray-600">Category Text</th>
              <th className="text-center p-4 font-semibold text-gray-600">Image</th>
              <th className="text-center p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {currentCategories.map((category) => (
              <tr key={category.id} className="border-b text-center hover:bg-gray-50">
                <td className="p-4 text-left text-gray-800">{category.name}</td>
                <td className="p-4 text-center">
                  <img src={category.imageUrl} alt={category.name} className="h-10 w-10 mx-auto  object-cover rounded-md" 
                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/FFCDD2/F44336?text=Error'; }}
                  />
                </td>
                <td className="p-4  text-center">
                  <div className="flex gap-2 items-center justify-center">
                    <button
                      onClick={() => onEdit(category)}
                      className="px-4 py-1.5 bg-teal-100 text-teal-700 rounded-lg text-sm font-semibold hover:bg-teal-200 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(category.id)}
                      className="px-4 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-semibold hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && (
          <p className="text-center text-gray-500 py-8">No categories found. Add one to get started!</p>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
            <div className="flex flex-1 justify-between items-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                Previous
              </button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md ${
                      currentPage === index + 1
                        ? 'bg-yellow-400 text-white'
                        : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


/**
 * App Component (Main)
 * The root component that manages state and renders other components.
 */
export default function Categoary() {
  // --- State Management ---
  const [categories, setCategories] = useState([
    { id: 1, name: 'Emotions', imageUrl: 'https://placehold.co/40x40/EBF4FF/3B82F6?text=😊' },
    { id: 2, name: 'Apple', imageUrl: 'https://placehold.co/40x40/FEE2E2/DC2626?text=🍎' },
    { id: 3, name: 'Water', imageUrl: 'https://placehold.co/40x40/DBEAFE/3B82F6?text=💧' },
    { id: 4, name: 'Tea', imageUrl: 'https://placehold.co/40x40/D1FAE5/10B981?text=🍵' },
    { id: 5, name: 'Juice', imageUrl: 'https://placehold.co/40x40/FEF3C7/F59E0B?text=🧃' },
    { id: 6, name: 'Dinner', imageUrl: 'https://placehold.co/40x40/E0E7FF/4F46E5?text=🍽️' },
    { id: 7, name: 'breakfast', imageUrl: 'https://placehold.co/40x40/FCE7F3/EC4899?text=🥞' },
    { id: 8, name: 'Snacks', imageUrl: 'https://placehold.co/40x40/F3E8FF/8B5CF6?text=🍿' },
    { id: 9, name: 'Fruits', imageUrl: 'https://placehold.co/40x40/FEF9C3/CA8A04?text=🍓' },
  ]);

  const [currentPage, setCurrentPage] = useState('list'); // 'list', 'add', 'edit'
  const [editingCategory, setEditingCategory] = useState(null);

  // --- CRUD Handlers ---

  const handleAddCategory = (newCategory) => {
    setCategories([...categories, newCategory]);
    setCurrentPage('list');
  };

  const handleUpdateCategory = (updatedCategory) => {
    setCategories(
      categories.map((cat) =>
        cat.id === updatedCategory.id ? updatedCategory : cat
      )
    );
    setCurrentPage('list');
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id) => {
    // A simple confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter((category) => category.id !== id));
    }
  };

  const handleEditClick = (category) => {
    setEditingCategory(category);
    setCurrentPage('edit');
  };

  const handleCancel = () => {
    setCurrentPage('list');
    setEditingCategory(null);
  };

  // --- Render Logic ---

  const renderContent = () => {
    switch (currentPage) {
      case 'add':
        return <AddCategory onAddCategory={handleAddCategory} onCancel={handleCancel} />;
      case 'edit':
        return <EditCategory category={editingCategory} onUpdateCategory={handleUpdateCategory} onCancel={handleCancel} />;
      default:
        return <CategoryList categories={categories} onEdit={handleEditClick} onDelete={handleDeleteCategory} />;
    }
  };

  return (
    <div className=" w-full  min-h-screen font-sans p-4 sm:p-6 lg:p-8">
      <div className=" ">
        <header className=" w-full flex justify-between items-center  mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Category Management</h1>
          {currentPage === 'list' && (
             <button 
                onClick={() => setCurrentPage('add')}
                className="flex items-center justify-center bg-yellow-400 text-gray-800 font-semibold py-2 px-5 rounded-lg shadow-md hover:bg-yellow-500 transition-all duration-300"
            >
                <PlusIcon />
                Add Category
            </button>
          )}
        </header>

        <main className='w-full '>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
