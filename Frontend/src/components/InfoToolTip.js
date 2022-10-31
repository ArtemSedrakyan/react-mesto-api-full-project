import React from "react";
import successIcon from '../images/reg_check_success.svg';
import failIcon from '../images/reg_check_fail.svg';


function InfoToolTip(props) {
  return(
    <div className={`popup ${props.isOpen && 'popup_opened'} `}>
      <div className="popup__form">
        <button className="popup__close-button" type="button"
        aria-label="Закрыть" onClick={props.onClose} />
        <img className="popup__check-img" src={props.status
          ? successIcon : failIcon} alt={props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        />
        <p className="popup__check-message">
          {props.status ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}

export default InfoToolTip;
