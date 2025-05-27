/**
 * Definition for a binary tree node.

 */
 function TreeNode(val, left, right) {
     this.val = (val===undefined ? 0 : val)
     this.left = (left===undefined ? null : left)
     this.right = (right===undefined ? null : right)
 }

/**
 * @param {TreeNode} root
 * @param {number[]} voyage
 * @return {number[]}
 */
var flipMatchVoyage = function(root, voyage) {
  if (root.val !== voyage[0]) return [-1]
  const res = []
  traverse(root, voyage, res)
  return res
};
function traverse(root, voyage, res) {
  if (!root.left || !root.right) return
  let i = 1
  while (i < voyage.length) {
      if (root.left && root.left.val !== voyage[i++]) {
          res.push(root.val)
          traverse(root.right, voyage, res)
          traverse(root.left, voyage, res)
      } else {
          traverse(root.left, voyage, res)
          traverse(root.right, voyage, res)
      }
  }
}

const res = flipMatchVoyage([1,2,3], [1,3,2])
console.log('res: ', res);