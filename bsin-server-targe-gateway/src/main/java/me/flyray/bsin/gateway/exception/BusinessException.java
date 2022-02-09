package me.flyray.bsin.gateway.exception;


import lombok.Data;
import me.flyray.bsin.gateway.common.ReturnCode;


@Data
public class BusinessException extends RuntimeException{

	private static final long serialVersionUID = 1L;

	protected String code ;
	protected String message ;

	public BusinessException(ReturnCode enums) {
		super();
		this.code = enums.getReturnCode();
		this.message = enums.getReturnMessage();
	}

	public BusinessException(String code) {
		super(code);
		this.code = code;
	}

	public BusinessException(String code, String message){
		this(code,message,null,null);
		this.code = code;
		this.message = message;
	}

	public BusinessException(String code, Object... arguments) {
		super(code);
		this.code = code;
	}

	public BusinessException(String code, Throwable cause) {
		super(code, cause);
		this.code = code;
		this.message = cause.getMessage();
	}

	public BusinessException(Throwable e){
	    super(e);
		this.message = e.getMessage();
	}

	public static void main(String[] args) {
		String[] sexs = {"男性","女性","中性"};
		for(int i = 0; i < sexs.length; i++){
			if("中性".equals(sexs[i])){
				//throw new ApiException("你全家都是中性！");
				throw new BusinessException("22","你全家都是中性！");
			}else{
				System.out.println(sexs[i]);
			}
		}
	}


}
