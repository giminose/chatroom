package com.gizone.chatroom.service;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    private String userName;

    private String message;

    private boolean isWhisper;

    private Timestamp createTime;
}
