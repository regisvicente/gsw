package br.com.gsw.constants;

public enum TipoAcesso {
	CLIENTE("CLIENTE"),
	ADMINISTRATIVA("ADM");
	
	private String tipo;
	
	TipoAcesso(String tipo){
		this.tipo = tipo;
	}
	
	public String getValor(){
        return this.tipo;
    }
}
