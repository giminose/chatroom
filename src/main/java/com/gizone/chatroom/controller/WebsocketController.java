package com.gizone.chatroom.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebsocketController {

    @MessageMapping("/join")
    @SendTo("/conversation/initial")
    public String chat(String msg) {
        System.out.println(msg);
        return msg;
    }
}
