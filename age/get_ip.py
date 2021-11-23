import socket

name = socket.gethostname()
ip = socket.gethostbyname(name)

print(name, ip)