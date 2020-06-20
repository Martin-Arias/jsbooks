require('dotenv').config(); //Trae los datos de .env

const cors = require('cors');
const express = require ('express');
const morgan = require('morgan'); //Middleware
const multer = require('multer'); //Procesa imagenes
const path = require('path');


///Inizializaciones
const app = express(); //Servidor
require('./database') //Conexion a la BBDD


//Settings 
app.set('port',process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //Interpreta los datos de los formularios como JSON
app.use(express.json()); //Permite interpretar JSON
app.use(cors()); //Permite el intercambio entre distintos servers

// Image Storage Config
const storage = multer.diskStorage({
    destination: path.join(__dirname,'./public/uploads'),
    filename(req,file,cb){
        cb(null,new Date().getTime()+ path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));



//Routes
app.use('/api/books',require('./routes/books')); 


//Static Files
app.use(express.static(path.join(__dirname,'public'))); //Busca un archivo con el nombre index en la carpeta public



//Empezar el servidor
app.listen(app.get('port'),()=>{
    console.log(`Servidor iniciado en el puerto: ${app.get('port')}`);
    console.log(`http://localhost:${app.get('port')}`);
        
});

