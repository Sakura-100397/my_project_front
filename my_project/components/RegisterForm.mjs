"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios';
import useValidation from "./useValidation.mjs";
import { useEmployeeContext } from "../context/EmployeeContext";

const RegisterForm = () => {
    const {  error:validationError, validate } = useValidation();
    const router = useRouter();

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState([]);

    const { addEmployee } = useEmployeeContext();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { name, address, mail, phone_number, position, password };

        let formErrors = [];
        if (!name) formErrors.push("名前を入力してください");
        if (!address) formErrors.push("住所を入力してください");
        if (!mail) formErrors.push("メールアドレスを入力してください");
        if (!phone_number) formErrors.push("携帯番号を入力してください");
        if (!position) formErrors.push("役職を入力してください");
        if (!password) formErrors.push("パスワードを入力してください");

        if (formErrors.length > 0) {
            setErrors(formErrors);
            return; 
        }

        try {
            const res = await axios.post("http://localhost:5000/api/employees/register", formData, {
                headers: {  
                    "Content-Type": "application/json",
                },
            });

            const data = res.data;

            if (res.status === 200 && data.message) {
                router.push("/");  
            } else {
                setErrors(data.errors);
            }

        } catch (error) {
            if (error.response && error.response.data) {
                console.error("サーバーからのエラー:", error.response.data);  // エラーレスポンスをログ出力
                setErrors(error.response.data.errors || ["サーバーエラーが発生しました"]);
            } else {
                setErrors(["サーバーエラーが発生しました"]);
            }
    }
};



    return (
        <div>
            <h1>社員登録</h1>
        <div>
         {errors && errors.length > 0 && (
            <div>
             {errors.map((error, index) => (
             <p key={index}>
               {error.msg} 
             </p>
            ))}
             </div>
          )}
         </div>
                
            <form onSubmit={handleSubmit}>
                <div>
                    <label>名前：</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>住所：</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label>メールアドレス：</label>
                    <input
                        type="text"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                    />
                </div>
                <div>
                    <label>携帯番号：</label>
                    <input
                        type="tel"
                        value={phone_number}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </div>
                <div>
                    <label>役職：</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    />
                </div>
                <div>
                    <label>パスワード：</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">登録</button>
            </form>
    </div>
    );
};

export default RegisterForm;
