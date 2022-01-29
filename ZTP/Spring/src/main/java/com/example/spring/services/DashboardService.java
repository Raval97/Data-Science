package com.example.spring.services;

import com.example.spring.models.Book;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class DashboardService {

    private List<Book> books;

    @Autowired
    public DashboardService() {
        List<Book> books = new ArrayList<>();
        books.add(new Book("Harry Potter", "J.K. ROWLIN", 1997));
        books.add(new Book("Władca Pierścieni", "J.R.R. Tolkien", 1954));
        books.add(new Book("It", "Stephen King", 1986));
        books.add(new Book("O psie, który jeździł koleją", "Roman Pisarski", 1967));
        books.add(new Book("Stary człowiek i morze", "Ernest Hemingway", 1952));
        this.books = books;
    }

    public Map<String, Object> getBooks() {
        Map<String, Object> result = new HashMap<String, Object>();
        try {
            result.put("books", books);
            result.put("Status", 200);
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> getBook(Integer index) {
        Map<String, Object> result = new HashMap<>();
        try {
            Optional<Book> foundBook = books
                    .stream().filter(b -> b.getId().equals(index))
                    .findFirst();
            if (foundBook.isPresent()) {
                result.put("book", foundBook.get());
                result.put("Status", 200);
            } else {
                result.put("Error", "Wrong index of book");
                result.put("Status", 400);
            }
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> deleteBook(Integer index) {
        Map<String, Object> result = new HashMap<>();
        try {
            Optional<Book> bookToRemove = books
                    .stream().filter(b -> b.getId().equals(index))
                    .findFirst();
            if (bookToRemove.isPresent()) {
                books.remove(bookToRemove.get());
                result.put("book", bookToRemove.get());
                result.put("Status", 200);
            } else {
                result.put("Error", "Wrong index of book");
                result.put("Status", 400);
            }
        } catch (Exception ex) {
            result.put("Error", ex.getMessage());
            result.put("Status", 500);
        }
        return result;
    }

    public Map<String, Object> addNewBook(String object) {
        Map<String, Object> result = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode jsonNode = mapper.readTree(object);
            String title = mapper.convertValue(jsonNode.get("title"), String.class);
            String author = mapper.convertValue(jsonNode.get("author"), String.class);
            Integer year = mapper.convertValue(jsonNode.get("year"), Integer.class);
            Book newBook = new Book(title, author, year);
            books.add(newBook);
            result.put("book", newBook);
            result.put("Status", 200);
        } catch (Exception ex) {
            result.put("book", "Wrong data format");
            result.put("Status", 500);
        }
        return result;
    }

}
