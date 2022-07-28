package me.flyray.bsin.facade.service;

import com.google.protobuf.ServiceException;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;


import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.Map;

@Path("upload")
public interface FileUpAndDownService {
    /**
     *
     */
    @POST
    @Path("uploadPicture")
    @Produces("application/json")
    Map<String, Object> uploadPicture(@RequestParam MultipartFile file) throws ServiceException;
}
