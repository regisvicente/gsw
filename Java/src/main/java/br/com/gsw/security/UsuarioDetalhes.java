package br.com.gsw.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import br.com.gsw.model.Usuario;

public class UsuarioDetalhes implements UserDetails {

	private Usuario usuario;
	private static final long serialVersionUID = 1L;

	public UsuarioDetalhes(Usuario usuario) {
		this.usuario = usuario;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		//String roles = StringUtils.collectionToCommaDelimitedString(userRoles);

		return AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_"+ usuario.getAcesso().getValor());
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public String getUsername() {
		return usuario.getNome();
	}
	
	@Override
	public String getPassword() {
		return usuario.getSenha();
	}

}
