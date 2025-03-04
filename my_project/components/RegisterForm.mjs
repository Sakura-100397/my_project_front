"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import useValidation from "./useValidation.mjs";
import { useEmployeeContext } from "../context/EmployeeContext";

const RegisterForm = () => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [mail, setMail] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [position, setPosition] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); 
    const { addEmployee } = useEmployeeContext();
    const { error: validationError, validate } = useValidation();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = { name, address, mail, phone_number, position, password };

        if (!validate(formData.name, formData.address, formData.mail, formData.phone_number, formData.position, formData.password)) {
            setErrorMessage(validationError);
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/employees/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const text = await res.text();
            console.log("レスポンス",text);

            if (!res.ok) {
                throw new Error("登録に失敗しました");
            }
            const resJson = JSON.parse(text);
            console.log('登録されたでーた',resJson); 
            const newEmployee = resJson;

            if (newEmployee && newEmployee.id) {
                addEmployee(newEmployee);
            } else {
                throw new Error("無効な社員データ");
            }

            router.push("/"); 

        } catch (err) {
            setErrorMessage("ネットワークエラーが発生しました");
            console.error("エラー", err);
        }
    };

    return (
        <div>
            <h1>社員登録</h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* エラーメッセージの表示 */}
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
