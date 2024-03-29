"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const message_service_1 = require("./message.service");
const create_message_dto_1 = require("./dto/create-message.dto");
const socket_io_1 = require("socket.io");
let MessageGateway = class MessageGateway {
    constructor(messageService) {
        this.messageService = messageService;
    }
    async create(createMessageDto, client) {
        const message = await this.messageService.create(createMessageDto, client.id);
        this.server.emit('message', message);
        return message;
    }
    findAll() {
        return this.messageService.findAll();
    }
    joinRoom(name, client) {
        return this.messageService.identify(name, client.id);
    }
    async typing(isTyping, client) {
        const name = await this.messageService.getClientName(client.id);
        client.broadcast.emit('typing', { name, isTyping });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], MessageGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('createMessage'),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_message_dto_1.CreateMessageDto,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __param(0, (0, websockets_1.MessageBody)('name')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], MessageGateway.prototype, "joinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('typing'),
    __param(0, (0, websockets_1.MessageBody)('isTyping')),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Boolean, socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], MessageGateway.prototype, "typing", null);
MessageGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageGateway);
exports.MessageGateway = MessageGateway;
//# sourceMappingURL=message.gateway.js.map