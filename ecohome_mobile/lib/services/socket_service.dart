import 'package:socket_io_client/socket_io_client.dart' as IO;
import '../config/app_config.dart';

class SocketService {
  IO.Socket? socket;

  void connect(String token) {
    socket = IO.io(
      baseUrl,
      IO.OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .setAuth({'token': token})
          .build(),
    );

    socket!.connect();
  }

  void disconnect() {
    socket?.disconnect();
  }

  void sendMessage(String content) {
    socket?.emit('send_message', {'content': content});
  }

  void onMessages(Function(dynamic) callback) {
    socket?.on('messages', callback);
  }

  void onNewMessage(Function(dynamic) callback) {
    socket?.on('new_message', callback);
  }
}