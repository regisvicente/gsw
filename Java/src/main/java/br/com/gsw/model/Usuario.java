package br.com.gsw.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.com.gsw.constants.TipoAcesso;
import lombok.Data;

@Entity
@Data
public class Usuario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable=false, length=50)
	private String nome;
	
	@Column(nullable=false)
	private String senha;
	
	private BigDecimal saldo;
	
	@Column(nullable=false, length=1)
	private TipoAcesso acesso;

}
