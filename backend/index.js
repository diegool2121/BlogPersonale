
var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://oswaldologronio:Qazwsxedcrfvv12@cluster0.v43x81b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('conexion exitosa a la base de datos');

        // Crear servidor y ponerme a escuchar peticiones HTTP
        app.listen(port, () => {
            console.log('Servidor corriendo en http://localhost:3800');
        });
    })
    .catch((err) => console.error(err));