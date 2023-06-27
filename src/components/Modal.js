import React from 'react'
import styles from "./Modal.module.css"


const Modal = ({isOpen, setModalOpen, data}) => {

    if (isOpen) {
        return (
          <div className={styles.container}>
            <h1 className={styles.title}>{data.name}</h1>
            <div className={styles.info}>
                <p>Clima: {data.climate}</p>
                <p>Gravidade: {data.gravity}</p>
                <p>Terreno: {data.terrain}</p>
            </div>
            <button className={styles.btn} onClick={setModalOpen}>Close</button> 
          </div>
        )
    }
    return null
}

export default Modal