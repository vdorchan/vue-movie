<template>
  <div class="container">
    <top-bar
      :class="[]"
      page-title="账号设置"
      hideSearch=true
      showBack=true
    ></top-bar>
    <div class="group">
      <dl class="row">
        <dt>头像</dt>
        <dd><img
            v-if="user.avatar"
            class="user-avatar"
            :src="user.avatar"
            alt=""
          >
          <div
            class="user-avatar"
            v-else
          >
            <font-awesome-icon :icon="['fas', 'user']" />
          </div>
        </dd>
      </dl>
      <dl class="row">
        <dt>昵称</dt>
        <dd>{{ user.nickname }}</dd>
      </dl>
    </div>

    <div class="group">
      <dl class="row">
        <dt>登录密码</dt>
        <dd>修改</dd>
      </dl>
    </div>

    <div class="group user-logout">
      <a
        class="row user-logout"
        href="javascript:"
        @click="logout"
      >退出登录</a>
    </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'
import fontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { mapMutations } from 'vuex'
import { LOGOUT } from '@/store/mutation-types'

export default {
  name: 'Setting',
  data () {
    return {}
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    ...mapMutations({
      logout: LOGOUT
    })
  },
  components: {
    TopBar,
    fontAwesomeIcon
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  background: #eee;
}
.group {
  width: 90%;
  margin: 20px auto 0;
  white-space: nowrap;
  background: #fff;
}
.row {
  margin: 0 20px;
  text-align: center;
  color: #333;
  font-size: 20px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border: none;
  }
}
a.row {
  display: block;
  text-decoration: none;
}
dl {
  display: flex;
  justify-content: space-between;
}
dd {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &::after {
    content: ">";
    padding-left: 10px;
  }
}

.user {
  &-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    background: #eeeeee;
  }
  &-logout {
    background: $c-red;
    color: #fff;
  }
}
</style>
