<template>
  <div class="login=page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <ValidateForm @form-submit="handleFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInput
          type="text"
          v-model="emailValue"
          :rules="emailRules"
          placeholder="请输入邮箱地址"
        />
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">密码</label>
        <ValidateInput
          type="password"
          v-model="passwordValue"
          :rules="passwordRules"
          placeholder="请输入密码"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-block btn-large">登录</button>
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
export default defineComponent({
  name: 'login',
  components: {
    ValidateForm,
    ValidateInput
  },
  setup () {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const emailValue = ref('')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordValue = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' }
    ]
    const handleFormSubmit = (result: boolean) => {
      if (result) {
        store.commit('login')
        router.push('/')
      }
    }
    return {
      router,
      emailValue,
      emailRules,
      passwordValue,
      passwordRules,
      handleFormSubmit
    }
  }
})
</script>
