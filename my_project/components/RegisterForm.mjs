"use client";
import { useState } from "react";

const RegisterForm = ({ onSubmit, errorMessage}) => {  

    const [ name, setName] = useState("");
    const [ address, setAddress] = useState("");
    const [ mail, setMail] = useState("");
    const [ phone_number, setPhone_Number] = useState("");
    const [ position, setPosition] = useState("");
    const [ password, setPassword] = useState("");

    const handleSubmit = (e) => {   
        e.preventDefault();
        if (typeof onSubmit === "function") {  
            onSubmit(name, address, mail, phone_number, position, password);
        }else{  
            console.error("onSubmit is not a function")
        }
       
    };

    return (    
        <div>   
            <h1>社員登録</h1>
            {errorMessage && <p style={{ color: "red"}}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
        <div> 
            <label>名前：</label>
            <input  
             type= "text"
             value={name}
             onChange={(e) => setName ( e.target.value)}
             />       
        </div>
        <div> 
            <label>住所：</label>
            <input  
             type= "text"
             value={address}
             onChange={(e) => setAddress ( e.target.value)}
             />       
        </div>
        <div> 
            <label>メールアドレス：</label>
            <input  
             type= "text"
             value={mail}
             onChange={(e) => setMail ( e.target.value)}
             />       
        </div>
        <div> 
            <label>携帯番号：</label>
            <input  
             type= "tel"
             value={phone_number}
             onChange={(e) => setPhone_Number ( e.target.value)}
             />       
        </div>
        <div> 
            <label>役職：</label>
            <input  
             type= "text"
             value={position}
             onChange={(e) => setPosition ( e.target.value)}
             />       
        </div>
        <div> 
            <label>パスワード：</label>
            <input  
             type= "password"
             value={password}
             onChange={(e) => setPassword ( e.target.value)}
             />       
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type= "submit">登録</button>
            </form>
        </div>
    );
};

export default RegisterForm;
