package com.buzzpress.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FollowBody {
	
    private String follower;
    private String toFollow;
    private String toUnFollow;

}
