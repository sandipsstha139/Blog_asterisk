import { useNavigate } from 'react-router-dom';
import ApiRequest from '../utils/apiRequest';
import { toast } from 'react-toastify';
import { useContext, useEffect } from 'react';
import { Context } from '../context/Context';

const Homepage = () => {
  const {user} = useContext(Context);
  console.log(user);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await ApiRequest.get("/user/logout");
      navigate("/login")
      toast.success(res.data.message)
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    if(!user) {
      navigate("/login")
    }
  },[])


  return (
    <div className='flex flex-col justify-center items-center gap-5 h-screen'>
      <h1 className='text-center'>User Home page</h1>
      <button className='p-4 text-3xl bg-black text-white font-bold' onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Homepage;
