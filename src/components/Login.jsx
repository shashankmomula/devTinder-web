import axios from "axios";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {

  
const [emailId,setEmailId] = useState("shashank@gmail.com");
const [password,setPassword] = useState("Shashank_123");
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogin = async() =>{

  try{

    const res = await axios.post(BASE_URL + "/login",{
      emailId,
      password,
    },{withCredentials:true});

   

    dispatch(addUser(res.data));
    navigate("/");
  }catch(err){
    console.error(err);
  }
}
  return (
    <div className="flex justify-center my-16">
       <div className="card bg-base-300 w-96 shadow-xl">
  <div className="card-body">
    <h2 className="card-title flex justify-center">Login</h2>
    <div>
    <label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Email Id: {emailId}</span>
  </div>
  <input type="text" 
  value={emailId}
  className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>setEmailId(e.target.value)}/>
  
</label>

<label className="form-control w-full max-w-xs my-2">
  <div className="label">
    <span className="label-text">Password</span>
  </div>
  <input type="text" 
  value={password}
  className="input input-bordered w-full max-w-xs"
  onChange={(e)=>setPassword(e.target.value)}
  />
  
</label>
    </div>
    <div className="card-actions flex justify-center my-1">
      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
    </div>
   
  )
}

export default Login