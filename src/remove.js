import { useEffect, useState } from "react";

const Remove = () => {
    const [reports,setReports] = useState([]);
    const [report,setReport] = useState();
    const [limit,setLimit] = useState(10);
    const kaldirma_talebi = () =>{
        var token = localStorage.getItem("token")
                                            if(token===null || token===""){
                                                navigator("/")
                                            }
                                            fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/adddeleterequest",{
                                            headers:{
                                            "Content-Type":"application/json",
                                            },
                                            method:"POST",
                                            body:JSON.stringify({
                                                email:"barisozcan105@gmail.com",
                                                password:"123456",
                                                rid:report._id,
                                    
                                            })
                                            }).then(r=>r.json()).then(
                                              result=>{
                                                console.log(result)
                                              }
                                            )
    }
    const fetchdata = () =>{
        var token = localStorage.getItem("token")
        if(token===null || token===""){
            navigator("/")
        }
        fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/deletereportrequests",{
        headers:{
        "Content-Type":"application/json",
        },
        method:"POST",
        body:JSON.stringify({
            limit:limit,
            email:"barisozcan105@gmail.com",
            password:"123456",
 

        })
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
        <div className="flex w-screen h-screen">
            {reports.length ?
            <div className="flex flex-col gap-2 p-2 m-2">
                {
                    reports.map((report, index) => {
                        return (
                            <div key={index} className="flex flex-row bg-yellow-100 rounded-2xl">
                                <div className="flex flex-row items-center">
                                <img src={report.fotourl} alt="" className="w-32 h-32"/>
                                <div className="flex flex-col p-2 items-center justify-center ">

                                <h2>Engel: {report.classification}</h2>
                                <p>Kaldırılmasını Talep Eden Kişi Sayısı : {report.totalusers}</p>
                                <p>Açıklama : {report.description}</p>
                                <button 
                                className="p-2 bg-red-500 rounded-3xl text-white"
                                onClick={()=>{
                                            var token = localStorage.getItem("token")
                                            if(token===null || token===""){
                                                navigator("/")
                                            }
                                            fetch("https://turnkey-setup-444120-m3.uw.r.appspot.com/deletereport",{
                                            headers:{
                                            "Content-Type":"application/json",
                                            },
                                            method:"POST",
                                            body:JSON.stringify({
                                                token:token,
                                                rid:report._id,
                                    
                                            })
                                            }).then(r=>r.json()).then(
                                              result=>{
                                                console.log(result)
                                              }
                                            )
                                }}>BUNU KALDIR</button>
                                </div>

                                </div>
                               

                            </div>
                        )
                    })
                }
            </div>
            :<></>}
        </div>
    );
}
 
export default Remove;