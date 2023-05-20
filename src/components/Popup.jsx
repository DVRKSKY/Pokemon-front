import React from 'react';
import style from '.././modules/popup.module.sass';

export default function Popup(props) {
  const { handleClose, show, children } = props;
  const showHideClassName = show ? `${style.modal} ${style.displayBlock}` : `${style.modal} ${style.displayNone}`;

  return (
    <div className={showHideClassName}>
      <section className={style.modalMain}>
        <span style={{cursor: "pointer", position: "absolute", top: "8%", left: "8%", color:"#E60012"}} onClick={handleClose} className="material-symbols-outlined">close</span>
        {children}
      </section>
    </div>
  );
}
