package com.example.Rest.helpers;

import com.example.Rest.beans.Book;
import com.example.Rest.beans.User;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.util.ArrayList;
import java.util.List;

@WebListener
public class UsersContextServletListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {

        List<User> users = new ArrayList<>();
        users.add(new User("user", "user"));
        users.add(new User("user1", "user1"));
        users.add(new User("user2", "user2"));
        servletContextEvent.getServletContext().setAttribute("users", users);

    }

}
