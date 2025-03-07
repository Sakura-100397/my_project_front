const InputMail = ({ register, errors}) => {    
    return( 
        <div>
          <label htmlFor= "mail">メールアドレス：</label>
          <input    
              id= "mail"  type="text" className="input-mail"

              {...register("mail",  
                { required: "メールアドレスを入力してください。",     
                  pattern:{ value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "有効なメールアドレスを入力してください。"}  
                })}
          />
          {errors.mail && <div className="error-msg">{errors.mail.message}</div>}
        </div>
    );
};

export default InputMail;

