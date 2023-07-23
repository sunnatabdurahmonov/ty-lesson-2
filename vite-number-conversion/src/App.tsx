import { ChangeEvent, useState } from 'react'
import styles  from './home.module.css'
import { IData } from './interface'



const App = () : JSX.Element => {
  const datas : IData[] = [
    {title: 'Mehroj', id : 1, status: 'student'},
    {title: 'Samandar', id : 2, status: 'student'},
    {title: 'Muhammad', id : 3, status: 'student'},
  ]
  const [title, setTitle] = useState<string>()
  const [arr,setArr] = useState<IData[]>(datas)
  const [edit,setEdit] = useState<number| null>()
 

  const handeChange = (e:ChangeEvent<HTMLInputElement>) :void => {
    setTitle(e.target.value)
  }

  console.log(edit);
  

  const handleSubmit = () : void  => {
    if(!title?.length) return
    const newData = {
      title: title,
      id:new Date().getTime(),
      status:'Status'
    }
    setArr([...arr,newData])

    setTitle('')

    
  }




  const DeleteSubmit = (id :number) : void => {
    const newData = arr.filter(a => a.id !== id)
    setArr(newData)
  }

  const saveSubmit = (id:number) => {
    let newInfo = [...arr].map((item:any) => {
      if(item.id == id){
        item.title = title
      }
      return item
    })
    setEdit(null)
    setArr(newInfo)
    setTitle('')
   
  }
  const editSubmit = (id : number, title : string)  : void => {
    setEdit(id)
    setTitle(title)

  }

  
  return (
    <>
        <div className={styles.todo}>
    <h1 className={styles.title}>APP TODO</h1>
      <input placeholder='Enter Todo' className={styles.input} value={title} onChange={handeChange}/>
      <button onClick={handleSubmit} className={styles.button}>Add Todo</button>


      <div className={styles.card}>
   <div>
   {
    arr.map(info => (
      <div className={styles.cardItem} key={info.id}>
            <h3>{info.title}</h3>
         <div className={styles.btnMenu}>
             <button className={styles.delBtn} onClick={() => DeleteSubmit(info.id)}>Delete</button>
             
             {edit && info.id === edit ? (
              <button className={styles.edit} onClick={() => saveSubmit(info.id)}>Save</button>
             ): (<button className={styles.edit} onClick={() => editSubmit(info.id,info.title)}>Edit</button>)}
         </div>
       </div>
 
 
 ))
   }
   </div>
      </div>
    </div>
    </>

    
  )
}

export default App
