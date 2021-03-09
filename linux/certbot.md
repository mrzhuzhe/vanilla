# certibot
1. 自动证书 https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx
2. 给证书单独开个组 https://trojan-tutor.github.io/2019/04/10/p41.html

3. 软链接过来的文件要cat的话必须原始文件有权限才行(似乎不是这个原因，仅把/etc/letsencrypt/live 设置为750 必须 /etc/letsencrypt/archive 设置为755 才行，不知道会不会对证书续期有影响 ）

4. 下个月测一下 crontab