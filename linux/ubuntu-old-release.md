# ubuntu 老版本最新repo不支持的问题

1. 改为old-release把头部的asia-xxx也得去掉
https://askubuntu.com/questions/996429/could-not-resolve-id-old-releases-ubuntu-com

2. 老版本升级
https://askubuntu.com/questions/91815/how-to-install-software-or-upgrade-from-an-old-unsupported-release

sudo sed -i -re 's/archive.canonical.com/old-releases.ubuntu.com/g' /etc/apt/sources.list

问题: /etc/apt/sources.list.d/partner.d 文件夹中还有路径要改

但是老版本有些跨版本更新没法升级，目前没有成功从18版本升级到20版本

