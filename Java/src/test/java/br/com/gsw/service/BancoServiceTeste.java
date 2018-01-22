package br.com.gsw.service;

import static org.junit.Assert.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.context.junit4.SpringRunner;

import br.com.gsw.exception.ClienteInvalidoException;
import br.com.gsw.exception.SaldoInsuficienteException;
import br.com.gsw.model.Usuario;


@RunWith(SpringRunner.class)
public class BancoServiceTeste {
	
	@TestConfiguration
	static class BancoServiceTesteContextConfiguration {

		@Bean
		public BancoService grupoService() {
			return new BancoService();
		}
	}
	
	@Autowired
	BancoService bancoService;
	
	
	@MockBean
	UsuarioService usuarioService;
	
	Usuario cliente1;
	
	Usuario cliente2;
	
	
	@Before
	public void setUp() {
	
		cliente1 = new Usuario();
		cliente1.setId(1);
		cliente1.setNome("cliente1");
		cliente1.setSaldo(new BigDecimal("800"));
		
		cliente2 = new Usuario();
		cliente2.setId(2);
		cliente2.setNome("cliente1");
		cliente2.setSaldo(new BigDecimal("100"));
		
		Mockito.when(usuarioService.buscarPorId(1)).thenReturn(cliente1);
		Mockito.when(usuarioService.buscarPorId(2)).thenReturn(cliente2);
		
	}

	@Test
	public void testeClienteComSaldo()  throws Exception {
		
		int idCliente = 1;
		
		List<String> resultado = new ArrayList<String>();
		resultado.add("5 nota(s) de 100");
		assertEquals(resultado, this.bancoService.sacar(idCliente, new BigDecimal("500")));
		
		resultado.clear();
		resultado.add("1 nota(s) de 20");
		resultado.add("1 nota(s) de 10");
		assertEquals(resultado, this.bancoService.sacar(idCliente, new BigDecimal("30")));
		
		resultado.clear();
		resultado.add("1 nota(s) de 50");
		resultado.add("1 nota(s) de 20");
		resultado.add("1 nota(s) de 10");
		assertEquals(resultado, this.bancoService.sacar(idCliente, new BigDecimal("80")));
		
		resultado.clear();
		resultado.add("1 nota(s) de 100");
		resultado.add("1 nota(s) de 10");
		assertEquals(resultado, this.bancoService.sacar(idCliente, new BigDecimal("110")));
		
	}
	
	@Test(expected = SaldoInsuficienteException.class)
	public void testeClienteSemSaldo()  throws Exception {
		
		int idCliente = 2;
			
		this.bancoService.sacar(idCliente, new BigDecimal("150"));	
	}
	
	@Test(expected = ClienteInvalidoException.class)
	public void testeClienteInvalido()  throws Exception {
		
		int idCliente = 3;
			
		this.bancoService.sacar(idCliente, new BigDecimal("150"));	
	}
	
	@Test
	public void testeVerificaSaldoCliente()  throws Exception {
		
		int idCliente = 1;
		
		this.bancoService.sacar(idCliente, new BigDecimal("500"));
		assertEquals(new BigDecimal("300"), cliente1.getSaldo());
		
		this.bancoService.sacar(idCliente, new BigDecimal("100"));	
		assertEquals(new BigDecimal("200"), cliente1.getSaldo());
		
	}

}
