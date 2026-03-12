import React,{useState,useEffect} from 'react';
import './style.css';


export default function CategoryMenu() {
  const[Smallimages,setSmallimages]=useState([]);
  const[Loading,setLoading]=useState([]);
  useEffect(()=>{fetch(`https://localhost:7196/Categories/getallSmallimages/GetAll`)
    .then((res)=>res.json())
    .then((data)=>{setSmallimages(data);setLoading(false);})
    .catch((err)=>{console.error("failed to fetch images:",err);
      setLoading(false);
    });
  },[]);
  if (Loading)return<p>Loading images...</p>

  return (
    <div><div className="categories">
      {Smallimages.map((small) => (
        <div key={small.categoryId} className="category">
          <img src={`https://localhost:7196${small.imagePath}`} alt={small.name} />
          <p>{small.name}</p>
        </div>
      ))}
    </div></div>
  )
}
