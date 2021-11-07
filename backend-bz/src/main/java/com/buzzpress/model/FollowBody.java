package com.buzzpress.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowBody {
    private Long follower;
    private Long toFollow;
    private Long toUnFollow;

}
