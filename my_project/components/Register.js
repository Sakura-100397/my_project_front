"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEmployeeContext } from "../context/EmployeeContext";
import useValidation from "./useValidation.mjs";
import RegisterForm from "@/app/components/RegisterForm.mjs";

export default function Register() {
    const [error, setError] = useState("");
    const router = useRouter();
    const { addEmployee } = useEmployeeContext();
    const { error: validationError, validate } = useValidation();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        if (!validate(data.name, data.address, data.mail, data.phone_number, data.position, data.password)) {
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

            addEmployee(employee);
            router.push("/"); 
        } catch (err) {
            setError("ネットワークエラーが発生しました");
            console.error(err);
        }
    };

    return <RegisterForm onSubmit={handleSubmit} errorMessage={error} />;
}
