/* eslint-disable no-undef */
$(function() {
  const Amount = $('#amount')
  $('#spendAmount').click(function() {
    let newTotal = 0
    let amount = Number(Amount.val())
    if (amount) {
      newTotal += amount
    }
    $('#total').text(newTotal)
    Amount.val('')
  })
})