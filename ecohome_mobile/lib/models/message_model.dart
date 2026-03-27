class MessageModel {
  final int id;
  final String content;
  final String username;
  final String createdAt;

  MessageModel({
    required this.id,
    required this.content,
    required this.username,
    required this.createdAt,
  });

  factory MessageModel.fromJson(Map<String, dynamic> json) {
    return MessageModel(
      id: json['id'],
      content: json['content'] ?? '',
      username: json['username'] ?? '',
      createdAt: json['created_at'] ?? '',
    );
  }
}