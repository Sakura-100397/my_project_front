const InputPhonenumber = ({ register, errors}) => {    
    return( 
        <div>
          <label htmlFor= "phone_number">携帯番号：</label>
          <input    
             id= "phone_number" type="text" className="input-phone_number" 
          {...register("phone_number",  
          { required: "携帯番号を入力してください。",   
            pattern:{ value:/^\d{10,11}$/, message: "携帯番号はハイフンなしで10桁または11桁の数字で入力してください。"} 
          })} />

          {errors.phone_number && <div className="error-msg">{errors.phone_number.message}</div>}
        </div>
    );
};

export default InputPhonenumber;


