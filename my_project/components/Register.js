"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { useEmployeeContext } from "../context/EmployeeContext";
import useValidation from "./useValidation.mjs";
import RegisterForm from "@/app/components/RegisterForm.mjs";

export default function Register() {
    const [error, setError] = useState("");
    const router = useRouter();
    const { addEmployee } = useEmployeeContext();
    const { error: validationError, validate } = useValidation();

    const handleSubmit = async (formData) => {

        if (!validate(formData.name, formData.address, formData.mail, formData.phone_number, formData.position, formData.password)) {
            setError(validationError); 
            return;
        }
    
        try {
            const res = await fetch("/employees/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
    
            if (!res.ok) {
                throw new Error("登録に失敗しました");
            }
    
    
            const newEmployee = await res.json();
            console.log(newEmployee);
            if (newEmployee) {
                addEmployee(newEmployee);
            } else {
                throw new Error("無効な社員データ");
            }
    
            router.push("/"); 
    
        } catch (err) {
            setError("ネットワークエラーが発生しました");
            console.error(err);
        }
    };
    
    return <RegisterForm    
                onSubmit={handleSubmit}     
                errorMessage={error}    
            />;
}
