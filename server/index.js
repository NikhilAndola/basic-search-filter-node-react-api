// console.log("am user", process.env.USER)
import express from 'express';
import cors from "cors";
import pData from './patientData.json' assert {type: 'json'}
 
const app = express();

const PORT = process.env.PORT || 8000

app.use(cors({
    origin: "*"
}));


app.get("/", async (req, res) => {

    let sortQuery = req.query.sortQuery;

    const sortFunc = (data) => {
        let resData = data;
        
        // if(sortQuery === "initAuth" && statusQuery === "pendingApproval") {
        //     resData = data.sort(item => {
        //         if(item.stage === "Initial Authorization" && item.status === "Pending Approval"){
        //             return -1;
        //         }
        //     })
        // }

        if(sortQuery === 'initAuth'){
            resData = data.sort(item => {
                if(item.stage === "Initial Authorization"){
                    return -1;
                }
            })
        } else if(sortQuery === "enhance"){
            resData = data.sort(item => {
                if(item.stage === "Enhancement"){
                    return -1;
                }
            })
        } else if(sortQuery === "discharge"){
            resData = data.sort(item => {
                if(item.stage === "Discharge"){
                    return -1;
                }
            })
        } else if(sortQuery === "finalAuth"){
            resData = data.sort(item => {
                if(item.stage === "Final Authorization"){
                    return -1;
                }
            })
        }else if(sortQuery === "pending"){
            resData = data.sort(item => {
                if(item.status === "Pending Approval"){
                    return -1;
                }
            })
        }else if(sortQuery === "tpaQuery"){
            resData = data.sort(item => {
                if(item.status === "TPA Query"){
                    return -1;
                }
            })
        }

        return resData;
    }

    // let x = data2.sort(item => {
    //     if(item.age === 26){
    //         return 1
    //     } else return -1
    // })  

    // console.log("🚀 ~ file: index.js ~ line 30 ~ x ~ x", pData)

    res.send(sortFunc(pData));
})

app.listen(PORT, (err) => {
    console.log("port stated at", PORT)
})