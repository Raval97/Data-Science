package com.example.Projekt1.controller;
import com.example.Projekt1.model.Book;
import com.example.Projekt1.model.User;
import com.example.Projekt1.util.Utils;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet(name = "dashboard", urlPatterns = "/dashboard")
public class DashboardServlet extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        User user = (User) getServletContext().getAttribute("user");
        if( user == null )
            response.sendRedirect("welcome");
        else {
            @SuppressWarnings("unchecked")
            ArrayList<Book> books = (ArrayList<Book>) getServletContext().getAttribute("books");

            request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");
            response.setContentType("text/html; charset=UTF-8");
            PrintWriter out = response.getWriter();
            String template = Utils.downloadTemplate("dashboard.html", getServletContext());
            template = template.replace("[[LIST_OF_BOOKS]]", getBooksManagementForm(books));
            template = template.replace("[[CREATE_BOOK_FORM]]", "");
            out.println(template);
            out.close();
        }
    }

    private String getBooksManagementForm(List<Book> books) {
        String out = "";
        for (int i = 0; i < books.size(); i++) {
            out += "<tr>";
            out +=   "<th scope=\"row\">" + (i+1) +"</th>";
            out +=   "<td>" + books.get(i).getTitle() + "</td>";
            out +=   "<td>" + books.get(i).getAuthor() + "</td>";
            out +=   "<td>" + books.get(i).getYear() + "</td>";
            out += "</tr>";
        }
        return out;
    }

}
