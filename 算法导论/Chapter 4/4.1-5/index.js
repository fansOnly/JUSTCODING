/**
 * 非递归、线性时间算法
 * 场景：已知 A[1...j] 的最大子数组，基于如下性质将解扩展为 A[1...j+1] 的最大子数组
 * 1、A[1...j+1] 的最大子数组要么是 A[1...j] 的最大子数组 => A[j+1] < 0
 * 2、要么是 A[i...j+1] 的最大子数组，其中 1 <= i <= j + 1 => A[j+1] > 0
 */
// TODO
