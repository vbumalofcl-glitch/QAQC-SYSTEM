' ==============================================================================
' FCLaranang Dev Corp QA/QC Executive Management System
' Silent Background Application Launcher (No Terminal / No Console Window)
' ==============================================================================

Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")
ScriptDir = FSO.GetParentFolderName(WScript.ScriptFullName)

WshShell.CurrentDirectory = ScriptDir

' Check for pythonw executable
PythonExe = "pythonw.exe"
If FSO.FileExists("C:\Python314\pythonw.exe") Then
    PythonExe = "C:\Python314\pythonw.exe"
End If

' Run with WindowStyle 0 (SW_HIDE) so no command prompt window ever opens
WshShell.Run """" & PythonExe & """ server.py --app", 0, False
