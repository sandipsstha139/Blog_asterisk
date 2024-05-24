import { useFormik } from "formik";
import {  resetSchema } from "../schemas";

const ResetPassword = () => {
  const initialValues = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: resetSchema,
    onSubmit: (values) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-extrabold mb-6 text-gray-900 text-center">
          Reset Password
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Current Password"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            name="currentPassword"
            value={values.currentPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.currentPassword && touched.currentPassword ? (
            <p className="text-red-500 text-sm">{errors.currentPassword}</p>
          ) : null}
          <input
            type="password"
            placeholder="New Password"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            name="newPassword"
            value={values.newPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.newPassword && touched.newPassword ? (
            <p className="text-red-500 text-sm">{errors.newPassword}</p>
          ) : null}
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            name="confirmPassword"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword ? (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          ) : null}
          <button
            type="submit"
            className="bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
