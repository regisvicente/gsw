package br.com.gsw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppController {

	@RequestMapping({ "/", "/login", "/adm/**", "/banco/**" })
	public String index() {
		return "forward:/index.html";
	}

}
