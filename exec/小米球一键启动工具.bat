@echo OFF
color 0a
Title С����һ���������� by:����
Mode con cols=109 lines=30
:START
ECHO.
Echo                  ==========================================================================
ECHO.
Echo                                            С����ͻ�����������
ECHO.
Echo                                         ����:���� QQ��752102401
ECHO.
Echo                                         �ٷ�QQȺ��150134730;150134648;745317268
ECHO.
Echo                                                �ٷ���վ��
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
set /p tuns=   �밴�س�����ʼ��
echo.
xiaomiqiu.exe -config xiaomiqiu.conf  start-all 
PAUSE
goto TUNNEL

