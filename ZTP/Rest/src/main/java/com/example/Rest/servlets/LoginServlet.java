package com.example.Rest.servlets;

import com.example.Rest.beans.Role;
import com.example.Rest.beans.User;
import com.example.Rest.requests.LoginRequest;
import com.example.Rest.responses.ExceptionResponse;
import com.example.Rest.responses.Response;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static com.example.Rest.helpers.Utils.getBase64FromString;

@WebServlet(name = "login", urlPatterns = "/login")
public class LoginServlet extends HttpServlet {

    protected static Map<String, String> loginAndPasswordMap = new HashMap<>();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("In LoginServlet POST");
        response.setContentType("application/json;charset=UTF-8");
        Gson gson = new Gson();
        HttpSession session = request.getSession();
        try {
            LoginRequest loginRequest = gson.fromJson(request.getReader(), LoginRequest.class);
            if (!checkCorrectOfRequestBody(loginRequest))
                throw new Exception("Wrong data login format");
            Boolean authorization;
            authorization = loginRequest.getLogin().equals("admin") ?
                    loginForAdmin(loginRequest.getLogin(), loginRequest.getPass(), session) :
                    loginForUser(loginRequest.getLogin(), loginRequest.getPass(), session);
            if (authorization) {
                response.addCookie(new Cookie("userId", getBase64FromString(loginRequest.getLogin())));
                response.sendRedirect("dashboard");
            } else {
                Response responseMess = new Response("Invalid authorization", 400);
                response.setStatus(400);
                gson.toJson(responseMess, response.getWriter());
            }
        } catch (Exception ex) {
            ExceptionResponse exResponse = new ExceptionResponse();
            exResponse.setMessage(ex.getLocalizedMessage());
            exResponse.setStatus(500);
            response.setStatus(500);
            gson.toJson(exResponse, response.getWriter());
        }
        System.out.println("Out LoginServlet POST");
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("In LoginServlet GET");
        response.setContentType("application/json;charset=UTF-8");
        Gson gson = new Gson();
        Response responseMess = new Response("You have to authorize", 300);
        response.setStatus(400);
        gson.toJson(responseMess, response.getWriter());
        System.out.println("Out LoginServlet GET");
    }

    private boolean checkCorrectOfRequestBody(LoginRequest loginRequest) {
        if (loginRequest.getLogin() != null && !loginRequest.getLogin().equals("") &&
                loginRequest.getPass() != null && !loginRequest.getPass().equals(" "))
            return true;
        return false;
    }

    private boolean loginForUser(String login, String password, HttpSession session) throws IOException {
        if (checkUser(login, password)) {
            session.setAttribute("loggedUser", new User(login, password, Role.USER));
            return true;
        } else
            return false;
    }

    private boolean loginForAdmin(String login, String password, HttpSession session) throws IOException {
        if (password.equals("admin")) {
            session.setAttribute("loggedUser", new User(password, password, Role.ADMIN));
            return true;
        } else
            return false;
    }

    protected boolean checkUser(String login, String password) {
        String userPassword = loginAndPasswordMap.get(login);
        return userPassword != null && userPassword.equals(password);
    }

    @Override
    public void init() throws ServletException {
        @SuppressWarnings("unchecked")
        List<User> users = (ArrayList<User>) getServletContext().getAttribute("users");
        loginAndPasswordMap = users.stream().collect(Collectors.toMap(User::getLogin, User::getPass));
        super.init();
    }

}
