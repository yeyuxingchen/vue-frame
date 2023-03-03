@echo OFF
color 0a
Title 小米球一键启动工具 by:刺球
Mode con cols=109 lines=30
:START
ECHO.
Echo                  ==========================================================================
ECHO.
Echo                                            小米球客户端启动工具
ECHO.
Echo                                         作者:刺球 QQ：752102401
ECHO.
Echo                                         官方QQ群：150134730;150134648;745317268
ECHO.
Echo                                                官方网站：
ECHO.
Echo 					     http://www.xiaomiqiu.cn/
ECHO.
Echo                                         https://manager.xiaomiqiu.com/
ECHO.
Echo                  ==========================================================================
Echo.
echo.
echo.
:TUNNEL
set /p tuns=   请按回车键开始：
echo.
xiaomiqiu.exe -config xiaomiqiu.conf  start-all 
PAUSE
goto TUNNEL

