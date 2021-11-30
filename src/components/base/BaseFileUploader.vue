<template>
  <form
    enctype="multipart/form-data"
    class="
      relative
      flex
      items-center
      justify-center
      p-2
      border-2 border-dashed
      rounded-md
      cursor-pointer
      avatar-upload
      border-gray-300
      transition-all
      duration-300
      ease-in-out
      isolate
      w-full
      hover:border-gray-400
      group
      min-h-[100px]
      bg-gray-50
    "
    :class="avatar ? 'w-32 h-32' : 'w-full'"
  >
    <input
      id="file-upload"
      ref="input"
      type="file"
      tabindex="-1"
      :multiple="multiple"
      :name="inputFieldName"
      :accept="accept"
      class="absolute z-10 w-full h-full opacity-0 cursor-pointer"
      @change="
        onChange(
          $event.target.name,
          $event.target.files,
          $event.target.files.length
        )
      "
    />

    <!-- Avatar Not Selected -->
    <div v-if="!previewFiles.length && avatar" class="">
      <img
        src="/images/default-avatar.jpg"
        class="rounded"
        alt="Default Avatar"
      />

      <a
        href="#"
        class="absolute z-30 bg-white rounded-full -bottom-3 -right-3 group"
        @click.prevent.stop="onBrowse"
      >
        <PlusCircleIcon
          class="h-8 text-xl leading-6  text-primary-500 group-hover:text-primary-600"
        />
      </a>
    </div>

    <!-- Not Selected -->
    <div v-else-if="!previewFiles.length" class="flex flex-col items-center">
      <CloudUploadIcon class="h-6 mb-2 text-xl leading-6 text-gray-400" />
      <p class="text-xs leading-4 text-center text-gray-400">
        Drag a file here or
        <a
          class="relative z-20 cursor-pointer  text-primary-500 hover:text-primary-600 hover:font-medium"
          href="#"
          @click.prevent.stop="onBrowse"
        >
          browse
        </a>
        to choose a file
      </p>
    </div>

    <div
      v-else-if="previewFiles.length && avatar && !multiple"
      class="flex w-full h-full border border-gray-300 rounded"
    >
      <img
        for="file-upload"
        :src="previewFiles[0]"
        class="block object-cover w-full h-full rounded opacity-100"
        style="animation: fadeIn 2s ease"
      />

      <a
        href="#"
        class="box-border absolute z-30 flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-full shadow-md  -bottom-3 -right-3 group hover:border-gray-400"
        @click.prevent.stop="onAvatarRemove(previewFiles[0])"
      >
        <XIcon class="h-4 text-xl leading-6 text-black" />
      </a>
    </div>

    <!-- Preview Files -->
    <div v-else class="flex flex-wrap w-full">
      <a
        v-for="previewFile in previewFiles"
        :key="previewFile"
        href="#"
        class="block p-2 m-2 bg-white border border-gray-300 rounded  hover:border-gray-500"
        @click.prevent
      >
        <img
          for="file-upload"
          :src="previewFile"
          class="block object-cover w-20 h-20 opacity-100"
          style="animation: fadeIn 2s ease"
        />
      </a>
    </div>
  </form>
</template>
<script>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import { CloudUploadIcon, PlusCircleIcon, XIcon } from '@heroicons/vue/solid'

export default {
  components: {
    CloudUploadIcon,
    PlusCircleIcon,
    XIcon,
  },
  props: {
    multiple: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: Boolean,
      default: false,
    },
    autoProcess: {
      type: Boolean,
      default: false,
    },
    uploadUrl: {
      type: String,
      default: '',
    },
    previewImage: {
      type: String,
      default: '',
    },
    previewImages: {
      type: Array,
      default: () => [],
    },
    preservePreviewFiles: {
      type: Boolean,
      default: false,
    },
    accept: {
      type: String,
      default: 'image/*',
    },
    inputFieldName: {
      type: String,
      default: 'photos',
    },
  },
  emits: ['change', 'remove'],
  setup(props, { emit }) {
    // status
    const STATUS_INITIAL = 0
    const STATUS_SAVING = 1
    const STATUS_SUCCESS = 2
    const STATUS_FAILED = 3

    let uploadedFiles = ref([])
    const previewFiles = ref([])
    const input = ref(null)
    let uploadError = ref(null)
    let currentStatus = ref(null)

    function reset() {
      // reset form to initial state
      currentStatus = STATUS_INITIAL
      uploadedFiles.value = []
      previewFiles.value = []
      uploadError = null
    }

    function upload(formData) {
      return (
        axios
          .post(props.uploadUrl, formData)
          // get data
          .then((x) => x.data)
          // add url field
          .then((x) => x.map((img) => ({ ...img, url: `/images/${img.id}` })))
      )
    }

    function save(formData) {
      // upload data to the server
      currentStatus = STATUS_SAVING

      upload(formData)
        .then((x) => {
          uploadedFiles = [].concat(x)
          currentStatus = STATUS_SUCCESS
        })
        .catch((err) => {
          uploadError = err.response
          currentStatus = STATUS_FAILED
        })
    }

    function getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
      })
    }

    function onChange(fieldName, fileList, fileCount) {
      if (!fileList.length) return

      if (props.multiple) {
        emit('change', fieldName, fileList, fileCount)
      } else {
        emit('change', fieldName, fileList[0], fileCount)
      }

      if (!props.preservePreviewFiles) {
        previewFiles.value = []
      }

      Array.from(Array(fileList.length).keys()).forEach((x) => {
        getBase64(fileList[x]).then((image) => {
          previewFiles.value.push(image)
        })
      })

      if (!props.autoProcess) return

      const formData = new FormData()

      // append the files to FormData
      Array.from(Array(fileList.length).keys()).forEach((x) => {
        formData.append(fieldName, fileList[x], fileList[x].name)
      })

      // save it
      save(formData)
    }

    function onBrowse() {
      if (input.value) {
        input.value.click()
      }
    }

    function onAvatarRemove(image) {
      previewFiles.value = []
      emit('remove', image)
    }

    onMounted(() => {
      reset()
    })

    watch(
      () => props.previewImages,
      () => {
        previewFiles.value = props.previewFiles
      }
    )

    watch(
      () => props.previewImage,
      (v) => {
        if (previewFiles.value.length && previewFiles.value.includes(v)) {
          const index = previewFiles.value.indexOf(v)

          if (index > -1) {
            previewFiles.value.splice(index, 1)
          }
        } else {
          previewFiles.value.push(v)
        }
      }
    )

    return {
      onChange,
      uploadedFiles,
      previewFiles,
      currentStatus,
      uploadError,
      input,
      onBrowse,
      onAvatarRemove,
    }
  },
}
</script>
