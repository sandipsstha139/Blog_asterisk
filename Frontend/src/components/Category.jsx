import { useEffect, useState } from "react";
import ApiRequest from "../utils/apiRequest";
import { RxUpdate } from "react-icons/rx";
import { FiDelete } from "react-icons/fi";
import { toast } from "react-toastify";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showUpdateCategory, setShowUpdateCategory] = useState(false);
  const [updateCategoryName, setUpdateCategoryName] = useState(null);
  const [updateCategoryId, setUpdateCategoryId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  useEffect(() => {
    getAllCategory();
    getTemplate();
  }, []);

  const getAllCategory = async () => {
    try {
      setLoading(true);
      const res = await ApiRequest.get("/34/category");
      setCategory(res.data.categories);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to fetch categories.");
    }
  };

  const getTemplate = async () => {
    try {
      const res = await ApiRequest.get("/template");
      const data = res.data.templates;
      const item = data.map((item) => item);
      setTemplate(item);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch templates.");
    }
  };

  const handleShowCreateCategory = () => {
    setShowCreateCategory(!showCreateCategory);
    setShowUpdateCategory(false);
  };

  const handleShowUpdateCategory = (id, name) => {
    setUpdateCategoryId(id);
    setUpdateCategoryName(name)
    setShowUpdateCategory(!showUpdateCategory);
    setShowCreateCategory(false);
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    console.log(selectedTemplateId)
    try {
      setLoading(true);
        const newCategory = await ApiRequest.post(`/${selectedTemplateId}/category`, {
        categoryName
      });
      setShowCreateCategory(false);
      setCategoryName("");
      setSelectedTemplateId(null);
      toast.success(newCategory.data.message);
      getAllCategory();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to create category.");
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedCategory = await ApiRequest.put(
        `/${selectedTemplateId}/category/${updateCategoryId}`,
        { categoryName:updateCategoryName, templateId: selectedTemplateId }
      );
      setShowUpdateCategory(false);
      setUpdateCategoryName("");
      toast.success(updatedCategory.data.message);
      getAllCategory();
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to update category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      setLoading(true);
      const res = await ApiRequest.delete(`/34/category/${id}`);
      setCategory(category.filter((category) => category.id !== id));
      setLoading(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Failed to delete category.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-end mb-6">
        <button
          className="bg-purple-500 text-white py-2 px-4 rounded-full hover:bg-purple-600 transition duration-300"
          onClick={handleShowCreateCategory}
        >
          {showCreateCategory ? "Cancel" : "Create New Category"}
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 pb-2">
        Categories
      </h1>

      {showCreateCategory && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <form
            onSubmit={handleCreateCategory}
            className="flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
            <input
              type="text"
              placeholder="Enter Category Name"
              className="mb-4 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <select
              value={selectedTemplateId || ""}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="mb-4 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" selected>Select a Template</option>
              {template.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.templateName}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition duration-300"
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          </form>
        </div>
      )}

      {showUpdateCategory && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <button
            className="bg-purple-600 p-2 rounded-md text-white"
            onClick={handleShowUpdateCategory}
          >
            {showUpdateCategory ? "Cancel" : ""}
          </button>
          <form
            onSubmit={handleUpdateCategory}
            className="flex flex-col items-center"
          >
            <h2 className="text-xl font-semibold mb-4">Update Category</h2>
            <input
              type="text"
              placeholder="Enter Category Name"
              className="mb-4 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={updateCategoryName}
              onChange={(e) => setUpdateCategoryName(e.target.value)}
            />
            <select
              value={selectedTemplateId || ""}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="mb-4 px-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>Select a Template</option>
              {template.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.templateName}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-yellow-500 text-white py-2 px-6 rounded-full hover:bg-yellow-600 transition duration-300"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      )}

      {!showCreateCategory && !showUpdateCategory && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            <p className="text-center col-span-full">Loading...</p>
          ) : (
            category.map((category) => (
              <div
                key={category.id}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <div className="flex items-center justify-center bg-purple-500 p-4 h-24 text-xl font-semibold text-white">
                  {category.categoryName}
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-100">
                  <button
                    className="text-purple-600 hover:text-purple-800 transition duration-300"
                    onClick={() => handleShowUpdateCategory(category.id, category.categoryName)}
                  >
                    <RxUpdate size={24} />
                  </button>
                  <button
                    className="text-red-600 hover:text-red-800 transition duration-300"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    <FiDelete size={24} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Category;
