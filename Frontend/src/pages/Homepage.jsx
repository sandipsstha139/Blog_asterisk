import { useNavigate } from "react-router-dom";
import ApiRequest from "../utils/apiRequest";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { FaRegUser } from "react-icons/fa";
import Template from "../components/Template";
import Blog from "../components/Blog";
import SubCategory from "../components/SubCategory";
import Category from "../components/Category";

const Homepage = () => {
  const { user, isAuthenticated, setIsAuthenticated } = useContext(Context);
  const [showTemplate, setShowTemplate] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [selectOption, setSelectOption] = useState("Template");

  const handleShowTemplate = () => {
    setSelectOption("Template");
    setShowTemplate(true);
    setShowBlog(false);
    setShowCategory(false);
    setShowSubCategory(false);
  };
  const handleShowBlog = () => {
    setSelectOption("Blog");
    setShowTemplate(false);
    setShowBlog(true);
    setShowCategory(false);
    setShowSubCategory(false);
  };
  const handleShowCategory = () => {
    setSelectOption("Category");
    setShowTemplate(false);
    setShowBlog(false);
    setShowCategory(true);
    setShowSubCategory(false);
  };
  const handleShowSubCategory = () => {
    setSelectOption("Sub-Category");
    setShowTemplate(false);
    setShowBlog(false);
    setShowCategory(false);
    setShowSubCategory(true);
  };

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await ApiRequest.get("/user/logout");
      setIsAuthenticated(false);
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center py-4 px-10 bg-white shadow-sm">
        <div className="text-2xl font-semibold text-gray-900">
          <a href="#" className=" hover:text-blue-900 ease-in duration-300">
            Dashboard
          </a>
        </div>

        <div className="flex items-center gap-3">
          <h1 className="text-lg capitalize">{user.username}</h1>
          <FaRegUser className="text-2xl text-gray-900 cursor-pointer transition-colors duration-300 hover:text-gray-600" />
        </div>
      </header>
      <div className="flex">
        <aside className="w-1/5 bg-white text-gray-900 min-h-screen py-6 px-4 shadow-sm border-r-2">
          <div className="flex flex-col gap-6 px-6">
            <ul className="space-y-6 text-lg ">
              <li
                className={`hover:text-gray-600 transition-colors cursor-pointer ${
                  selectOption === "Template"
                    ? "bg-purple-400 py-2 px-4 rounded-full"
                    : ""
                }`}
                onClick={handleShowTemplate}
              >
                Template
              </li>
              <li
                className={`hover:text-gray-600 transition-colors cursor-pointer ${
                  selectOption === "Blog"
                    ? "bg-purple-400 py-2 px-4 rounded-full"
                    : ""
                }`}
                onClick={handleShowBlog}
              >
                Blog
              </li>
              <li
                className={`hover:text-gray-600 transition-colors cursor-pointer ${
                  selectOption === "Category"
                    ? "bg-purple-400 py-2 px-4 rounded-full"
                    : ""
                }`}
                onClick={handleShowCategory}
              >
                Category
              </li>
              <li
                className={`hover:text-gray-600 transition-colors cursor-pointer whitespace-nowrap ${
                  selectOption === "Sub-Category"
                    ? "bg-purple-400 py-2 px-4 rounded-full"
                    : ""
                }`}
                onClick={handleShowSubCategory}
              >
                Sub Category
              </li>
            </ul>
            <div>
              <button
                onClick={handleLogout}
                className="px-6 py-1 bg-purple-600 text-white font-semibold rounded-md shadow-2xl ease-in duration-300 hover:bg-purple-700"
              >
                Logout
              </button>
            </div>
          </div>
        </aside>
        <main className="flex-1 bg-white p-10 text-gray-800">
          {showTemplate && (
            <div>
              <Template />
            </div>
          )}
          {showBlog && <Blog />}
          {showCategory && <Category />}
          {showSubCategory && <SubCategory />}
        </main>
      </div>
    </div>
  );
};

export default Homepage;
