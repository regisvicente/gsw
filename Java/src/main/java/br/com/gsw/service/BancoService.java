package br.com.gsw.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.gsw.exception.ClienteInvalidoException;
import br.com.gsw.exception.MaxSaqueSimultaneosException;
import br.com.gsw.exception.SaldoInsuficienteException;
import br.com.gsw.model.Usuario;

@Service
public class BancoService {

	@Autowired
	private UsuarioService usuarioService;
	
	final int[] notas = { 100, 50, 20, 10 };

	int[][] saque = { { 100, 0 }, { 50, 0 }, { 20, 0 }, { 10, 0 } };

	final int indexQtd = 1;
	
	final int maxSaque = 5;
	
	static int saqueSimultaneo = 0;

	public List<String> sacar(int id, BigDecimal valor) throws Exception {
		
		saqueSimultaneo++;
		
		try
		{
			
			if ( saqueSimultaneo > maxSaque){
				throw new MaxSaqueSimultaneosException("Saque simultaneo excedido, aguarde!");
			}
				
			validaCliente(id, valor);

			calcularCedulas(valor);
			
			return imprimirCedulas();
		}
		finally {
			saqueSimultaneo--;
		}
		

	}

	private void calcularCedulas(BigDecimal valor) {

		zerarQuantidadeCedulas();

		Integer index = 0;

		while (valor.compareTo(new BigDecimal("0")) > 0) {
			if (valor.compareTo(new BigDecimal(notas[index])) >= 0) {
				valor = valor.subtract(new BigDecimal(notas[index]));
				saque[index][indexQtd]++;
			} else {
				index++;
			}

		}
	}

	private List<String> imprimirCedulas() {
		
		List<String> cedulas = new ArrayList<String>();
		
		for (int[] nota : saque) {
			if (nota[indexQtd] > 0) {
				cedulas.add(nota[indexQtd] + " nota(s) de " + nota[0]);
			}
		}
		
		return cedulas;
	}
	
	private void validaCliente(int id, BigDecimal valor) throws Exception {

		Usuario usuario = usuarioService.buscarPorId(id);
		
		if (usuario == null) {
			throw new ClienteInvalidoException("Cliente Inválido!");
		}

		if (valor.compareTo(usuario.getSaldo()) > 0) {
			throw new SaldoInsuficienteException("Saldo Insuficente!");
		}

		usuario.setSaldo(usuario.getSaldo().subtract(valor));

		usuarioService.salvar(usuario);
	}

	private void zerarQuantidadeCedulas() {
		for (int[] nota : saque) {
			nota[indexQtd] = 0;
		}
	}
}
