const allowedCollections = (collection = '', collections = []) => {
    const includes = collections.includes(collection);
    if (!includes) {
        throw new Error(`La coleccion ${collection} no es permitida, solo se aceptan: ${collections}`); 
    }
    return true;
}

module.exports = {
    allowedCollections
}