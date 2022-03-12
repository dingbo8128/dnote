
# Windows

## Powershell

### Add Alias

```ps
PS C:\Users\bo> $profile
C:\Users\bo\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1 
```
Append `New-Alias e 'C:\Program Files (x86)\Notepad++\notepad++.exe'` to profile.

### Grep 

sls

### Install posh-git

https://github.com/dahlbyk/posh-git

```ps
PowerShellGet\Install-Module posh-git -Scope CurrentUser -Force
Import-Module posh-git
Add-PoshGitToProfile -AllHosts
```

### Duplicate tab
Let power shell know current location.
```ps
function prompt
{
  $loc = Get-Location

  $prompt = & $GitPromptScriptBlock

  $prompt += "$([char]27)]9;12$([char]7)"
  if ($loc.Provider.Name -eq "FileSystem")
  {
    $prompt += "$([char]27)]9;9;`"$($loc.Path)`"$([char]7)"
  }

  $prompt
}
```

Use short cut `ctrl + shift + d`.
