const InputPassword = ({ register, errors}) => {    
    return( 
        <div>
          <label htmlFor= "password">パスワード：</label>
          <input    
              id= "password" type="password" className="input-password"  
          {...register("password",  
          { required: "パスワードを入力してください。",   
            pattern: {value: /^[A-Za-z0-9]{8,}$/ ,message: "パスワードは8文字以上の英数字で入力してください。"}
          })} />

          {errors.password && <div className="error-msg">{errors.password.message}</div>}
        </div>
    );
};

export default InputPassword;