package br.com.gsw.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.gsw.model.Usuario;
import br.com.gsw.repository.UsuarioRepository;
import br.com.gsw.security.UsuarioDetalhes;


@Service
public class LoginService implements UserDetailsService {

	@Autowired
	UsuarioRepository repository;

	@Override
	public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {

		Usuario usuario = repository.findByNome(login);

		if (null == usuario) {
			throw new UsernameNotFoundException("Usuário não encontrado: " + login);
		}

		return new UsuarioDetalhes(usuario);

	}

}
