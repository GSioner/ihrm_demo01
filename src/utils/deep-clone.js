export default function getClone(list, id) {
  const arr = []
  list.forEach((item) => {
    if ((item.pid === '')) item['icon'] = 'chart'
    if (item.pid === id) {
      const children = getClone(list, item.id)
      if (children.length) {
        item['children'] = children
      }
      arr.push(item)
    }
  })
  return arr
}
/*
一、遍历新数据的id是否等于下一个数据的pid
二、新数据的pid是否为空，即为顶级部门
三、新数据pid不为空且下一个数据的pid不等于的id
*/
