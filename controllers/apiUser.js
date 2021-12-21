const User = require('../models/users');





module.exports = class APIX {

    //Metodo usado para crear un post
    static async crearUsuario(req,res){
        const user = req.body;
    
        try {
            
            await User.create(user);
            
            res.status(201).json({message: 'Usuario Creado exitosamente!' });
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    }
 



}
