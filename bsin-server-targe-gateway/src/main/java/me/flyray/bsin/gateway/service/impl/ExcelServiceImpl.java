package me.flyray.bsin.gateway.service.impl;

import com.alibaba.fastjson.JSON;
import me.flyray.bsin.gateway.domain.CpqRiskArea;
import me.flyray.bsin.gateway.service.ExcelService;
import me.flyray.bsin.gateway.utils.ExcelUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ExcelServiceImpl implements ExcelService {

    @Override
    public List<CpqRiskArea>  importExcel(MultipartFile file) throws IOException {
        InputStream in = file.getInputStream();
        XSSFWorkbook wb = new XSSFWorkbook(in);
        XSSFSheet sheet = wb.getSheetAt(0);
        int lastRowNum = sheet.getLastRowNum();
        List<CpqRiskArea> cpqRiskAreaList = new ArrayList<CpqRiskArea>();
        for (int i = 1; i <= lastRowNum; i++){
            XSSFRow row = sheet.getRow(i);
            /** excel取值 */
            // 省
            String provinceName = ExcelUtils.getCell(row.getCell(0));
            // 市
            String cityName = ExcelUtils.getCell(row.getCell(1));
            // 区
            String areaName = ExcelUtils.getCell(row.getCell(2));
            // 风险等级
            String riskLevel = ExcelUtils.getCell(row.getCell(3));
            // 风险描述
            String riskDesc = ExcelUtils.getCell(row.getCell(4));

            /** Excel获取到的数据封装入库 */
            final CpqRiskArea cpqRiskArea = new CpqRiskArea();
            cpqRiskArea.setProvinceName(provinceName);
            cpqRiskArea.setCityName(cityName);
            cpqRiskArea.setAreaName(areaName);
            cpqRiskArea.setRiskLevel(Integer.valueOf(riskLevel));
            cpqRiskArea.setRiskDesc(riskDesc);
            //调用保存接口，数据添加的代码我就不提供了
            cpqRiskAreaList.add(cpqRiskArea);
        }
        return cpqRiskAreaList;
    }



    /**
     * 下载模板文件
     * @param response
     * @param inFileName
     * @param outFileNam
     */
    public void downloadExcel(HttpServletResponse response, String inFileName, String outFileNam) {
        InputStream inputStream = null;
        try {
            response.reset();
            //设置输出文件格式
            response.setContentType("application/vnd.ms-excel");
            response.setHeader("Content-Disposition", "attachment;filename=" + new String(outFileNam.getBytes(StandardCharsets.UTF_8), StandardCharsets.ISO_8859_1));
            ServletOutputStream outputStream = response.getOutputStream();
            inputStream = this.getClass().getResourceAsStream("/ExcelTemplate/"+inFileName);
            byte[] buff = new byte[1024];
            int length;
            while ((length = inputStream.read(buff)) != -1) {
                outputStream.write(buff, 0, length);
            }
            if (outputStream != null) {
                outputStream.flush();
                outputStream.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {

                try {
                    inputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }
}
