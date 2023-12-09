const {
    userByIDExists,
    testResultByIDExists
  } = require('../helpers/db-validators')

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const updateImageCloudinary = async (req, res) => {
    try {
        const { id, collection } = req.params;
          let model;
      
          switch ( collection ) {
              case 'user':
                  model = await userByIDExists(id);
                  if ( !model ) {
                      return res.status(400).json({
                          msg: `No existe un usuario con el id ${ id }`
                      });
                  }
              
              break;
      
              case 'testResult':
                  model = await testResultByIDExists(id);
                  if ( !model ) {
                      return res.status(400).json({
                          msg: `No existe resultado de prueba con el id ${ id }`
                      });
                  }
              
              break;
          
              default:
                  return res.status(500).json({ msg: 'Se me olvidó validar esto'});
          }
      
          // Limpiar imágenes previas
          if ( model.foto ) {
              const arrName = model.foto.split('/');
              const name    = arrName[ arrName.length - 1 ];
              const [ public_id ] = name.split('.');
              cloudinary.uploader.destroy( public_id );
          }
      
          const { tempFilePath } = req.files.file
          const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
          model.foto = secure_url;
      
          await model.save();
      
      
          res.json( model );
    } catch (error) {
        res.status(400).json(error)
    }
};

module.exports = {
  updateImageCloudinary
};
