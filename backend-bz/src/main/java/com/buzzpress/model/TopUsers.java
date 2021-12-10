package com.buzzpress.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopUsers {
    private String name;
    private Long points;
    private String authorId;
}
