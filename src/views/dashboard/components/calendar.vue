<template>
  <div>
    <div class="content">
      <el-row type="flex" justify="end" style="margin-bottom: 20px">
        <el-select
          v-model="defaultYear"
          size="small"
          placeholder=""
          style="margin-right: 10px"
        >
          <el-option v-for="k in year" :key="k" lang="k" :value="k" />
        </el-select>
        <el-select v-model="defaultMonth" placeholder="" size="small">
          <el-option v-for="k in 12" :key="k" lang="k" :value="k" />
        </el-select>
      </el-row>
      <div>
        <el-calendar v-model="calendarDate">
          <template #dateCell="{ date }">
            <el-row type="flex" justify="center" align="center">
              {{ new Date(date).getDate() }}
              <span v-if="isWeek(date)" class="weekday">休</span>
            </el-row>
          </template>
        </el-calendar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startYear: {
      type: Date,
      default: () => new Date()
    }
  },
  data() {
    return {
      defaultYear: null,
      defaultMonth: null,
      year: [],
      calendarDate: new Date(`${this.defaultYear}-${this.defaultMonth}-1`)
    }
  },
  created() {
    this.defaultYear = this.startYear.getFullYear()
    this.defaultMonth = this.startYear.getMonth() + 1
    this.year = Array.from(Array(11), (v, i) => i + this.defaultYear - 5)
  },
  methods: {
    isWeek(date) {
      return new Date(date).getDay() === 0 || new Date(date).getDay() === 6
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar-table .el-calendar-day {
  height: 56px;
}
::v-deep .el-calendar-table tr td {
  border: 0;
}
::v-deep .el-calendar-table tr:first-child td {
  border-top: 1px solid #ebeef5;
}
::v-deep .el-row--flex.is-justify-center {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.weekday {
  font-size: 8px;
  background-color: #fa7c4d;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  color: white;
  text-align: center;
  line-height: 18px;
  position: absolute;
  right: 0;
  top: 9px;
}
</style>
