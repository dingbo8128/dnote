# Git

## 默认编辑器

```
git config --global core.editor vim
```

## 忽略变化

```
git update-index --assume-unchanged filename
git update-index --no-assume-unchanged filename

```

## Compare branch

```
git diff branch1 brnch2 -- filepath
```

## Windows Chmod

```
git update-index --chmod=+x script.sh
```

## Prune

solve error: cannot lock ref

```
git remote prune origin
```

## Stash

```
git stash drop
```

```
git stash clear
```

## remote

```
git remote remove origin
```
