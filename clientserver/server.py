from simple_http_server import route, server
from simple_http_server import request_map
from simple_http_server import Response
from simple_http_server import MultipartFile
from simple_http_server import Parameter
from simple_http_server import Parameters
from simple_http_server import Header
from simple_http_server import JSONBody
from simple_http_server import HttpError
from simple_http_server import StaticFile
from simple_http_server import Headers
from simple_http_server import Cookies
from simple_http_server import Cookie
from simple_http_server import Redirect
from simple_http_server import ModelDict
from simple_http_server import PathValue
import subprocess
import os
from subprocess import Popen, PIPE

@route("/")
def index():
    return {"hello": "world"}   



@request_map("/notepad")
def my_path_val_ctr():
        #     /Clear

        # /TCP

        # /IP:192.168.2.5
    FNULL = open(os.devnull, 'w')    #use this if you want to suppress output to stdout from the subprocess
    
    # args = "./VBSIpSetting.exe /Clear /TCP /IP: " + path_val
    args = "C:/Windows/system32/notepad.exe"
    subprocess.call(args, stdout=FNULL, stderr=FNULL, shell=False)
    return f"<html><body>good</body></html>"

@request_map("/setip2")
def my_path_val_ctr2():
        #     /Clear

        # /TCP

        # /IP:192.168.2.5
    FNULL = open(os.devnull, 'w')    #use this if you want to suppress output to stdout from the subprocess
    
    # args = "./VBSIpSetting.exe /Clear /TCP /IP: " + path_val
    args = "./VBSIpSetting.exe"
    subprocess.call(args, stdout=FNULL, stderr=FNULL, shell=False)
    return f"<html><body>good</body></html>"
    
@request_map("/setip/{path_val}")
def my_path_val_ctr(path_val=PathValue()):
  

    FNULL = open(os.devnull, 'w')    #use this if you want to suppress output to stdout from the subprocess
    
    args = "./VBSIpSetting.exe /Clear /TCP /IP:" + path_val
    # args = "./VBSIpSetting.exe"
    # args = "C:/Windows/system32/notepad.exe"
    subprocess.call(args, stdout=FNULL, stderr=FNULL, shell=False)
    
    return f"<html><body>{path_val}</body></html>"




server.start(port=9090)


# import SimpleHTTPServer
# import SocketServer
# import sys
# import socket
# import os 
# import subprocess

# if len(sys.argv) > 1:
#     try:
#         PORT = int(sys.argv[1])
#     except ValueError:
#         PORT = -1
# else:
#     PORT = 8000

# print("WinSimpleHTTP ----v1.1--------------------")
# # Port range
# # https://stackoverflow.com/questions/113224/what-is-the-largest-tcp-ip-network-port-number-allowable-for-ipv4#113228
# if PORT < 2 or PORT > 65535:
#     print( "Invalid Port : " + str(PORT))
#     print ("Port must be 2-65535")
#     print ("------------------------------------------")
# else:
#     path = os.path.dirname(os.path.realpath(__file__))

#     # How to get IP
#     # https://stackoverflow.com/questions/166506/finding-local-ip-addresses-using-pythons-stdlib
#     ip = [l for l in ([ip for ip in socket.gethostbyname_ex(socket.gethostname())[2] if not ip.startswith("127.")][:1], [[(s.connect(('8.8.8.8', 53)), s.getsockname()[0], s.close()) for s in [socket.socket(socket.AF_INET, socket.SOCK_DGRAM)]][0][1]]) if l][0][0]

    
#     Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
#     httpd = SocketServer.TCPServer(("", PORT), Handler)
#     print( path + " ---> " + ip + ":" + str(PORT))
#     print( "------------------------------------------")
#     httpd.serve_forever()
# /Clear

# /TCP

# /IP:192.168.2.5
#     FNULL = open(os.devnull, 'w')    #use this if you want to suppress output to stdout from the subprocess
#     filename = "my_file.dat"
#     args = "RegressionSystem.exe -config " + filename
#     subprocess.call(args, stdout=FNULL, stderr=FNULL, shell=False)


# '''    Simple socket server using threads
# '''
# import socket
# import sys

# def recvall(sock, size):
#     received_chunks = []
#     buf_size = 4096
#     remaining = size
#     while remaining > 0:
#         received = sock.recv(min(remaining, buf_size))
#         if not received:
#             raise Exception('unexpected EOF')
#         received_chunks.append(received)
#         remaining -= len(received)
#     return b''.join(received_chunks)
# HOST = ''   # Symbolic name, meaning all available interfaces
# PORT = 5500 # Arbitrary non-privileged port
# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# print ('Socket created')
# #Bind socket to local host and port
# try:
#     s.bind((HOST, PORT))
# except socket.error as msg:
#     print ('Bind failed. Error Code : ' + str(msg[0]) + ' Message ' + msg[1])
#     sys.exit()
# print ('Socket bind complete')
# #Start listening on socket
# s.listen(10)
# print ('Socket now listening')
# #now keep talking with the client
# while 1:
#     #wait to accept a connection - blocking call
#     conn, addr = s.accept()
#     print(conn)
#     # if conn!=None:
#         # data=recvall(s, 2000)
#         # data=s.recvfrom()
#         # print(data)
#     conn.send("Hello".encode())
#     if addr[0]!='':
#         data=conn.recv(1024)
#         print("Client request:"+data.decode())
#     print ('Connected with ' + addr[0] + ':' + str(addr[1]))

# s.close()