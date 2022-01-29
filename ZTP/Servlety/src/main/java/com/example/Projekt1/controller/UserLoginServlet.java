package com.example.Projekt1.controller;
import com.example.Projekt1.model.Book;
import com.example.Projekt1.model.Role;
import com.example.Projekt1.model.User;
import com.example.Projekt1.util.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@WebServlet(name = "user_login", urlPatterns = "/user_login")
public class UserLoginServlet extends HttpServlet {

    protected  static Map<String, String> loginAndPasswordMap = new HashMap<>();

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String givenLogin = request.getParameter("login");
        String givenPassword = request.getParameter("password");

        if(checkUser(givenLogin, givenPassword)){
            getServletContext().setAttribute("user", new User(givenLogin, givenPassword, Role.USER));
            response.sendRedirect("welcome");
        }
        else{
            PrintWriter out = response.getWriter();
            String template = Utils.downloadTemplate("loginFailure.html", getServletContext());
            out.println(template);
            out.close();
        }

    }

    protected boolean checkUser(String login, String password){
        String userPassword = loginAndPasswordMap.get(login);
        return  userPassword != null && userPassword.equals(password);
    }

    @Override
    public void init() throws ServletException {
        @SuppressWarnings("unchecked")
        List<User> users = (ArrayList<User>) getServletContext().getAttribute("users");
        loginAndPasswordMap = users.stream().collect(Collectors.toMap(User::getLogin, User::getPass));
        super.init();
    }

}
