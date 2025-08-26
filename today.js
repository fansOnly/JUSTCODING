var longestPalindrome = function(s) {
  let m = 0, n = 0
    for (let i = 0; i < s.length; i++) {
      for (let j = i + 1; j <= s.length; j++) {
        if (s.chartAt(j) === s.chartAt(i)) {}
      }
    }
};


console.log(longestPalindrome("babad"));