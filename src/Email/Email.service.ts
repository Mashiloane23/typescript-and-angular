// const nodemailer = require('nodemailer');

// import { InjectRepository } from '@nestjs/typeorm';
// import { Email } from './email.entity';
// import { Repository } from 'typeorm';
// import { ConfigService } from '@nestjs/config';


// export class EmailService {
//   private transporter;

//   constructor(
//     @InjectRepository(Email)
//     private emailRepository: Repository<Email>,
//     private configservice:ConfigService
//   ) {


//     const user = this.configservice.get<string>('EMAIL_USER');
//     const pass  =this.configservice.get<string>('EMAIL_PASS');

//     console.log('EMAIL_USER:',user);
//     console.log('EMAIL_PASS',pass ? 'loaded':'Missing');

//     if(!user || !pass){
//       console.error(' Missing email credentials in .env.stage.dev');
//       throw new Error('EMAIL_USER or EMAIL_PASS is missing in environment variables.');

//     }
    
//     this.transporter = nodemailer.createTransport({
//       host:'smtp.gmail.com',
//       port:465,
//       secure:true,
//       service: 'gmail',
//       auth: {
//         user: this.configservice.get<string>('EMAIL_USER'),
//         pass: this.configservice.get<string>('EMAIL_PASS'), 
//       },
//     });
//   }

  

//   async sendEmail(to:string,taskid:number,taskname:string):Promise<void>{

//     const subject = `Task Assigned:${taskname}`;
//     const body = `Hello, \n\n you have been assigned a task. \n\n TaskId:${taskid}`;
//     const emailsend =  this.emailRepository.create({
//         recipient:to,
//         subject:subject,
//         body:body,
//         status:'pending',
//     });
  
//     await this.emailRepository.save(emailsend);

//     try {
      
//       await this.transporter.sendMail({
//         from: '246lesese@gmail.com', 
//         to: to,
//         subject: subject,
//         text: body,
//       });

      
//       emailsend.status = 'sent';
//       await this.emailRepository.save(emailsend);
//     } catch (error) {
//       console.error('Error sending email:', error.message);
//       emailsend.status = 'failed ';
      
//       await this.emailRepository.save(emailsend);
//     }
//   }

// }