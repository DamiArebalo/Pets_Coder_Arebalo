import { faker } from '@faker-js/faker';
import { createHashUtil, verifyHashUtil } from '../utils/hash.util.js';

function generateUsers(count){
    const users = [];
    for(let i = 0; i < count; i++){
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password:createHashUtil(process.env.PASSWORD_MOCK),
            role: faker.helpers.arrayElement(["admin","user"]),
            pets:[]
        })
    }
    return users;

}

export default generateUsers;
