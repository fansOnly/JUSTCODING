function transformDate(val) {
  return dayjs(val).format('YYYY年MM月DD日 A h:mm').replace(/AM/, '上午').replace(/PM/, '下午')
}




const data = {
  nextEndTime: "20230119235900",
nextOpenTime: "20230116000000",
periodId: "1",
purchaseBegTime: "20230110000000",
purchaseConfirmDate: "20230116",
purchaseEndTime: "20230112235900",
raisePeriodClassify: "subscription",
}


const date2 = {
  startTime: transformDate(data.purchaseBegTime),
  endTime: transformDate(data.purchaseEndTime),
  // confirmDate: dayjs(res.purchaseConfirmDate).format('YYYY-MM-DD'),
  nextStartTime: transformDate(data.nextOpenTime),
  nextStopTime: transformDate(data.nextStopTime),
}
console.log('date2=====', date2)
