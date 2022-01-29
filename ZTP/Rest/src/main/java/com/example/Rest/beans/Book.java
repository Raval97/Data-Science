package com.example.Rest.beans;

public class Book {

    protected Integer id;
    protected String title;
    protected String author;
    protected int year;

    private static Integer identifier = 0;

    public Book(String title, String author, int year) {
        this.id = getNewId();
        this.title = title;
        this.author = author;
        this.year = year;
    }

    public Book() {
    }

    private Integer getNewId(){
        return ++identifier;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }
}
