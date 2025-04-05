import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { endpoints } from "../../../constant/endpoints";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleFormSubmit = () => {
        if(username==='' || password===''){
          alert("Kullanıcı adı ve şifre alanları boş geçilemez.")
          return;
        }
        axios.post(
            import.meta.env.VITE_BASE_URL + endpoints.login, {
                username: username,
                password: password,
            }
        ).then((response) => {
          navigate("/")
          
        })
        .catch((error) => {
          const err = error.response.data;
          alert(err.message)
        })


    }
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-1/2 flex flex-col gap-4">
          <div className="text-base">Login Form</div>


         
          <TextField
            id="outlined-basic"
            label="Username"
            variant="filled"
            className="w-full"
            onChange={(e) => setUsername(e.target.value)}
          />


          <TextField
            id="outlined-basic"
            label={
              password.length > 0 ? "Password": "********"
            }
            variant="filled"
            className="w-full"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" className="!bg-gray-500"
           onClick={handleFormSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
