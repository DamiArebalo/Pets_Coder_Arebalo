import { Router } from 'express';
const router = Router();
import  generateUsers  from '../services/users.service.js';
import { generatePets } from '../services/pets.service.js';


import petsController from '../controllers/pets.controller.js';
import sessionsController from '../controllers/sessions.controller.js';

router.get('/mockingusers',mocksUsers);
router.get('/mockingpets',mocksPets);
router.post('/generatedata',generateData);

export default router;

//funcion que genera usuarios segun un parametro numerico que si no existe se genera 50
function mocksUsers(req,res){
    const number = req.query.users || 50;
    const users = generateUsers(number);
    res.status(200).json(users);
}

//funcion que genera pets segun un parametro numerico que si no existe se genera 50
function mocksPets(req,res){
    const number = req.query.pets || 50;
    const pets = generatePets(number);
    res.status(200).json(pets);
}

//funcion que genera registros de usuarios y pets segun la cantidad que se envie y lo carga a la DB
//se prevee no modificar los controladores para que no se modifique el codigo predeterminado
async function generateData(req,res){
    const pets = req.query.pets;
    const users = req.query.users;
    //si existen los parametros continua
    if(pets && users){
        //parsea los parametros
        const petsNumber = parseInt(pets);
        const usersNumber = parseInt(users);

        //si son validos continua
        if(petsNumber > 0 && usersNumber > 0){

            //genero los datos con services
            const mocksPets = generatePets(petsNumber);
            const mocksUsers = generateUsers(usersNumber);

            //logueo los datos
            console.log("Pets generados", mocksPets.length, mocksPets);
            console.log("Users generados:", mocksUsers.length, mocksUsers);

            //creacion de los datos
            const petsCreated = []; 
            const usersCreated = [];

            /*recorro los registros para pasarle a los controladores la data que necesitan 
                ya que el controlador recupera desde un req.body */
            for (const pet of mocksPets) {
                const petRequest = { body: pet };
                const fakeRes = { send: data => petsCreated.push(data) }; // solucion a un problema de respuestas en el mismo ciclo de ejecucion 
                await petsController.createPet(petRequest, fakeRes);
            }

            for (const user of mocksUsers) {
                user.password = process.env.PASSWORD_MOCK; //desencripto el password ya que se pide que todas las passwords sean iguales
                const userRequest = { body: user };
                usersCreated.push(user);
                await sessionsController.register(userRequest);
            }
            
            res.status(200).json({ message: "Data generated", pets: petsCreated, users: usersCreated });
        }else{
            res.status(400).json({message:"Invalid number of pets or users"});
        }    
        
    }else{
        res.status(400).json({message:"Missing pets or users parameter"});
    }
    
}

