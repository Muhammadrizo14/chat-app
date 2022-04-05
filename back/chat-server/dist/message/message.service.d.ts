import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
export declare class MessageService {
    messages: Message[];
    clientToUser: {};
    identify(name: string, clientId: string): unknown[];
    getClientName(clientId: string): any;
    create(createMessageDto: CreateMessageDto, clientId: string): {
        name: any;
        text: string;
    };
    findAll(): Message[];
}
