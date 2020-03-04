const openRequest = window.indexedDB.open("indexedDB", 1)

let IDBDatabase

//错误回调
openRequest.addEventListener("error", function(event) {
  console.log("数据库打开错误!")
})

//成功回调
openRequest.addEventListener("success", function(event) {
  IDBDatabase = event.target.result
  getDataByName('person', 'E某')
  console.log("数据库打开成功！")
})

//建立/升级回调
openRequest.addEventListener("upgradeneeded", function(event) {
  //获取接口
  IDBDatabase = event.target.result

  //建立对象仓库，设置主键为'id', 获取对象仓库
  const objectStore = IDBDatabase.createObjectStore('person', { keyPath: 'id' })

  //建立索引，设置索引名称为'indexName', 索引对应属性'name', 属性是否不重复
  objectStore.createIndex('indexName', 'name', { unique: false })

  console.log("建立/升级数据库!")
})

function addData(store, data) {
  //在数据库中建立事务，并返回事务对象, 设置事务涉及的对象仓库, 以及事务的操作模式
  const IDBTransaction = IDBDatabase.transaction(store, 'readwrite')

  //获取对象仓库实例
  const IDBObjectStore = IDBTransaction.objectStore(store)

  const IDBRequest = IDBObjectStore.add(data)

  //添加回调
  IDBRequest.addEventListener("error", function(event) {
    console.log("添加数据失败!")
  })
  IDBRequest.addEventListener("success", function(event) {
    console.log("添加数据成功！")
  })

  //添加回调
  IDBTransaction.addEventListener("error", function(event) {
    console.log("数据添加事务错误！")
  })
}

function ergodic(store) {
  //在数据库中建立事务，并返回事务对象, 设置事务涉及的对象仓库, 以及事务的操作模式
  const IDBTransaction = IDBDatabase.transaction(store, 'readonly')

  //获取对象仓库实例
  const IDBObjectStore = IDBTransaction.objectStore(store)

  const IDBRequest = IDBObjectStore.openCursor()

  //添加回调
  IDBRequest.addEventListener("error", function(event) {
    console.log("遍历数据失败!")
  })
  IDBRequest.addEventListener("success", function(event) {
    const cursor = event.target.result
    if(cursor) {
      console.log(cursor)
      cursor.continue()
    } else (
      console.log("遍历完成!")
    )
  })

  //添加回调
  IDBTransaction.addEventListener("error", function(event) {
    console.log("数据便利事务错误！")
  })
}

function getDataByName(store, name) {
  //在数据库中建立事务，并返回事务对象, 设置事务涉及的对象仓库, 以及事务的操作模式
  const IDBTransaction = IDBDatabase.transaction(store, 'readonly')

  //获取对象仓库实例
  const IDBObjectStore = IDBTransaction.objectStore(store)

  const IDBIndex = IDBObjectStore.index('indexName')

  const IDBRequest = IDBIndex.get(name)

  //添加回调
  IDBRequest.addEventListener("error", function(event) {
    console.log("获取数据失败!")
  })
  IDBRequest.addEventListener("success", function(event) {
    console.log(event.target)
    console.log("获取数据成功！")
  })

  //添加回调
  IDBTransaction.addEventListener("error", function(event) {
    console.log("数据获取事务错误！")
  })
}
