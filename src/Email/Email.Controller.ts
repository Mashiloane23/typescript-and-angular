// import { Body, Controller, Post } from '@nestjs/common';
// import { EmailService } from "./Email.service";
// import { EmailSendDto } from "./EmailCreate.Dto";


// @Controller('email controller')
// export class EmailController{

//     constructor (private readonly emailservice:EmailService){}

//     // @Post('email')
//     // async createEmail(@Body() emaildto:EmailSendDto ):Promise<{message:string}>{
//     //     const {useremail,taskid,taskname} = emaildto;

//     //     try{
//     //         await this.emailservice.sendEmail(useremail,taskid,taskname);
//     //         return {message:'Task assigned and email sent successfully'};
//     //     }
//     //     catch (error){
//     //         console.error('error in assigning the Task or sending email',error);
//     //         return {message:'failed to send email or assign Task'};

//     //     }
//     // }
// }