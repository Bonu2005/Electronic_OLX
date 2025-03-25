import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import {Server,Socket} from "socket.io"
@WebSocketGateway()
export class NotificationGateway implements OnGatewayConnection,OnGatewayDisconnect {
  constructor(){}
  @WebSocketServer()
   private server:Server
     handleConnection(client: any, ...args: any[]) {
       console.log("connected");
     }
     handleDisconnect(client: any) {
       console.log("disconnected");
       
     }

  sendOrderNotif(order: any) {
    this.server.emit('order', {
      message: "Succesfully ordered",
      order
    });
  }
}
