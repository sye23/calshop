import knex from './config';
import { AdminLogin, UserLogin } from '../types/login';
import * as utils from '../utils';



function userLogin(login:UserLogin){
    return knex('users')
            .where('email', login.email)
            .first()
            .catch((error) => {
                return 'error';
            });
}


async function adminLogin(login: AdminLogin) {
    let admin;
    admin = await knex('admin')
        .select('admin.userId','admin.email', 'admin.password', 'admin.isVerified','admin.isAdmin')
        .where('email', login.email)
        .first();
    if (admin) {
        let validPassowrd = await utils.utilities.comparePassword(admin.password, login.password);
            if(validPassowrd) {
                return {admin:admin};
            }
    }
    
}

export{
        adminLogin,
        userLogin
    } 