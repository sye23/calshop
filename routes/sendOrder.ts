import * as express from 'express-promise-router';
const router = express();
import {Request, Response} from 'express';
import * as utils from '../utils/utilFunctions';

router.post('/', async(req : Request, res : Response) => {
    let orders = req.body.order;
    let user = req.body.user;
    let path = req.body.path;
    let name;
    (user.name.length > 1)?name=`${user.name} / `:name='';

    let emailTitle = `<h3 style="text-align:center">From:${name}${user.company}<br/> 
                                                    Phone:${user.phone}<br/> 
                                                    Email:${user.email}</h3>
                        <h3>For:${orders[0].customer}</h3>
                        <h3>Date Of Event:${orders[0].date}</h3><hr/>`;
    let receiptTitle  = `<h3 style="text-align:center">Thank You For Your Order</h3>
                        <h3>For:${orders[0].customer}</h3>
                        <h3>Date Of Event:${orders[0].date}</h3><hr/>`;                    
    let orderEmail = orders.map((order: any, index: any)=>{
        return (`<table style="text-align:left"> 
                    <tr> 
                        <th>Order#:</th> 
                        <td>${index+1}/${orders.length}</td>
                    </tr>  
                    <tr> 
                        <th>Item:</th> 
                        <td>${order.item}</td>
                    </tr> 
                    <tr> 
                        <th>Size:</th> 
                        <td>${order.size}</td> 
                    </tr>
                    <tr> 
                        <th>Paper Color:</th> 
                        <td>${order.paper}</td> 
                    </tr>
                    <tr> 
                        <th>Ink Color:</th> 
                        <td>${order.color}</td> 
                    </tr>
                    <tr> 
                        <th>Font Style:</th> 
                        <td>${order.font}</td> 
                    </tr>
                    <tr> 
                        <th>Design Style:</th> 
                        <td>${order.design}</td> 
                    </tr>
                    <tr> 
                        <th>Quantity:</th> 
                        <td>${order.quantity}</td> 
                    </tr>
                    <tr> 
                        <th>Special Instructions:</th> 
                        <td>${order.message}</td> 
                    </tr>
                </table><br/>`
            )
    });
   let response =  utils.sendEmail(emailTitle+orderEmail.join(), orders[0].customer +" - "+ user.name, path);

   console.log('response from email', response);
   if(response === 'sent'){
    let receipt = utils.sendEmailReceipt(receiptTitle+orderEmail.join(), user.email);
    
   }
   res.json(response);
})

export default router