//Hooks
import {useState, useEffect} from "react"

import Modal from "./Modal"
//Styles
import styles from "./People.module.css"

const People = () => {
    let url = `https://swapi.dev/api/people/`
    const [peoples, setPeoples] = useState([])
    const [planet, setPlanet] = useState([])
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    
    const getPeoples = async () => {
      const res = await fetch(url)
      const data = await res.json()
      setPeoples(data.results)
      setList(data)
    }

    const getPlanet = async (people) => {
      const res = await fetch(people)
      const info = await res.json()
      setPlanet(info)
    }

    useEffect(() => {
        getPeoples()
        loadingPage()
      }, [])

    const loadingPage = () => {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 5000)
    }
    
    const nextList = () => {
      url = list.next
      getPeoples(list.next) //tentar passar aqui
    }
    
    const prevList = () => {
      url = list.previous
      getPeoples()
    }

  return (
    <div>
      { loading ?
      <div className={styles.loading}>
        <p className={styles.carregando}>Carregando....</p>
        <span className={styles.saber}></span>
        <span className={styles.saber1}></span>
      </div>
      :
        <div className={styles.people_container}>
          <h1 className={styles.title}>Star Wars</h1>
          <table className={styles.table}>
              <thead className={styles.table_head}>
                  <tr>
                      <th>NOME</th>
                      <th>PESO</th>
                      <th>ALTURA</th>
                      <th>PLANETA</th>
                  </tr>
              </thead>
            <tbody> 
                {peoples.map((people)=>(
                  <tr key={people.url}>
                      <td className={styles.left_align}>{people.name}</td>
                      <td>{people.mass}</td>
                      <td>{people.height}</td>
                      <td>
                        <button onClick={() => {setOpenModal(true); getPlanet(people.homeworld)}}>see more</button>
                      </td>
                    </tr>
                ))}
            </tbody>
          </table>
          <div className={styles.flex_row}>
            <button className={list.previous === null ? styles.null : styles.button_prev + ' ' + styles.button} onClick={prevList}></button>
            <button className={list.next === null ? styles.null : styles.button_next + ' ' + styles.button}  onClick={nextList}></button>
          </div>
          <div>
            <Modal 
              isOpen={openModal} 
              data={planet}
              setModalOpen={() => setOpenModal(!openModal)}>
            </Modal>
          </div>
        </div>
      }
    </div>
  )
}

export default People