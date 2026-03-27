import 'package:flutter/material.dart';
import '../models/product_model.dart';
import '../models/message_model.dart';
import '../services/product_service.dart';
import '../services/user_service.dart';
import '../services/socket_service.dart';
import '../services/auth_service.dart';
import 'login_screen.dart';

class HomeScreen extends StatefulWidget {
  final Map<String, dynamic> user;
  final String token;

  const HomeScreen({
    super.key,
    required this.user,
    required this.token,
  });

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final productService = ProductService();
  final userService = UserService();
  final socketService = SocketService();
  final authService = AuthService();

  final messageController = TextEditingController();
  final nameController = TextEditingController();
  final descriptionController = TextEditingController();
  final priceController = TextEditingController();
  final stockController = TextEditingController();

  List<ProductModel> products = [];
  List<MessageModel> messages = [];
  int totalProducts = 0;
  bool loading = true;

  @override
  void initState() {
    super.initState();
    loadData();
    connectSocket();
  }

  Future<void> loadData() async {
    try {
      final productList = await productService.getProducts();
      final stats = await userService.getMyStats(widget.token);

      setState(() {
        products = productList;
        totalProducts = stats['total_products'] ?? 0;
        loading = false;
      });
    } catch (e) {
      setState(() {
        loading = false;
      });
    }
  }

  void connectSocket() {
  socketService.connect(widget.token);

  socketService.onMessages((data) {
    print('EVENTO messages: $data');

    final list = (data as List)
        .map((e) => MessageModel.fromJson(Map<String, dynamic>.from(e)))
        .toList();

    setState(() {
      messages = list;
    });

    print('TOTAL MENSAJES CARGADOS: ${messages.length}');
  });

  socketService.onNewMessage((data) {
    print('EVENTO new_message: $data');

    final message =
        MessageModel.fromJson(Map<String, dynamic>.from(data));

    setState(() {
      messages.add(message);
    });
  });
}

  Future<void> createProduct() async {
    try {
      await productService.createProduct(
        token: widget.token,
        name: nameController.text.trim(),
        description: descriptionController.text.trim(),
        price: double.parse(priceController.text.trim()),
        stock: int.parse(stockController.text.trim()),
      );

      nameController.clear();
      descriptionController.clear();
      priceController.clear();
      stockController.clear();

      await loadData();
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Error creando producto')),
      );
    }
  }

  void sendMessage() {
    final content = messageController.text.trim();
    if (content.isEmpty) return;

    socketService.sendMessage(content);
    messageController.clear();
  }

  Future<void> logout() async {
    await authService.logout();
    socketService.disconnect();

    if (!mounted) return;

    Navigator.pushReplacement(
      context,
      MaterialPageRoute(builder: (_) => const LoginScreen()),
    );
  }

  @override
  void dispose() {
    socketService.disconnect();
    messageController.dispose();
    nameController.dispose();
    descriptionController.dispose();
    priceController.dispose();
    stockController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final username = widget.user['username'] ?? 'Usuario';

    return Scaffold(
      appBar: AppBar(
        title: Text('$username ($totalProducts)'),
        actions: [
          TextButton(
            onPressed: logout,
            child: const Text('Salir'),
          ),
        ],
      ),
      body: loading
          ? const Center(child: CircularProgressIndicator())
          : Row(
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        const Text(
                          'Catálogo',
                          style: TextStyle(fontSize: 22),
                        ),
                        const SizedBox(height: 16),
                        TextField(
                          controller: nameController,
                          decoration: const InputDecoration(
                            labelText: 'Nombre',
                          ),
                        ),
                        TextField(
                          controller: descriptionController,
                          decoration: const InputDecoration(
                            labelText: 'Descripción',
                          ),
                        ),
                        TextField(
                          controller: priceController,
                          decoration: const InputDecoration(
                            labelText: 'Precio',
                          ),
                        ),
                        TextField(
                          controller: stockController,
                          decoration: const InputDecoration(
                            labelText: 'Stock',
                          ),
                        ),
                        const SizedBox(height: 10),
                        ElevatedButton(
                          onPressed: createProduct,
                          child: const Text('Crear producto'),
                        ),
                        const SizedBox(height: 20),
                        Expanded(
                          child: ListView.builder(
                            itemCount: products.length,
                            itemBuilder: (context, index) {
                              final p = products[index];
                              return Card(
                                child: ListTile(
                                  title: Text(p.name),
                                  subtitle: Text(
                                    'Precio: ${p.price} | Creador: ${p.creatorUsername}',
                                  ),
                                ),
                              );
                            },
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        const Text(
                          'Chat',
                          style: TextStyle(fontSize: 22),
                        ),
                        const SizedBox(height: 16),
                        Expanded(
                          child: ListView.builder(
                            itemCount: messages.length,
                            itemBuilder: (context, index) {
                              final m = messages[index];
                              return ListTile(
                                title: Text(m.username),
                                subtitle: Text(m.content),
                              );
                            },
                          ),
                        ),
                        Row(
                          children: [
                            Expanded(
                              child: TextField(
                                controller: messageController,
                                decoration: const InputDecoration(
                                  labelText: 'Escribe un mensaje',
                                ),
                              ),
                            ),
                            IconButton(
                              onPressed: sendMessage,
                              icon: const Icon(Icons.send),
                            )
                          ],
                        )
                      ],
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}