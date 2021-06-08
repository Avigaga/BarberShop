import React, { useState, createRef, forwardRef, useEffect } from 'react';
import './Popup.scss';


const Popup = forwardRef((props, ref) => {
    const showHideClassName = props.show ? "popup-container" : "popup-container display-none";

     const onSubmitClick = () => {
        props.handleSubmit();
    }


    return (
        <div className={showHideClassName}>
            <div className={`modal ${props.modalClassName ? props.modalClassName : ""} `}>
                <div className="alert-title">{"פרטי לקוח:"}</div>
                <div className="wrap">
                    <div className="text">שם לקוח:</div><div >{props.item.nickName}</div></div>
                <div className="wrap">
                    <div className="text">מוזמן לשעה:</div><div >{props.item.queueTime}</div></div>
                <div className="wrap">
                    <div className="text">שעת ההזמנה:</div><div >{props.item.orderTime}</div></div>
                <div className="error-text">{props.errorText ? props.errorText : ""}</div>
                <>
                    <button className="confirm" onClick={onSubmitClick} id="btn-alert-confirm"> לסגירה</button>
                </>

            </div>
        </div>
    );
})

export default Popup;