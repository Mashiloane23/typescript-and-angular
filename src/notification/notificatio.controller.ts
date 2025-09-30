import { Controller, Param, ParseIntPipe, Post } from "@nestjs/common";
import { NotificationService } from "./notification.service";


@Controller('notification')

export class notificationcontroller{

    constructor (private service:NotificationService){}

    @Post('assign/:userid/:taskid')
    async sendnotification(@Param('userid',ParseIntPipe) userid:number,@Param('taskid',ParseIntPipe) taskid:number,):Promise<any>{
        return await this.service.asssigntasknotification(userid,taskid);

    }
}