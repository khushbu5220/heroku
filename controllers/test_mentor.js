const express = require("express")
const validator = require('validator')

const Mentor_test = require("../model/test_mentor");



exports.mentors_post_test = async (req, res) => {
    try{
        const test = new Mentor_test(req.body);

        const createTest = await test.save();
        res.status(201).send(createTest);
    }

    catch(e){
        res.status(400).send(e);
    }                                                                   
}


exports.mentors_get_api = async (req, res) => {
    try{
        const data = await Mentor_test.find();

        res.status(200).send({data});

    } catch (error) {
        res.status(500).send({ error : error.message})
    }

}



exports.mentors_get_test = async(req, res) => {
    try{
        const subject = req.params.subject;
        const data = await Mentor_test.findOne({subject});
     
       
               if(!data){
                   return res.status(404).send(e);
               }else{
                   res.status(200).send(data);
               }

    }catch(e){
        res.status(500).send(e);
    }
}


exports.mentors_patch_test = async (req, res) => {
    try{
        const subject = req.params.subject;
        const updateTest = await Mentor_test.findOneAndUpdate(subject, req.body, {
            new:true
        });
        res.send(updateTest);

    }catch(e){
        res.status(404).send(e);
    }
}


exports.mentors_delete_test =  async (req, res) => {
    try{
        const subject = req.params.subject;
        const deleteTest = await Student.findByIdAndDelete(subject)
     
        if(!_id){
            return res.status(400).send();
        }else{
            res.send(deleteTest);
        }


    }catch(e){
        res.status(500).send(e);
    }
}
