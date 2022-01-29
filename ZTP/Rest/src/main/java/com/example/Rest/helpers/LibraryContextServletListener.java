package com.example.Rest.helpers;

import com.example.Rest.beans.Book;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.util.ArrayList;
import java.util.List;

@WebListener
public class LibraryContextServletListener implements ServletContextListener {

    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        List<Book> books = new ArrayList<>();
        books.add(new Book("HARRY POTTER", "J.K. ROWLIN", 1997));
        books.add(new Book("Władca Pierścieni", "J.R.R. Tolkien", 1954));
        books.add(new Book("It", "Stephen King", 1986));
        books.add(new Book("O psie, który jeździł koleją", "\tRoman Pisarski", 1967));
        books.add(new Book("Stary człowiek i morze", "Ernest Hemingway", 1952));
        servletContextEvent.getServletContext().setAttribute("books", books);
    }

}
