package tr.com.obss.jip.springfinal.exception;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Order(value = Ordered.HIGHEST_PRECEDENCE)
public class GlobalExceptionHandler {

    @ExceptionHandler(
            {
                    BookNotFoundException.class, RoleNotFoundException.class, UserNotFoundException.class})
    public ResponseEntity<Map<String, String>> handleEntityNotFound(HttpServletRequest request, Exception exception) {
        return new ResponseEntity<>(createExceptionMap(request, exception, HttpStatus.NOT_FOUND), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(
            {
                    BadRequestException.class})
    public ResponseEntity<Map<String, String>> handleBadRequestException(
            HttpServletRequest request, BadRequestException exception) {
        return new ResponseEntity<>(createExceptionMap(request, exception, HttpStatus.BAD_REQUEST),
                HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(
            {
                    ConflictException.class})
    public ResponseEntity<Map<String, String>> handleConflictException(
            HttpServletRequest request, ConflictException exception) {
        return new ResponseEntity<>(createExceptionMap(request, exception, HttpStatus.CONFLICT), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleException(HttpServletRequest request, Exception exception) {
        return new ResponseEntity<>(createExceptionMap(request, new Exception("No available message!"), HttpStatus.INTERNAL_SERVER_ERROR),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    public Map<String, String> createExceptionMap(
            HttpServletRequest request, Exception exception, HttpStatus httpStatus) {
        Map<String, String> map = new HashMap<>();

        map.put("timestamp", LocalDateTime.now().toString());
        map.put("path", request.getRequestURI());
        map.put("message", exception.getMessage());
        map.put("code", httpStatus.toString());

        return map;
    }
}
