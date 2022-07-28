package me.flyray.bsin.gateway.service;

import me.flyray.bsin.gateway.domain.CpqRiskArea;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;


public interface ExcelService {
     List<CpqRiskArea> importExcel(MultipartFile file) throws IOException;

     void downloadExcel(HttpServletResponse response, String inFileName, String outFileNam);
}
