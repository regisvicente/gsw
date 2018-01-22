package br.com.gsw.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import br.com.gsw.constants.TipoAcesso;
import br.com.gsw.service.LoginService;


@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private LoginService loginService;
	
	@Override public void configure(WebSecurity web) throws Exception { 
		web.ignoring()
			.antMatchers("/*.css")
			.antMatchers("/*.js")
			.antMatchers("/*.ttf")
			.antMatchers("/*.woff")
			.antMatchers("/*.jpg")
			.antMatchers("/*.jpeg")
			.antMatchers("/*.png")
			.antMatchers("/*.woff2"); 
	}
	 
	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		
		httpSecurity
				.csrf().disable().authorizeRequests()
				.antMatchers("/").permitAll()
				.antMatchers("/adm/**").permitAll()
				.antMatchers("/banco/**").permitAll()
				.antMatchers("/assets/**").permitAll()
				.antMatchers("/login").permitAll()
				.antMatchers(HttpMethod.POST, "/api/login").permitAll()
				.anyRequest().authenticated()
				.and()

				.addFilterBefore(new LoginFilter("/api/login", authenticationManager()),
						UsernamePasswordAuthenticationFilter.class)

				.addFilterBefore(new TokenFilter(), 
						UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {

		auth.inMemoryAuthentication()
			.withUser("admin")
			.password("root")
			.roles(TipoAcesso.ADMINISTRATIVA.getValor());

		auth.userDetailsService(loginService)
			.passwordEncoder(passwordencoder());

	}

	@Bean(name = "passwordEncoder")
	public PasswordEncoder passwordencoder() {
		return new BCryptPasswordEncoder();
	}

}
