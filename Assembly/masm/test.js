var coinChange = function (coins, amount) {
  let index = coins.length - 1;
  let res = -1;
  function dfs(surplus, count) {
    if (surplus === 0) {
      res = count;
      return;
    } else if (res !== -1 && count >= res - 1) {
      console.log(surplus)
      return;
    }
    for (let i = index; i >= 0; i--) {
      if (coins[i] <= surplus) dfs(surplus - coins[i], count + 1);
    }
  }
  dfs(amount, 0);
  return res;
};

console.log('count: '+ coinChange([1, 3, 5], 9));