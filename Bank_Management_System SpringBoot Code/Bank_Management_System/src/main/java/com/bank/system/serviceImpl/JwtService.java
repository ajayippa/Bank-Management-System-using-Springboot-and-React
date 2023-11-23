package com.bank.system.serviceImpl;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.bank.system.entity.CustomerData;
import com.bank.system.entity.Roles;
import com.bank.system.repository.CustomerDataRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtService {
	
public static final String SECRET="E24Ako03qa5kflZsHW5jpBFR0x6qAVsIsErT0D+mIkuYEz0VP3kf7E3NeCkEYOIijSNUi1WbujhG0uQWB9z7FpRKyVNNinYTsj4yXSwOSfrjF9RLbfnkWX2GzxbKsFL2XkPh0f9zFuBXsuvvDQwu5IPJiLruefpjzokLf062XECcotQ32vDzVOOXw05piGsBOCVV5u8waBbMTDPYXrK3SSR/Koau4DNo+giqiNaUJLYNOa8QmEswEeWa12O8/L+RcItV0CUprTuM7hk7TuW6ZFfJVE0IbolU3fXJKlullkFqigFnvUawUVKD62tSzP2M3WIrczNTfUQ61kgAXS31qltlJGb9gxzbHZfnGl6vvaY=";

	@Autowired
	private CustomerDataRepository customerRepo;

	public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
    
    
	public String generateToken(String userName)
	{
		Map<String,Object> claims=new HashMap<>();
		
		CustomerData data = customerRepo.findByLoginId(userName);
		Roles role = data.getRole();
		claims.put("role", role.getRoleName());
		claims.put("name", userName);
		System.out.println(createToken(claims,userName));
		return createToken(claims,userName);
	}

	
	private String createToken(Map<String, Object> claims, String userName) {
		
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(userName)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*30))
				.signWith(getSignKey(),SignatureAlgorithm.HS256).compact();
	}

	private Key getSignKey() {
		byte[] keyBytes=Decoders.BASE64.decode(SECRET);
		return Keys.hmacShaKeyFor(keyBytes);
	}

}
