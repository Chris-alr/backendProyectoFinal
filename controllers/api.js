const Post = require('../models/posts');

const fs = require("fs");



module.exports = class API {
    //Metodo usado para conseguir todos los posts, para luego mostrarlos
    static async fetchAllPost(req,res){
        try{
            const post = await Post.find();
            res.status(200).json(post);
        }catch(err){
            res.status(404).json({message : err.message});
        }
    }//Conseguir post por su id
    static async fetchPostByID(req,res){
        const id = req.params.id;
        try {
            const post = await Post.findById(id);
            res.status(200).json(post);
        } catch (err) {
            res.status(404).json({ message : err.message});
        }
    }
    //Metodo usado para crear un post
    static async createPost(req,res){
        const post = req.body;
         const imagename = req.file.filename;
        post.image = imagename;
        try {
            
            await Post.create(post);
            res.status(201).json({message: 'Post Creado exitosamente!' });
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
   //Metodo para actualizar un post
    static async updatePost(req,res){
        const id = req.params.id;
        let new_image = '';
        if(req.file){
            new_image = req.file.filename;
            try {
                fs.unlinkSync('./uploads/'+req.body.old_image);
                console.log('eliminando antigua imagen')
            } catch (err) {
                console.log(err);
            }
        }else{
            new_image = req.body.old_image;
           
        }
        const newPost = req.body;
        newPost.image = new_image;
        console.log(req.body.title);
        try {
           await Post.findByIdAndUpdate(id,{$set:req.body});
            res.status(200).json({ message : "Post Actualizado!"})
        } catch (err) {
            res.status(404).json({ message : err.message})
        }
    }
    //Metodo para eliminar un post

    static async deletePost(req,res){
        const id = req.params.id;
      
        try {
            const result = await Post.findByIdAndDelete(id);
            if(result.image != ''){
                try {
                    fs.unlinkSync('./uploads/'+result.image)
                } catch (error) {
                    console.log(error)
                }
            }
            res.status(200).json({ message : "Post Eliminado!"})
        } catch (error) {
            res.status(404).json({ message : error.message})
        }
    }



}
