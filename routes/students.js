const router = require('express').Router();
const  Student = require('../db/models/student');


router.get("/", async (req, res, next)=>{
  try{ const data = await Student.findAll()
    res.send(data)
  } catch(error){
      next(error)
  }
})

router.get('/:id', async (req, res, next)=>{
    try{
        let studentId = await Student.findByPk(req.params.id)

if (studentId){
    res.send(studentId)
} else {
    res.status(404).send(404)
}
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next)=>{
    try {
let student = await Student.create(req.body)
res.status(201).send(student)
    } catch(error) {
      next(error)
    }
})

router.put('/:id', async (req, res, next)=>{
    try{
        let updateStudent = await Student.update(req.body, {
            where: {id: req.params.id},
                returning: true,
                plain: true
        })
        res.send(updateStudent[1])
    } catch (error){
        next(error)
    }
})

router.delete('/:id', async (req, res, next)=>{
try {  await Student.destroy({where:{
    id: req.params.id,
}
})
res.status(204).send()
    
} catch (error) {
    next(error)
}

})
module.exports = router;