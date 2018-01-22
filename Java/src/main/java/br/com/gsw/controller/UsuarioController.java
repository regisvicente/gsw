package br.com.gsw.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.gsw.model.Usuario;
import br.com.gsw.service.UsuarioService;

@RestController
@RequestMapping("/api/clientes")
public class UsuarioController {
	
	@Autowired
	private UsuarioService usuarioService;

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> salvar(@RequestBody Usuario usuario) {
		this.usuarioService.salvarEncriptaSenha(usuario);
		return new ResponseEntity<>(usuario, HttpStatus.OK);
	}

	@GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<List<Usuario>> buscarTodos() {
		return new ResponseEntity<>(this.usuarioService.buscarTodos(), HttpStatus.OK);
	}
	
	@GetMapping(value = "/nome/{nome}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> buscarPorId(@PathVariable String nome) {
		return new ResponseEntity<>(this.usuarioService.procuraPorNome(nome), HttpStatus.OK);
	}

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> buscarPorId(@PathVariable Integer id) {
		return new ResponseEntity<>(this.usuarioService.buscarPorId(id), HttpStatus.OK);
	}

	@DeleteMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Usuario> deletar(@PathVariable Integer id) {
		return new ResponseEntity<>(this.usuarioService.deletar(id), HttpStatus.OK);
	}

}
