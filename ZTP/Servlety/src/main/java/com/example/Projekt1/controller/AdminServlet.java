package com.example.Projekt1.controller;

import com.example.Projekt1.model.Book;
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
import java.util.List;

@WebServlet(name = "admin_dashboard", urlPatterns = "/admin_dashboard")
public class AdminServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        User user = (User) getServletContext().getAttribute("user");
        if( user == null )
            response.sendRedirect("welcome");
        else {
            HttpSession session = request.getSession();
            String action = request.getParameter("action").toLowerCase().trim();
            String communicat = "Niepoprawny login lub haslo";
            @SuppressWarnings("unchecked")
            ArrayList<Book> books = (ArrayList<Book>) getServletContext().getAttribute("books");
            switch (action) {
                case "create": {
                    String title = request.getParameter("title");
                    String author = request.getParameter("author");
                    if (title != null && !title.equals("") && author != null && !author.equals("")) {
                        Book newBook = new Book(title, author, Integer.parseInt(request.getParameter("year")));
                        books.add(newBook);
                    }
                    break;
                }
                case "delete": {
                    books.remove(Integer.parseInt(request.getParameter("indexToRemove")));
                    break;
                }
            }
            response.sendRedirect("admin_dashboard");
        }
    }


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
            template = Utils.completeTeplate(template, "CREATE_BOOK_FORM", "createBookForm", getServletContext());
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
            out +=   "<td>";
            out +=      "<form action=\"admin_dashboard?action=delete&indexToRemove="+ i + "\" method=\"POST\">" ;
            out +=          "<button type=\"submit\" class=\"btn btn-primary\">Delete</button>";
            out +=       "</form>";
            out +=   "</td>";
            out += "</tr>";
        }
        return out;
    }

}
