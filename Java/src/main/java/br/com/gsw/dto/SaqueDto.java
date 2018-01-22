package br.com.gsw.dto;

import java.math.BigDecimal;

import lombok.Data;

@Data
public class SaqueDto {
	
	private Integer cliente;
	private BigDecimal valor;

}
