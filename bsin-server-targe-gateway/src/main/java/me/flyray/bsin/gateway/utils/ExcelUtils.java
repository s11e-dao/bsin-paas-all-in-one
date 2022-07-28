package me.flyray.bsin.gateway.utils;

import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.xssf.usermodel.XSSFCell;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

public class ExcelUtils {

        /**
         * 批量导入时 判断单元格类型2
         */
        public static String getCell(XSSFCell cell) {
            String cellValue = "";
            // 以下是判断数据的类型
            switch (cell.getCellTypeEnum()) {
                // 数字
                case NUMERIC:
                    if (org.apache.poi.ss.usermodel.DateUtil.isCellDateFormatted(cell)) {
                        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                        cellValue = sdf.format(org.apache.poi.ss.usermodel.DateUtil.getJavaDate(cell.getNumericCellValue())).toString();
                    } else {
                        DataFormatter dataFormatter = new DataFormatter();
                        cellValue = dataFormatter.formatCellValue(cell);
                    }
                    break;
                // 字符串
                case STRING:
                    cellValue = cell.getStringCellValue();
                    break;
                // Boolean
                case BOOLEAN:
                    cellValue = cell.getBooleanCellValue() + "";
                    break;
                // 公式
                case FORMULA:
                    cellValue = cell.getCellFormula() + "";
                    break;
                // 空值
                case BLANK:
                    cellValue = "";
                    break;
                // 故障
                case ERROR:
                    cellValue = "非法字符";
                    break;
                default:
                    cellValue = "未知类型";
                    break;
            }
            return cellValue;
        }

    }
