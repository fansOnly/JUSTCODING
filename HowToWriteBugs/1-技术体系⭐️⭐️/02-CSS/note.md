###### 页面动画出现闪烁问题
在 Chrome and Safari中，当我们使用CSS transforms 或者 animations时可能会有页面闪烁的效果，下面的代码可以修复此情况：

```css
.cube {
   -webkit-backface-visibility: hidden;
   backface-visibility: hidden;
 
   -webkit-perspective: 1000;
   perspective: 1000;
   /* Other transform properties here */
}
```
在webkit内核的浏览器中，另一个行之有效的方法是

```css
.cube {
   -webkit-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
  /* Other transform properties here */
}
```


###### select内容居中显示、下拉内容右对齐

```css
select{
    text-align: center;
    text-align-last: center;
}
select option {
    direction: rtl;
}
```


##### 修改input输入框中光标的颜色不改变字体的颜色

```css
input{
    color:  #fff;
    caret-color: red;
}
```
