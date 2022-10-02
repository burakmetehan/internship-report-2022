package tr.com.obss.jip.springfinal.model;

import tr.com.obss.jip.springfinal.entity.Book;

import java.util.Date;

public class BookResponseDTO {
    private final long id;
    private final String name;
    private final String author;
    private final int pageCount;
    private final String type;
    private final String publisher;
    private final Date publicationDate;

    public BookResponseDTO(
            long id, String name, String author, int pageCount, String type, String publisher, Date publicationDate) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.pageCount = pageCount;
        this.type = type;
        this.publisher = publisher;
        this.publicationDate = publicationDate;
    }

    public BookResponseDTO(Book book) {
        this.id = book.getId();
        this.name = book.getName();
        this.author = book.getAuthor();
        this.pageCount = book.getPageCount();
        this.type = book.getType();
        this.publisher = book.getPublisher();
        this.publicationDate = book.getPublicationDate();
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAuthor() {
        return author;
    }

    public int getPageCount() {
        return pageCount;
    }

    public String getType() {
        return type;
    }

    public String getPublisher() {
        return publisher;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }
}
