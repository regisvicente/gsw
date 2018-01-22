package br.com.gsw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gsw.dto.SaqueDto;
import br.com.gsw.service.BancoService;

@RestController
@RequestMapping("/api/bancos")
public class BancoController {

	@Autowired
	private BancoService bancoService;
	
	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<String>> saque(@RequestBody SaqueDto saque ) throws Exception {
		
		return new ResponseEntity<List<String>>(this.bancoService.sacar(saque.getCliente(), saque.getValor()), HttpStatus.OK);
		
	}
	
	
}
