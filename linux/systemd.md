1. systemd 查[unit]日志 journalctl -f -u [unit]

2. https://trojan-tutor.github.io/2019/04/10/p41.html
systemd 是用当前用户启动的，不是user中指定的用户， 所以会出现调用子进程变other的情况

3. 开启bbr

sudo bash -c 'echo "net.core.default_qdisc=fq" >> /etc/sysctl.conf' && sudo bash -c 'echo "net.ipv4.tcp_congestion_control=bbr" >> /etc/sysctl.conf && sudo sysctl -p