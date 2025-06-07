import { faker } from '@faker-js/faker';

export function generatePets(count){
    const pets = [];
    for(let i = 0; i < count; i++){
        pets.push({
            name: faker.animal.cat(),
            specie: faker.animal.cat(),
            birthDate: faker.date.birthdate(),
            adopted: faker.datatype.boolean(),
            owner:[],
            
        })
    }
    return pets;
}