package tr.com.obss.jip.springfinal.model;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Date;

public class BookUpdateDTO {
    @Min(value=0)
    @Max(value=Integer.MAX_VALUE)
    private int pageCount;

    private String publisher;

    private Date publicationDate;

    public int getPageCount() {
        return pageCount;
    }

    public void setPageCount(int pageCount) {
        this.pageCount = pageCount;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }
}
