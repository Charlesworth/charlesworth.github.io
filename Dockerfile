FROM alpine

RUN apk --update add git ca-certificates
WORKDIR /app/

COPY . /app/

EXPOSE 443
EXPOSE 80
VOLUME ["/certs"]

ENTRYPOINT ["./websiteServer", "-domain=ccochrane.com", "-mappings=mappings.json", "-cirt_dir=/certs"]
