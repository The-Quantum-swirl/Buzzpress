package com.buzzpress.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TopUsers {
    public String authorName;
    public Long points;
    public String authorId;
}
