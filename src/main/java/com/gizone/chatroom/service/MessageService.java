package com.gizone.chatroom.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

@Service
public class MessageService {

    private final SimpMessagingTemplate template;

    List<String> onlineUsers = new ArrayList<>();

    Map<String, List<String>> userBlockList;

    @Autowired
    public MessageService(SimpMessagingTemplate template) {
        this.template = template;
    }

    public List<String> getOnlineUsers() {
        return this.onlineUsers;
    }

    public void broadcastMemberJoin(String userName) {
        this.onlineUsers.add(userName);
        this.template.convertAndSend("/mp/welcome", userName);
    }

    public void broadcastMemberLeave(String userName) {
        Predicate<String> whoLeave = userName::equals;
        this.onlineUsers.removeIf(whoLeave);
        this.template.convertAndSend("/mp/leave", userName);
    }

    public void broadcastMessage(String userName, String message) {
        Timestamp now = new Timestamp(Instant.now().toEpochMilli());
        ChatMessage chatMessage = new ChatMessage(userName, message, false, now);
        this.template.convertAndSend("/mp/public", chatMessage);
    }

    public void talkToUser(String toUser, String fromUser, String message) {
        Timestamp now = new Timestamp(Instant.now().toEpochMilli());
        ChatMessage chatMessage = new ChatMessage(fromUser, message, true, now);
        this.template.convertAndSend("/mp/private" + toUser, chatMessage);
    }

}
