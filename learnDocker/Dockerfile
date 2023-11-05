# node 版本
FROM node:18

# 建立資料夾
WORKDIR /usr/src/app

# 將 package.json 複製到 Docker容器 中
COPY package*.json ./

# 正式運行前的環境建立
RUN npm install

# 當前目錄複製到 Docker目錄 中
COPY . .

EXPOSE 3000

# 執行指令
CMD ["npm", "start"]