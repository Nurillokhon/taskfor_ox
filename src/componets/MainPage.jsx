import React ,{useEffect, useState}from 'react';
import { Pagination , Card} from 'antd'
import { Link } from 'react-router-dom';
const MainPage = () => {
    const [mass, setMass] = useState([]);
    const [mass2, setMass2] = useState([])
    const [count , setCount] =useState(false)

    function clikk(a){
        console.log(a);
        fetch(`https://toko.ox-sys.com/variations?size=20&page=${a}`, {
        method: 'GET',
       
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        })
        .then(res => res.json())
        .then(data => {
            setCount(true)
            setMass(data)
            setMass2(data.items)
            console.log(mass.items);
        })
        .catch(error => {
        console.error(error);
        // setMass2('sa')
        });
        

    }
    function run(){
        clikk(1)
    }
    function serch(a){
        console.log(a.target.value);
        let box = mass.items.filter(item =>{
            return item.productName.toLowerCase().includes(a.target.value.toLowerCase())
        })
        setMass2(box)
    }
        
    return (
        <div className='container'>
            <h1 className='display-6'>Assalome alekum Mahsulotalar omboriga hush kelibsiz</h1>
            <button onClick={run} className={ `btn btn-primary ${(count)? 'd-none' : 'd-block m-auto'}`} >Maxsulotlarni korish</button>
            {
               (count)? <div className='row'>
                <input type='text' className='form-control  my-3' placeholder='ombordan qidirsh' onInput={(e)=>serch(e)}/>
                {
                    (mass2) ? mass2.map((item , index)=>{
                        return (
                            <div className='col-4 my-2' key={index}>
                                <Card title={`Nomi: ${item.productName}` }hoverable bordered={false} style={{ width: 300 }}>
                                    <p>Haqida: {(item.description)? item.description : '👋'}</p>
                                </Card>
                            </div>
                        )
                    }) : <div><p className='display-6'>Siz oldin royhatdan otishingiz lozim</p> <button className='btn btn-primary'><Link to='/' style={{textDecoration:'none' , color:'white'}}> Register page</Link></button></div>
                }
                
            <Pagination defaultCurrent={1}  total={mass.total_count} onChange={(current)=>{clikk(current)}}/>
            </div>: ''
            }
        </div>
    );
}

export default MainPage;
