const InputPassword = ({ register, errors}) => {    
    return( 
        <div>
          <label htmlFor= "password">パスワード：</label>
          <input    
              id= "password" type="text" className="input-password"  
          {...register("password",  
          { required: "パスワードを入力してください。",   
            minLength: {value: 8, message: "パスワードは8文字以上で入力してください。"}
          })} />

          {errors.password && <div className="error-msg">{errors.password.message}</div>}
        </div>
    );
};

export default InputPassword;