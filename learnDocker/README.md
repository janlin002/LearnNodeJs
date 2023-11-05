```bash
docker build -t <name> .
```

-t 代表 tag
. 代表當前目錄

```bash
docker images
```

查看 image

```bash
docker run -p 3005:3000 <name>
```

3005 執行起來的 port
3000 dockerfile 裡面的 port

```bash
docker rm <name>
```

```bash
docker rmi <name>
```

列出所有容器 (不包含失敗的)

```bash
docker ps
```

列出所有容器 (包含失敗的)

```bash
docker ps -a
```

```bash
docker stop <name>
```

```bash
docker start <name>
```
