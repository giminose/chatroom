package com.gizone.chatroom.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    private String message;

    private String userName;

    private boolean isWhisper;

    private Timestamp createTime;
}
