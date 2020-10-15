# Git

+ 1 初始化仓库

```js
git init
```

+ 2 检出分支

```js
git checkout -b <分支名称>
```

+ 3 新增代码变更

> git commit -a 会独立启动一个编辑器用来编辑提交信息

```js
git add
git commit -a
```

+ 4 保持与远程分支(develop)同步

> 如果本地代码与远程有冲突，这个冲突可以在本地解决，然后在提交，而不是发起一个与远程仓库冲突的合并请求

```js
git checkout <develop>
git pull
```

+ 5 切换值功能分支，通过交互变基模式从develop分支中获取最新的代码提交，已更新本地的分支代码

> --autosquash 可以将所有提交压缩到按个提交

```js
git chechout <branchname>
git rebase -i --autosquash develop
```

+ 6 解决冲突，继续变基操作，没有可以跳过

```js
git add <file1> <file2> ...
git rebase --continue
```

+ 7 推送功能分支到远程

> 变基操作会改变提交历史，必须使用 -f 强制推送到远程
> 如果是协同开发，请使用 --force-with-lease

```js
git push -f
```

## 如何写好 Commit Message

+ 1 用新的空行将标题与主体隔开，Git会将提交的第一行识别为摘要信息

+ 2 标题限制在50个字符，主体单行超过72个字符需要主动折行

+ 3 标题首字母大写

+ 4 不要用句号结束标题

+ 5 在标题中使用祈使句

+ 6 在主体中描述 <b>是什么</b> 和 <b>为什么</b>
