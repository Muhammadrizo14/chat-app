import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
export declare class MessageGateway {
    private readonly messageService;
    server: Server;
    constructor(messageService: MessageService);
    create(createMessageDto: CreateMessageDto, client: Socket): Promise<{
        name: any;
        text: string;
    }>;
    findAll(): import("./entities/message.entity").Message[];
    joinRoom(name: string, client: Socket): unknown[];
    typing(isTyping: boolean, client: Socket): Promise<void>;
}
