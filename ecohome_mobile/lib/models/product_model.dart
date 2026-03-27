class ProductModel {
  final int id;
  final String name;
  final String description;
  final dynamic price;
  final int stock;
  final String creatorUsername;

  ProductModel({
    required this.id,
    required this.name,
    required this.description,
    required this.price,
    required this.stock,
    required this.creatorUsername,
  });

  factory ProductModel.fromJson(Map<String, dynamic> json) {
    return ProductModel(
      id: json['id'],
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      price: json['price'],
      stock: json['stock'] ?? 0,
      creatorUsername: json['creator']?['username'] ?? '',
    );
  }
}