import { Body, Controller, Post } from '@nestjs/common';
import { GroupService } from "./Group.service";
import { GroupAllocatioNDto } from "./GroupAllocation.Dto";


@Controller('groups')

export class Groupcontroller{
    constructor(
        
        private groupserv :GroupService
    ){}

    @Post('assignGroups')
    async assignGroups(@Body() GroupAllo:GroupAllocatioNDto):Promise<string>{
        return this.groupserv.createGroup(GroupAllo);
    }

    
}