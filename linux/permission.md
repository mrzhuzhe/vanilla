# homebrew 权限问题

1. homebrew 执行时没权限访问sudo创建的homebrew文件 sudo chown -R $(whoami) $(brew --prefix)/*