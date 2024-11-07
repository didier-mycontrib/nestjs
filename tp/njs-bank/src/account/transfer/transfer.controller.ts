import { Body, Controller, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferRequest, TransferResponse } from './transfer.dto';

@Controller('transfers') //virements
export class TransferController {

    constructor(private readonly transferService: TransferService) {
    }

    @Post()
    async postTransfer(@Body() transferReq: TransferRequest): Promise<TransferResponse> {
        //console.log("TransferController.postTransfer() with transferReq = " + JSON.stringify(transferReq));
        await this.transferService.doTransfer(transferReq.amount,
                                              transferReq.debitAccountNumber,
                                              transferReq.creditAccountNumber);
        return new TransferResponse(transferReq.amount,
                                    transferReq.debitAccountNumber,
                                    transferReq.creditAccountNumber,
                                    true,"ok");
     }
    
}
