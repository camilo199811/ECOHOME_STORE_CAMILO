import 'dart:convert';
import 'package:http/http.dart' as http;
import '../config/app_config.dart';

class UserService {
  Future<Map<String, dynamic>> getMyStats(String token) async {
    final response = await http.get(
      Uri.parse('$baseUrl/users/me/stats'),
      headers: {
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    } else {
      throw Exception('Error al obtener estadísticas');
    }
  }
}