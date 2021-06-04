package com.gizone.chatroom.controller;

import com.gizone.chatroom.model.ChatMessage;
import com.gizone.chatroom.model.User;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebsocketController {

    @MessageMapping("/join")
    @SendTo("/conversation/welcome")
    public ChatMessage greeting(User user) {
        return new ChatMessage("Hi, " + user.getName() + "!");
    }
}
