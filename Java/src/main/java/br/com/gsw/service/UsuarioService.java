package br.com.gsw.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


import br.com.gsw.model.Usuario;
import br.com.gsw.repository.UsuarioRepository;

@Service
public class UsuarioService {
	
	@Autowired
	UsuarioRepository repositorio;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public void salvarEncriptaSenha(Usuario usuario) {

		usuario.setSenha(bCryptPasswordEncoder.encode(usuario.getSenha()));

		salvar(usuario);
	}
	
	public void salvar(Usuario usuario) {

		this.repositorio.save(usuario);
	}
	

	public List<Usuario> buscarTodos() {
		return repositorio.findAll();
	}

	public Usuario buscarPorId(Integer id) {
		return this.repositorio.findOne(id);
	}

	public Usuario deletar(Integer id) {

		Usuario usuario = buscarPorId(id);

		if (usuario != null) {
			this.repositorio.delete(id);
		}

		return usuario;
	}
	
	@Bean
	private BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	public Usuario procuraPorNome(String nome) {
		return this.repositorio.findByNome(nome);
	}

}
