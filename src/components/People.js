//Hooks
import {useState, useEffect} from "react"

//Styles
import styles from "./People.module.css"

const People = () => {
    let url = `https://swapi.dev/api/people/`
    const [peoples, setPeoples] = useState([])
    const [list, setList] = useState([])
    
    const myFunction = async () => {
      const res = await fetch(url)
      const data = await res.json()
      setPeoples(data.results)
      setList(data)
    }
    
    useEffect(() => {
        myFunction()
      }, [])

      //   useEffect(() => {
    //   fetch(url).then((response) => response.json().then(
    //     (data) => {
    //       setPeoples(data.results)
    //       setList(data)
    //       console.log(url)
    //     }
    //   )).catch((err) => {
    //     console.log('Erro:' + err.message)
    //   })
    // }, [url])
    
    const nextList = () => {
      url = list.next
      myFunction()
    }
    
    const prevList = () => {
      url = list.previous
      myFunction()
    }

  return (
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
                    <td>{people.homeworld}</td>
                </tr>
            ))}
        </tbody>
      </table>
      <div className={styles.flex_row}>
        <button className={list.previous === null ? styles.null : styles.button_prev + ' ' + styles.button} onClick={prevList}></button>
        <button className={list.next === null ? styles.null : styles.button_next + ' ' + styles.button}  onClick={nextList}></button>
      </div>
    </div>
  )
}

export default People