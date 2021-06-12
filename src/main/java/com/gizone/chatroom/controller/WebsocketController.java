package com.gizone.chatroom.controller;

import com.gizone.chatroom.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class WebsocketController {

    private final MessageService messageService;

    @Autowired
    public WebsocketController(MessageService messageService) {
        this.messageService = messageService;
    }

    @GetMapping("/users")
    public List<String> getUsers() {
        return messageService.getOnlineUsers();
    }

    @MessageMapping("/join")
    public void join(String userName) {
        this.messageService.broadcastMemberJoin(userName);
    }

    @MessageMapping("/leave")
    public void leave(String userName) {
        this.messageService.broadcastMemberLeave(userName);
    }

    @MessageMapping("/tell/{userName}")
    public void tell(@DestinationVariable String userName, String message) {
        this.messageService.broadcastMessage(userName, message);
    }

    @MessageMapping("/talk/to/{userName}")
    public void talkTo(@DestinationVariable String userName, String message) {
        this.messageService.talkToUser(userName, message);
    }

}
