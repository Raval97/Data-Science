package com.example.spring.security;

import com.example.spring.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private UserService userDetailsService;


    @Autowired
    public WebSecurityConfig(UserService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET, "/dashboard/**").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/dashboard/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/dashboard/**").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/html/adminDashboard.html").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/html/dashboard.html").hasRole("USER")
                .and().formLogin().permitAll().loginPage("/html/login.html")
                .successHandler(authSuccessHandler()).failureHandler(authFailureHandler())
                .and().logout().permitAll().logoutSuccessUrl("/html/login.html?logout")
                .and().httpBasic()
                .and().csrf().disable().cors();//.disable();
    }

    @Bean
    public AuthenticationSuccessHandler authSuccessHandler() {
        return new UrlAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authFailureHandler() {
        return new UrlAuthenticationFailureHandler();
    }

    @SuppressWarnings("deprecation")
    @Bean
    public static NoOpPasswordEncoder passwordEncoder() {
        return (NoOpPasswordEncoder) NoOpPasswordEncoder.getInstance();
    }

}

