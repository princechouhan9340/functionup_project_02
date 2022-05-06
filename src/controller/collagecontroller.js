const collageModel = require("../model/collageModel")
const internModel = require("../model/internModel")
const createcollage = async function (req, res) {
    try {
        const data = req.body

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, Error: "input is empty, please enter data" })
        }

        if (!data.name || !data.fullName || !data.logoLink) {
            return res.status(400).send({ status: false, Error: "please enter mandatory field" })
        }

        if (typeof (data.name) != "string" || typeof (data.fullName) != "string" || typeof(data.logoLink) != "string") {
            return res.status(400).send({ status: false, Error: "invalid input" })
        }


        const result = await collageModel.create(data)
        res.status(201).send({ status: true, data: result })
    } catch (err) {
        res.status(500).status({ status: false, Error: err })
    }
}

const getcollagedetail = async function (req,res){
    try{
        const collagename = req.query
        if(Object.keys(collagename).length == 0){
            return res.status(400).send({status:false,Error:"empty request"})
        }
        let collage = Object.values(collagename).toLocaleString().trim()
        console.log(collage)
        const findcollage = await collageModel.findOne({name:collage}).select({name:1,fullName:1,logoLink:1})
        const findcollageid = await collageModel.findOne({name:collage})
        console.log(findcollage)
        if(!findcollage){
            return res.status(400).send({status:false,Error:"collage not found"})
        }

        const result = await internModel.find({collageId:findcollageid._id}).select({_id:1,name:1,email:1,mobile:1,_id:0})
        res.status(200).send({status:true,data:findcollage,interns:result})

    }catch(err){
        res.status(500).send({status:false,Error:err})    }
}

module.exports.createcollage = createcollage
module.exports.getcollagedetail = getcollagedetail
