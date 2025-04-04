import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios'
import { endpoints } from "../../../constant/endpoints";
import { useNavigate } from "react-router-dom";
function Register() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = () => {
        // TODO: kullanıcı adı ve şifre boş geçilmemeli
        if(username==='' || password==='' || email===''){
          alert("Kullanıcı adı, şifre veya email  alanları boş geçilemez.")
          return;
        }

        axios.post(
            import.meta.env.VITE_BASE_URL + endpoints.register, {
                username: username,
                password: password,
                email: email
            }
        ).then((response) => {
            navigate('/login')
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
          <div className="text-base">Register Form</div>


         
          <TextField
            id="outlined-basic"
            label="Username"
            variant="filled"
            className="w-full"
            onChange={(e) => setUsername(e.target.value)}
          />

            <TextField
            id="outlined-basic"
            label="Email"
            variant="filled"
            className="w-full"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            id="outlined-basic"
            label="********"
            variant="filled"
            className="w-full"
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

export default Register;
