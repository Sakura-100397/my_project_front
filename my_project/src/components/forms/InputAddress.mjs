const InputAddress = ({ register, errors}) => {    
    return( 
        <div>
          <label htmlFor= "address">住所：</label>
          <input    
              id= "address"  type="text" className="input-address" 
          {...register("address", { required: "住所を入力してください。"})} />

          {errors.address && <div className="error-msg">{errors.address.message}</div>}   
        </div>
    );
};

export default InputAddress;

