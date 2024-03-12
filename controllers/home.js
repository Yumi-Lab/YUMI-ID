const path = require('path');

exports.showDescription = (req, res) => {
    const siteDescription = 'Este es un servicio de autenticación seguro. No se revelan datos personales ni se exponen vulnerabilidades de la aplicación.';
    res.render(path.join(__dirname, '../views/home'), { siteDescription });
};