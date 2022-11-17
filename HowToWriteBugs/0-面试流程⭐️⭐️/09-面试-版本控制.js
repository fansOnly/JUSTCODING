
// ************************************************ Git *******************************************************************

// 规范


// 流程
// 1 git init
// 2 git checkout [branch name]
// 3 git add.
// 4 git status
// 5 git commit -m ""
// 6 git remote add origin ""
// 7 git push

// 8 git pull  =  git fetch + git merge

// git rebase -i --autosquash [branch name]


// README.md
// .gitignore



// git config --global user.name "xxx"
// git config --global user.email xxx

// git clone xxx [rename]  重命名本地文件夹

// git config --global alias.ci commit 将commit指定别名ci

// git diff 修改后尚未暂存的比较
// 1 git diff --staged 对比暂存文件与最后一次提交的文件


// HEAD  HEAD～1 指向上一次提交
// HEAD~2 指向上上次提交


// git commit -a -m "msg" 跳过add直接提交
// git commit -am "msg"


// git stash list
// git stash   将工作区的内容放在堆栈中，不提交
// git stash pop 恢复工作区的内容，删除stash
// git stash apply 恢复工作区的内容



// git log 查看提交记录
// git log -p  显示每次提交所引入的差异
// git log -p -2 显示最近的两次提交
// git log --online  每次提交一行显示


// git commit -m "111"
// git add file
// git commit --amend  覆盖上一次提交，只显示一次提交信息



// git rebase -i <hash-prev>


// git checkout -- [file name]  取消工作区中的文件


// git reset --soft [hash]  保留本地修改
// git reset --hard [hash]  不保留本地修改



// git branch -d [branch name] 删除某个分之

// git branch -v 查看本地分支
// git branch -av 查看本地和远程分支
// git branch -vv 查看跟踪分支
// git branch --merged  查看哪些分支合并到当前分支


// git push origin local-branch:remote-branch  本地代码推送到远程某个分支


// git cherry-pick [hash]  获取某个分支的某次提交内容


// git 变基

// ? 创建仓库的流程

// 更新流程


// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
// ************************************************************************************************************************
