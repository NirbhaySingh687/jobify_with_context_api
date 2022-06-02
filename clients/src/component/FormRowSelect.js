import React from "react";

function FormRowSelect({ labelText, name, value, handleChange, lists }){
    return(
        <div className="form-row">
            <label htmlFor={name} className="form-label">{labelText || name}</label>
            <select name={name} value={value} onChange={handleChange} className="form-select">
                {
                    lists.map((itemValue, index) => (
                        <option key={index} value={itemValue}>{itemValue}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default FormRowSelect