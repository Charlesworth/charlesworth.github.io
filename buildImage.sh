# Requires go, go dep and docker to be installed installed

go get -u github.com/charlesworth/websiteServer
CURRENT_DIR=$(pwd)
cd $GOPATH/src/github.com/charlesworth/websiteServer
dep ensure
CGO_ENABLED=0 go build -a -installsuffix cgo -o websiteServer
mv websiteServer $CURRENT_DIR/

cd $CURRENT_DIR

docker build . -t ccochane:latest
rm websiteServer
