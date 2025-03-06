const InputPosition = ({ register, errors}) => {    
    return( 
        <div>
          <label htmlFor= "position">役職：</label>
          <input    
              id= "position" type="text" className="input-position" 
          {...register("position",  
           { required: "役職を入力してください。",  
            pattern:{ value:/^[a-zA-Zぁ-んァ-ン\s]+$/, message: "役職は文字列のみで入力してください。"}
           })} />

          {errors.position && ( 
            <div className="error-msg">{errors.position.message}</div>
          )}
        </div>
    );
};

export default InputPosition;

