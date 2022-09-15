<template>
  <div>
    <el-upload
      v-if="show"
      ref="upload"
      action="#"
      list-type="picture-card"
      :limit="num"
      :file-list="fileList"
      :class="{ disabled: fileArray && showDouble }"
      :before-upload="beforeUpload"
      :on-progress="onProgress"
      :http-request="httpRequest"
      :on-success="onSuccess"
      :on-remove="onRemove"
      :on-change="onChange"
      :on-preview="onPreview"
      :on-exceed="onExceed"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress
      v-if="progressShow"
      :percentage="percent"
      style="width: 180px"
    />
    <el-dialog :visible.sync="dialogVisible" title="图片预览">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    showDouble: {
      type: Boolean,
      default: false
    },
    num: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [],
      show: true,
      currentFileUid: null,
      progressShow: false,
      percent: 0
    }
  },
  computed: {
    fileArray() {
      console.log('fileList: ', this.fileList)
      return this.fileList.length === 1
    }
  },
  methods: {
    // ^--- 上传之前验证文件
    beforeUpload(file) {
      // console.log('before', file)
      const type = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      const bool = type.some((item) => item === file.type)
      if (!bool) {
        this.$message.error('请选择jpeg、gif、bmp、png格式图片')
        return false
      }
      if (file.size >= 5242880) {
        this.$message.error('请选择不超过5M大小的图片')
        return false
      }
      this.currentFileUid = file.uid
      this.progressShow = true
      return true
    },
    // ^--- 上传时
    onProgress(res, file, fileList) {
      console.log('progress', res, file, fileList)
    },
    // ^--- 上传时调用的接口地址,并在成功上传后触发成功上传事件
    httpRequest(content) {
      // console.log('http', content)
      // if (content.file) {
      //   const { file } = content
      //   cos.putObject(
      //     {
      //       Bucket: 'photo-1252330056' /* 填入您自己的存储桶，必须字段 */,
      //       Region: 'ap-nanjing' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
      //       Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
      //       StorageClass: 'STANDARD',
      //       Body: file, // 上传文件对象
      //       onProgress: (data) => {
      //         this.percent = (data.percent * 100).toFixed(0)
      //         if (this.percent === 100) {
      //           setTimeout(() => {
      //             this.progressShow = false
      //             this.percent = 0
      //           }, 1000)
      //         }
      //       }
      //     },
      //     (err, data) => {
      //       if (err) this.$message.error(err)
      //       if (!err && data.statusCode === 200) {
      //         this.$message.success('数据传输成功')
      //         this.fileList = this.fileList.map((item) =>
      //           item.uid === this.currentFileUid ? { url: 'http://' + data.Location, upload: true } : item
      //         )
      //         // console.log(this.fileList)
      //       }
      //       console.log('data', data)
      //     }
      //   )
      // }
      content.onSuccess()
    },
    // ^--- 上传成功将文件url路径保存并赋值
    onSuccess(res, file, fileList) {
      // console.log('success', res, file, fileList)
      this.dialogImageUrl = file.raw
        ? URL.createObjectURL(file.raw)
        : this.fileList[0].url
    },
    // ^--- 浏览上传成功的图片
    onPreview(file) {
      // console.log('preview: ', file)
      this.dialogVisible = true
    },
    // ^--- 移除图片事件
    onRemove(file, fileList) {
      // console.log('remove', file, fileList)
      this.fileList = []
    },
    // ^--- 修改文件
    onChange(file, fileList) {
      // console.log('change', file, fileList)
      this.fileList = fileList.map((item) => item)
    },
    // ^--- 超出限制事件
    onExceed(res, file, fileList) {
      // console.log('exceed', res, file, fileList)
      this.$message.warning('请先删除已存在的图片')
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none;
}
.el-dialog__title {
  padding-left: 20px;
}
.el-dialog__header {
  height: 60px;
}
</style>
