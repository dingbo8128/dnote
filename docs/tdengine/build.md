# build

## build

### ubuntu
```
sudo apt-get install build-essential libjansson-dev libsnappy-dev liblzma-dev libz-dev pkg-config
mkdir build
cmake .. -DBUILD_TOOLS=true  -DBUILD_HTTP=false
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn,direct
make -j 12
make install
```

### centos

```
sudo yum install zlib-devel xz-devel snappy-devel jansson jansson-devel pkgconfig libatomic libstdc++-static
```

## start

```
taosd
taosadapter
```
