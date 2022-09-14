<template>
  <div ref="rander" style="width: 600px; height: 400px" />
</template>

<script>
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent
} from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  RadarChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
])

export default {
  mounted() {
    const div = this.$refs.rander
    const myChart = echarts.init(div)
    myChart.setOption({
      legend: {
        data: ['Allocated Budget', 'Actual Spending']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '考勤', max: 100 },
          { name: '助人', max: 100 },
          { name: 'bug', max: 100 },
          { name: '分享', max: 100 },
          { name: '管理', max: 100 },
          { name: '技术', max: 100 }
        ],
        axisName: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'radar',
          data: [
            {
              value: [100, 40, 80, 50, 80, 60],
              name: '张三考勤'
            },
            {
              value: [80, 95, 60, 70, 70, 50],
              name: '李四指标'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style lang="scss" scoped></style>
