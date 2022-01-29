package com.example.Projekt1.controller;

import com.example.Projekt1.model.Book;
import com.example.Projekt1.model.User;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet(name = "welcome", urlPatterns = "/welcome")
public class WelcomeServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        getServletContext().removeAttribute("user");
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        User user = (User) getServletContext().getAttribute("user");
        if( user == null )
            response.sendRedirect("login");
        else if (user.getLogin().equals("admin"))
            response.sendRedirect("admin_dashboard");
        else
            response.sendRedirect("dashboard");
    }

    @Override
    public void init() throws ServletException {

        List<User> users = new ArrayList<>();
        users.add(new User("user", "user"));
        users.add(new User("user1", "user1"));
        users.add(new User("user2", "user2"));
        getServletContext().setAttribute("users", users);
        super.init();

    }

}
