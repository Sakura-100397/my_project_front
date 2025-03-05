"use client";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import useValidation from "./useValidation.mjs";
import { useEmployeeContext } from "../context/EmployeeContext";

const RegisterForm = () => {
  const router = useRouter();
  const { addEmployee } = useEmployeeContext();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [mail, setMail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState("");
  const [errors, setErrors] = useState([]);

  const validateForm = () => {
    if (!name || !address || !mail || !phone_number || !position || !password) {
      // 未入力の項目がある場合、エラーメッセージを表示
      setFormErrors("全ての項目を入力してください");
      return false;
    }

    if ( name && !/^[a-zA-Zぁ-んァ-ン]+$/.test(name)){   
        setFormErrors('名前は文字列のみで入力してください');
        return false;
    }
    if ( address && !/^[a-zA-Zぁ-んァ-ン]+$/.test(address)){   
        setFormErrors('住所は文字列のみで入力してください');
        return false;
    }
    if ( mail && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(mail)){   
        setFormErrors('有効なメールアドレスを入力してください');
        return false;
    }
    if ( phone_number && !/^\d{10,11}$/.test(phone_number)){   
        setFormErrors('携帯番号はハイフンなしで10桁または11桁の数字で入力してください');
        return false;
    }
    if ( position && !/^[a-zA-Zぁ-んァ-ン]+$/.test(position)){   
        setFormErrors('役職は文字列のみで入力してください');
        return false;
    }
    if ( password && password.length < 8 ){   
        setFormErrors('パスワードは8文字以上で入力してください');
        return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ボタン押下時に未入力項目を確認し、未入力の場合はエラーメッセージを表示
    if (!validateForm()) {
      return;
    }

    const formData = { name, address, mail, phone_number, position, password };
    console.log("Form data: ", formData);

    try {
      const res = await axios.post("http://localhost:5000/api/employees/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      console.log("Response data: ", data);

      if (res.status === 200 && data.message) {
        router.push("/");
      } else {
        setErrors(data.errors);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Error response: ", error.response.data);
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
              <p key={index}>{error.msg}</p>
            ))}
          </div>
        )}
        {formErrors && <p>{formErrors}</p>}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>名前：</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>住所：</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label>メールアドレス：</label>
          <input type="text" value={mail} onChange={(e) => setMail(e.target.value)} />
        </div>
        <div>
          <label>携帯番号：</label>
          <input type="tel" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>
        <div>
          <label>役職：</label>
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} />
        </div>
        <div>
          <label>パスワード：</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">登録</button>
      </form>
    </div>
  );
};

export default RegisterForm;