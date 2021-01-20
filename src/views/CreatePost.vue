<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <ValidateForm @form-submit="handleFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput
          type="text"
          v-model="titleVal"
          :rules="titleRule"
          placeholder="请输入文章标题"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">文章详情</label>
        <ValidateInput
          tag="textarea"
          rows="10"
          v-model="contentVal"
          :rules="contentRule"
          placeholder="请输入文章详情"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-block btn-large">发表文章</button>
      </template>
    </ValidateForm>
  </div>
</template>
<script lang='ts'>
import { defineComponent, ref } from 'vue'
import ValidateForm from '../components/ValidateForm.vue'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '../store'
import { PostProps } from '../testData'
export default defineComponent({
  name: 'login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleVal = ref('')
    const titleRule: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRule: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const handleFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }
    return {
      router,
      titleVal,
      titleRule,
      contentVal,
      contentRule,
      handleFormSubmit
    }
  }
})
</script>
