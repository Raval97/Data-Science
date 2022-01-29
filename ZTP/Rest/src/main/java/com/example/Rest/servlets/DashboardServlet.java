package com.example.Rest.servlets;

import com.example.Rest.beans.Book;
import com.example.Rest.requests.BookRequest;
import com.example.Rest.requests.LoginRequest;
import com.example.Rest.responses.BookResponse;
import com.example.Rest.responses.ExceptionResponse;
import com.example.Rest.responses.GetDashboardResponse;
import com.example.Rest.responses.Response;
import com.google.gson.Gson;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@WebServlet(name = "dashboard", urlPatterns = "/dashboard")
public class DashboardServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        System.out.println("In AdminServlet POST");
        response.setContentType("application/json;charset=UTF-8");
        Gson gson = new Gson();
        try {
            BookRequest bookRequest = gson.fromJson(request.getReader(), BookRequest.class);
            if (checkCorrectOfPostRequestBody(bookRequest)) {
                ArrayList<Book> books = (ArrayList<Book>) getBooksFromContext(request.getServletContext());
                Book newBook = new Book(bookRequest.getTitle(), bookRequest.getAuthor(), bookRequest.getYear());
                books.add(newBook);
                BookResponse responseMess = new BookResponse(newBook, 200);
                response.setStatus(200);
                gson.toJson(responseMess, response.getWriter());
            }
            else
                throw new Exception("Wrong data format");
        } catch (Exception ex) {
            ExceptionResponse exResponse = new ExceptionResponse();
            exResponse.setMessage(ex.getLocalizedMessage());
            exResponse.setStatus(500);
            response.setStatus(500);
            gson.toJson(exResponse, response.getWriter());
        }
        System.out.println("Out AdminServlet POST");

    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("In AdminServlet DELETE");
        Gson gson = new Gson();
        try {
            List<Book> books = getBooksFromContext(req.getServletContext());
            Integer index = Integer.parseInt(req.getParameter("id"));
            Optional<Book> bookToRemove = books
                    .stream().filter(b -> b.getId().equals(index))
                    .findFirst();
            if (bookToRemove.isPresent()){
                books.remove(bookToRemove.get());
                BookResponse responseMess = new BookResponse(bookToRemove.get(), 200);
                resp.setStatus(200);
                gson.toJson(responseMess, resp.getWriter());
            }
            else{
                Response responseMess = new Response("Wrong index of book", 400);
                resp.setStatus(400);
                gson.toJson(responseMess, resp.getWriter());
            }
        } catch (Exception ex) {
            ExceptionResponse exResponse = new ExceptionResponse();
            exResponse.setMessage(ex.getMessage());
            exResponse.setStatus(500);
            resp.setStatus(500);
            gson.toJson(exResponse, resp.getWriter());
            System.out.println("Out AdminServlet DELETE");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws
            ServletException, IOException {
        System.out.println("In AdminServlet GET");
        response.setContentType("application/json;charset=UTF-8");
        Gson gson = new Gson();
        try {
            List<Book> books = getBooksFromContext(request.getServletContext());
            GetDashboardResponse res = new GetDashboardResponse(books, 200);
            gson.toJson(res, response.getWriter());
        } catch (Exception ex) {
            ExceptionResponse exResponse = new ExceptionResponse();
            exResponse.setMessage(ex.getLocalizedMessage());
            exResponse.setStatus(500);
            response.setStatus(500);
            gson.toJson(exResponse, response.getWriter());
        }
        System.out.println("Out AdminServlet POST");
    }

    private boolean checkCorrectOfPostRequestBody(BookRequest bookRequest) {
        String title = bookRequest.getTitle();
        String author = bookRequest.getAuthor();
        int year = bookRequest.getYear();
        if (title != null && !title.equals("")
                && author != null && !author.equals("")
                && year > -4000 && year <= LocalDate.now().getYear())
            return true;
        return false;
    }

    private List<Book> getBooksFromContext(ServletContext servletContext) {
        List<Book> books = null;
        try {
            books = (ArrayList<Book>) servletContext.getAttribute("books");
        } catch (NumberFormatException exception) {
            exception.printStackTrace();
        }
        return books;
    }


}
