import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Approved = () => {
    const [limit,setLimit] = useState(20);
    const [reports,setReports] = useState([]);
    const navigator = useNavigate();
    const fetchdata = () =>{
        var token = localStorage.getItem("token")
        if(token===null || token===""){
            navigator("/")
        }
        fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/seeapproveds",{
        headers:{
        "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify({token:token,limit:limit})
        }).then(r=>r.json()).then(
          result=>{
            console.log(result)
            setReports(result.data?.reverse());
          }
        )
    }
    useEffect(()=>{
fetchdata();
    },[])
    return (
        <div className="flex relative w-screen h-screen">
            <div className="absolute top-0 right-0">
            <input  type="number" value={limit} onChange={(e)=>{setLimit(e.target.value)}} />
            <button className="bg-red-600 rounded-2xl w-32 h-32" onClick={()=>{
                fetchdata();
            }}>Uygula</button>
            </div>
            {
            reports && reports.length > 0 ? 
        <div className="overflow-auto h-screen no-scrollbar p-2">
            {
                reports.map((report,index)=>{
                    return(
                        <div className="flex flex-row text-white text-xl bg-purple-800 p-2 m-2" key={index} id={report._id}>
                        <div   className="flex flex-col">

                            <img src={report.fotourl} alt={report.classification} className="w-32 h-32 object-cover"/>
                            <p>{report.date}</p>
                        </div>
                        <div className="flex-col m-2">
                        <h1>{report.classification}</h1>
                        <h1 className="text-sm" style={{fontSize:1}}>{report.description}</h1>
                        <p>Report Id : {report._id}</p>
                        <p>User Id : {report.userid}</p>
                        <button className="bg-red-600 rounded-xl p-2" onClick={()=>{
                                var token = localStorage.getItem("token")
                                fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/disapprove",{
                          headers:{
                            "Content-Type":"application/json",
                          },
                          method:"POST",
                          body:JSON.stringify({token:token,ruid:report._id})
                        }).then(r=>r.json()).then(
                                  result=>{
                                    document.getElementById(report._id).classList.add("wh-0")
                                  }
                                )
                        }}>Kaldır</button>


                        </div>

                        </div>
                        )
                })
            }
            </div>
            :
            <p>
                no data
                </p>}
        </div>
    );
}
 
export default Approved;