package br.com.gsw.security;

import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

public class TokenService {
	// EXPIRATION_TIME = 10 dias
	static final long EXPIRATION_TIME = 860_000_000;
	static final String SECRET = "HHaBEihjkdsaf22dfsKOk3lasdfsdafKKKsdf32";
	static final String TOKEN_PREFIX = "Bearer";
	static final String HEADER_STRING = "Authorization";

	static void addAuthentication(HttpServletResponse response,  Authentication auth) throws IOException {
				
		Map<String, Object> claims = new HashMap<String, Object>();
		claims.put("role", auth.getAuthorities());
		
		String JWT = Jwts.builder()
				.setClaims(claims)
				.setSubject(auth.getName())		
				.setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				.signWith(SignatureAlgorithm.HS512, SECRET).compact();
		
		geraJson(response, TOKEN_PREFIX + " " + JWT.toString());

	}

	static Authentication getAuthentication(HttpServletRequest request) {
		String token = request.getHeader(HEADER_STRING);

		if (token != null) {
			String user = Jwts.parser()
					.setSigningKey(SECRET)
					.parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody()
					.getSubject();

			if (user != null) {
				return new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList());
			}
		}
		return null;	
	}

	private static void geraJson(HttpServletResponse response, String token) throws IOException {

		JSONObject json = new JSONObject();

		try {
			json.put("token", token);
		} catch (JSONException e) {
			e.printStackTrace();
		}

		response.setContentType("application/json");
		response.getWriter().write(json.toString());

	}

}
