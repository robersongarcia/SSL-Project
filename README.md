# SSL Project for CiberSecurity

## COMMANDS 

```shell 
    openssl req -x509 \
            -sha256 -days 356 \
            -nodes \
            -newkey rsa:2048 \
            -subj "/CN=localhost/C=VE/L=Ciudad Guayana" \
            -keyout rootCA.key -out rootCA.crt
```

That generates rootCA.key and rootCA.crt

```shell
openssl genrsa -out server.key 2048
```

That generates server private key

```shell
cat > csr.conf <<EOF
[ req ]
default_bits = 2048
prompt = no
default_md = sha256
req_extensions = req_ext
distinguished_name = dn

[ dn ]
C = VE
ST = Bolivar
L = Ciudad Guayana
O = localhost
OU = localhost
CN = localhost

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = localhost
DNS.2 = localhost
IP.1 = 192.168.1.5
IP.2 = 192.168.1.6

EOF
```
That Create Certificate Signing Request Configuration

```shell
openssl req -new -key server.key -out server.csr -config csr.conf
```

Generate Certificate Signing Request (CSR) Using Server Private Key

```shell
cat > cert.conf <<EOF

authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost

EOF
```
Create a external file cert.conf

```shell
openssl x509 -req \
    -in server.csr \
    -CA rootCA.crt -CAkey rootCA.key \
    -CAcreateserial -out server.crt \
    -days 365 \
    -sha256 -extfile cert.conf
```
Generates the ssl certificate using rootCA.crt and the rootCA.key
