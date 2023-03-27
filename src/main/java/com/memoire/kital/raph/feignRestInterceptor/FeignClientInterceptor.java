package com.memoire.kital.raph.feignRestInterceptor;

import com.memoire.kital.raph.security.SecurityUtils;
import feign.RequestInterceptor;
import feign.RequestTemplate;

public class FeignClientInterceptor implements RequestInterceptor {
    @Override
    public void apply(RequestTemplate requestTemplate) {
        String token = SecurityUtils.getJwtToken();
        if(null != token && !token.trim().isEmpty()) {
            requestTemplate.header("Authorization", "Bearer " + token);
        }
    }
}
