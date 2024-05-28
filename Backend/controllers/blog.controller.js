import Blog from '../models/blog.model.js';
import { CatchAsync } from '../utils/catchAsync.js';

export const createBlog = CatchAsync(async (req, res, next) => {

      const blog = {
      blogName: req.body.blogName,
      ...req.obj,
      sections: req.body.sections,
    };
    console.log(blog)
    const sectionsData = JSON.parse(blog.sections).map((value, i) => {
      const { name, text } = value;
      const image = `localhost:3000/${req.files[i].filename}`;
      return { name, text, image };
    });
    blog.sections = sectionsData;
 
      const newBlog = await Blog.create(blog);
      res.json({
        success: true,
        message: "Blog Created Successfully",
        newBlog,
      })
});

export const testController = CatchAsync(async (req, res, next) => {
    const {blogName} = req.body;
    console.log(req.body);
    console.log(req.files)
    res.json({
        status: "success",
        data: {
            "form_data": blogName
        }
        
    })
});

// export const createBlog = async (req, res) => {
//   const blog = {
//     blogName: req.body.blogName,
//     ...req.obj,
//     sections: req.body.sections,
//   };
//   const sectionsData = JSON.parse(blog.sections).map((value, i) => {
//     const { name, text } = value;
//     const image = `localhost:8000/${req.files[i].filename}`;
//     return { name, text, image };
//   });
//   blog.sections = sectionsData;
//   // console.log(blog);
//   try {
//     const _blog = await Blog.create(blog);
//     res.json({
//       success: true,
//       message: "Blog Created Successfully",
//       _blog,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const readBlog = async (req, res) => {
//   try {
//     const blogs = await Blog.findAll();
//     res.json({
//       success: true,
//       message: "blogs read successfully",
//       blogs: blogs,
//     });
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const getBlogID = async (req, res) => {
//   try {
//     const blog = await Blog.findByPk(req.params.id);
//     if (blog) {
//       res.json({
//         success: true,
//         message: "blog found successfully ",
//         result: blog,
//       });
//     } else {
//       res.json({
//         success: false,
//         message: "Blog not found",
//       });
//     }
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const updateBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByPk(req.params.id);
//     if (blog) {
//       await blog.update(req.body);
//       res.json({
//         success: true,
//         message: "blog updated successfully ",
//       });
//     }
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// export const deleteBlog = async (req, res) => {
//   try {
//     const blog = await Blog.findByPk(req.params.id);
//     console.log(blog);
//     if (blog) {
//       await blog.destroy();
//       res.json({
//         success: true,
//         message: "blog deleted successfully",
//       });
//     }
//   } catch (error) {
//     res.json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
