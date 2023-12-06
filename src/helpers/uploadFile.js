const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validExtensions = ['png','jpg','jpeg'], file = '' ) => {

    return new Promise( (resolve, reject) => {
        const { file } = files;
        console.log(file);
        const shortName = file.name.split('.');
        const extension = shortName[ shortName.length - 1 ];

        // Validar la extension
        if ( !validExtensions.includes( extension ) ) {
            return reject(`La extensión ${ extension } no es permitida - ${ validExtensions }`);
        }
        
        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', file, nameTemp );

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nameTemp );
        });

    });

}



module.exports = {
    uploadFile
}