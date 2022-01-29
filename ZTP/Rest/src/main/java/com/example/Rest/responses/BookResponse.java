package com.example.Rest.responses;

import com.example.Rest.beans.Book;

import java.util.List;

public class BookResponse {

    private Book book;
    private int status;

    public BookResponse() {
    }

    public BookResponse(Book book, int status) {
        this.book = book;
        this.status = status;
    }

    public Book getBook() {
        return book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
