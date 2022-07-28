package me.flyray.bsin.server.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import me.flyray.bsin.facade.service.DictService;
import me.flyray.bsin.server.domain.SysDict;
import me.flyray.bsin.server.domain.SysDictItem;
import me.flyray.bsin.server.mapper.DictItemMapper;
import me.flyray.bsin.server.mapper.DictMapper;
import me.flyray.bsin.server.utils.BsinPageUtil;
import me.flyray.bsin.server.utils.BsinServiceContext;
import me.flyray.bsin.server.utils.BsinSnowflake;
import me.flyray.bsin.server.utils.RespBodyHandler;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;

/**
 * @author ：bolei
 * @date ：Created in 2022/3/28 22:38
 * @description：数据字典服务
 * @modified By：
 */

public class DictServiceImpl implements DictService {

    @Autowired
    private DictMapper dictMapper;
    @Autowired
    private DictItemMapper dictItemMapper;

    @Override
    public Map<String, Object> add(Map<String, Object> requestMap) {
        SysDict dict = BsinServiceContext.getReqBodyDto(SysDict.class, requestMap);
        String id = BsinSnowflake.getId();
        dict.setTenantId(id);
        dict.setId(id);
        dictMapper.insert(dict);
        return RespBodyHandler.setRespBodyDto(dict);
    }

    @Override
    public Map<String, Object> delete(Map<String, Object> requestMap) {
        String id = (String)requestMap.get("id");
        dictMapper.deleteById(id);
        return RespBodyHandler.RespBodyDto();
    }

    @Override
    public Map<String, Object> edit(Map<String, Object> requestMap) {
        SysDict dict = BsinServiceContext.getReqBodyDtoId(SysDict.class, requestMap);
        dictMapper.updateById(dict);
        return RespBodyHandler.setRespBodyDto(dict);
    }

    @Override
    public Map<String, Object> getPageList(Map<String, Object> requestMap) {
        String dictType = (String)requestMap.get("dictType");
        Map<String,Object> pagination = (Map<String,Object>)requestMap.get("pagination");
        BsinPageUtil.pageNotNull(pagination);
        PageHelper.startPage((Integer) pagination.get("pageNum"),(Integer) pagination.get("pageSize"));
        List<SysDict> dicts = dictMapper.selectPageList(dictType);
        PageInfo<SysDict> pageInfo = new PageInfo<SysDict>(dicts);
        return RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }

    @Override
    public Map<String, Object> getDictById(Map<String, Object> requestMap) {
        String id = (String)requestMap.get("id");
        SysDict dict = dictMapper.selectListById(id);
        return RespBodyHandler.setRespBodyDto(dict);
    }

    @Override
    public Map<String, Object> getDictByType(Map<String, Object> requestMap) {
        String dictType = (String)requestMap.get("dictType");
        List<SysDict> dicts = dictMapper.selectListByDictType(dictType);
        return RespBodyHandler.setRespBodyListDto(dicts);
    }

    @Override
    public Map<String, Object> addItem(Map<String, Object> requestMap) {
        SysDictItem dictItem = BsinServiceContext.getReqBodyDto(SysDictItem.class, requestMap);
        String id = BsinSnowflake.getId();
        dictItem.setId(id);
        dictItemMapper.insert(dictItem);
        return RespBodyHandler.setRespBodyDto(dictItem);
    }

    @Override
    public Map<String, Object> deleteItem(Map<String, Object> requestMap) {
        String id = (String)requestMap.get("id");
        dictItemMapper.deleteById(id);
        return RespBodyHandler.RespBodyDto();
    }

    @Override
    public Map<String, Object> getDictItemById(Map<String, Object> requestMap) {
        SysDictItem dictItem = BsinServiceContext.getReqBodyDtoId(SysDictItem.class, requestMap);
        dictItemMapper.updateById(dictItem);
        return RespBodyHandler.setRespBodyDto(dictItem);
    }

    @Override
    public Map<String, Object> editItem(Map<String, Object> requestMap) {
        SysDictItem dictItem = BsinServiceContext.getReqBodyDtoId(SysDictItem.class, requestMap);
        dictItemMapper.updateById(dictItem);
        return RespBodyHandler.setRespBodyDto(dictItem);
    }

    @Override
    public Map<String, Object> getDictItemPageList(Map<String, Object> requestMap) {
        String dictType = (String)requestMap.get("dictType");
        Map<String,Object> pagination = (Map<String,Object>)requestMap.get("pagination");
        BsinPageUtil.pageNotNull(pagination);
        PageHelper.startPage((Integer) pagination.get("pageNum"),(Integer) pagination.get("pageSize"));
        List<SysDictItem> dictItems = dictItemMapper.selectPageList(dictType);
        PageInfo<SysDictItem> pageInfo = new PageInfo<SysDictItem>(dictItems);
        return RespBodyHandler.setRespPageInfoBodyDto(pageInfo);
    }

    @Override
    public Map<String, Object> getDictItemList(Map<String, Object> requestMap) {
        String dictType = (String)requestMap.get("dictType");
        List<SysDictItem> dictItems = dictItemMapper.selectList(dictType);
        return RespBodyHandler.setRespBodyListDto(dictItems);
    }
}
