import { useEffect, useState } from "react";
import validator from "validator"
function App() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [isValid,setIsValid]=useState(false);
  const [isSubmitted,setIsSubmitted]=useState(false);
  const [logged,setLogged]=useState(false);
  const [reports, setReports]=useState(undefined);
  useEffect(()=>{
    var token = localStorage.getItem("token")
    if(token){
      fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/adminpage",{
        headers:{
          "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify({token:token})
      }).then(r=>r.json()).then(
        r=>{
          console.log(token)
          console.log(r)
          if(r.reports){
            setLogged(true)
            setReports(r.reports)
          }
        }
      )
    }
    if(isValid && document.getElementById("btn")){
      document.getElementById("btn").classList.remove("notvalidated")
      document.getElementById("btn").classList.add("validated")
    }
    else{
      if(document.getElementById("btn")){
        document.getElementById("btn").classList.remove("validated")
        document.getElementById("btn").classList.add("notvalidated")
      }
      
    }
  },[isValid])
  useEffect(()=>{
    const timeout = setTimeout(()=>{
      var token = localStorage.getItem("token")
      if(token){
      fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/adminpage",{
        headers:{
          "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify({token:token})
      }).then(r=>r.json()).then(
        r=>{
          console.log(r)
          if(r.reports){
            setLogged(true)
            setReports(r.reports)
          }
        }
      )
    }
  }
    ,1000)
    return ()=>clearTimeout(timeout)
  },[])
  return (
    <div className="flex flex-col relative items-center bg-purple-200">
    <div className="absolute top-0 left-0 flex flex-col p-4">
    <div className="flex">
    <div className=" p-2 bg-yellow-500 rounded-xl ">
      <button onClick={()=>{
        console.log("tıklandı")
        document.getElementById("menubar").classList.toggle("wh-0")
      }}>
      Menu
      </button>
    </div>
    </div>
    
    <div id="menubar" className="flex flex-col ">
      <button className=" bg-red-400 rounded-lg m-2 p-1">
        Onaylananları Gör
      </button>
      <button className=" bg-red-400 rounded-lg m-2 p-1">
        Kaldırma Taleplerini Gör
      </button>
      <button className=" bg-red-400 rounded-lg m-2 p-1" >
        İptal Taleplerini Gör
      </button>
      </div>
    
    </div>
    <div
    className="w-1/3 min-h-screen flex flex-col items-center bg-yellow-50  "
    >
 {!logged?<form className="items-center flex flex-col  gap-2 mt-2 p-2 justify-evenly" autoComplete="off" onSubmit={(e)=>{e.preventDefault();}}>
    <input type="text"
    placeholder="Enter Your Email"
    value={email}
    autoComplete="new-item"
    onChange={(t)=>{setEmail(t.target.value)
      if(validator.isEmail(email) && password.length>=2){
        setIsValid(true)
      }else{
        setIsValid(false)
      }}}
    className="bg-yellow-500 rounded-lg focus:bg-yellow-200 duration-500 ease-out p-2"
    ></input>
    <input 
    id="pswrd"
    type="text" 
    autoComplete="new-item"
    placeholder="Enter Your Password"
    className="bg-purple-600 rounded-lg focus:bg-purple-200 duration-500 ease-out p-2"
    value={password}
    onChange={(t)=>{
      // set document get elementbyid pswrd's type to password
      if(t.target.value.length>=2){
        document.getElementById("pswrd").classList.add("blurry")
      }else{
        document.getElementById("pswrd").classList.remove("blurry")
      }
      setPassword(t.target.value)
      if(validator.isEmail(email) && password.length>=2){
        setIsValid(true)
      }else{
        setIsValid(false)
      }
    }}
    />
    <button
    type="submit"
    id="btn"
     onClick={()=>{
      setIsSubmitted(true);
      fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/adminpage",{
        headers:{
          "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify({email:email,password:password})
      }).then(r=>r.json()).then(result=>{
        console.log(result)
        if(result.reports){
          setLogged(true)
          setReports(result.reports)
        }
        if(result.token){
          localStorage.setItem("token",result.token)
        }
        }).catch(e=>{
        console.log(e)
      })
    }}
    className="w-full duration-500 ease-linear  p-2 rounded-lg border-2 transform active:scale-75 transition-transform shadow-lg items-center justify-center flex"
    >
    {isSubmitted?
      <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-fuchsia-600 fill-gray-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>:
    <>
      Giriş Yap!
    </>
        }
    </button>
    </form>
    :
    <div>
      {reports && reports.map(
        (report,index)=>{
          return(
            <div id={index} key={index} className="flex m-4 items-center transition duration-500">
            <img src={report.fotourl} alt="foto " className=" object-contain rounded-xl w-3/5 mr-4" />
            <div>
            <h1 className="font-bold text-xl text-red-600">Classification : {report.classification}</h1>
            <p className="text-xl font-bold text-blue-600" >Açıklama: {(report.description)}</p>
            <div>
            <a className=" text-emerald-400 hover:text-emerald-800 transition duration-500" href={"https://gps-coordinates.org/my-location.php?lat="+report.location_lat+"&"+"lng="+report.location_long} target="_blank">Adresi Gör</a>
            </div>
            <div className="flex flex-col gap-2">
            <button className="p-4 bg-purple-600 rounded-lg text-white text-xl font-bold"
            
            onClick={()=>{
              var token = localStorage.getItem("token")
              fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/approve",{
        headers:{
          "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify({token:token,ruid:report._id})
      }).then(r=>r.json()).then(
                result=>{
                  document.getElementById(index).classList.add("wh-0")
                }
              )
            }}
            
            >ONAYLA</button>
            <button className="p-4 bg-red-600 rounded-lg text-white text-xl font-bold"
            
            onClick={()=>{
              var token = localStorage.getItem("token")
              fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/disapprove",{
        headers:{
          "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify({token:token,ruid:report._id})
      }).then(r=>r.json()).then(
                result=>{
                  document.getElementById(index).classList.add("wh-0")
                }
              )
            }}
            
            >İPTAL ET</button></div>
            </div>
            
            </div>  
            )
            }
      )}
    </div>
    }
    </div>
    </div>
  );
}

export default App;
