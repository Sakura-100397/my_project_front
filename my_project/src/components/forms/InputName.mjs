const employeeName = "名前"; 

const InputEmployeeName = ({ register, errors}) => {    
    return( 
        <div>
          <label htmlFor= "employeeName">名前：</label>
          <input    
          id= "employeeName"  type="text" className="input-employeeName" 
          {...register("employeeName",  
            { required: "名前を入力してください。",      
              pattern:{ value:/^[a-zA-Zぁ-んァ-ン\s]+$/, message: "名前は文字列のみで入力してください。"}  
          })} />

          {errors.employeeName && ( 
            <div className="error-msg">{errors.employeeName.message}</div>
          )}
        </div>
    );
};

export default InputEmployeeName;

