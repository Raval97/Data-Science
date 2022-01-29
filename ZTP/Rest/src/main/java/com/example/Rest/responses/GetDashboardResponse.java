package com.example.Rest.responses;

import com.example.Rest.beans.Book;
import java.util.List;

public class GetDashboardResponse {

    private List<Book> books;
    private int status;

    public GetDashboardResponse() {
    }

    public GetDashboardResponse(List<Book> books, int status) {
        this.books = books;
        this.status = status;
    }

    public List<Book> getBooks() {
        return books;
    }

    public void setBooks(List<Book> books) {
        this.books = books;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
